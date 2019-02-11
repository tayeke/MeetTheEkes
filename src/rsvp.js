// libs
import vex from 'vex-js';
import vexDialog from 'vex-dialog';
vex.registerPlugin(vexDialog);
vex.defaultOptions.className = 'vex-theme-flat-attack';

// css
import 'vex-js/dist/css/vex.css';
import 'vex-js/dist/css/vex-theme-flat-attack.css';
import './scss/vex.custom.css';

// html parts
import rsvpAccessTemplate from './parts/rsvp-access.html';
import rsvpPartOneTemplate from './parts/rsvp-one.html';
import rsvpPartTwoTemplate from './parts/rsvp-two.html';
import rsvpListTemplate from './parts/rsvp-list.html';

// async loading elements
const firebaseScript = document.getElementById('firebaseScript');
const firestoreScript = document.getElementById('firestoreScript');

if(typeof window.firebase === 'undefined') {
  firestoreScript.addEventListener('load', function() {
    initFirebase();
  });
} else {
  initFirebase();
}

function initFirebase() {

  firebase.initializeApp({
    apiKey: "AIzaSyCDw_XXcQq0JNA08QCfX41lKWbf3y7W91Y",
    authDomain: "meettheekes-1544055531212.firebaseapp.com",
    databaseURL: "https://meettheekes-1544055531212.firebaseio.com",
    projectId: "meettheekes-1544055531212",
    storageBucket: "meettheekes-1544055531212.appspot.com",
    messagingSenderId: "812047322754"
  });

  $(document).on('click', '#rsvpButton', rsvpPartOne);
  $(document).on('click', '#rsvpListButton', rsvpList);
  $(document).on('click', '#addPlus1', (e) => {
    e.preventDefault();
    addPlusOne();
  });
  $(document).on('click', '#giftButton', giftClick);
  $(document).on('click', '#giftLink', giftClick);
}

const rsvp = {};
function rsvpKey(rsvp) {
  return rsvp.firstName.split(' ')[0].toLowerCase()+rsvp.lastName.toLowerCase();
}

window.answer = null;
function blockAccess(_callback) {

  vex.dialog.open({
    unsafeMessage: rsvpAccessTemplate,
    buttons: [
      $.extend({}, vex.dialog.buttons.YES, { className: 'vex-dialog-button-primary', text: 'Continue', click: function(e) {
        if(!$(e.target).closest('form')[0].checkValidity()) {
          return false;
        }
        this.close(this.id);
        _callback();
      }}),
      $.extend({}, vex.dialog.buttons.NO, { className: 'vex-dialog-button-secondary', text: 'Nevermind', click: function(e) {
        this.close(this.id);
      }})
    ]
  });

  const securityQuestionDoc = firebase.firestore().collection("security-question").doc('primary');
  securityQuestionDoc.get()
    .then((securityQuestionSnapshot) => {
      const securityQuestion = securityQuestionSnapshot.data();
      $('#question').text(securityQuestion.question);
      window.answer = $.trim(securityQuestion.answer.toLowerCase());
    });

}

function rsvpPartOne() {

  blockAccess(() => {
    vex.dialog.open({
      unsafeMessage: rsvpPartOneTemplate,
      buttons: [
        $.extend({}, vex.dialog.buttons.YES, { className: 'vex-dialog-button-primary', text: 'Continue', click: function(e) {
          if(!$(e.target).closest('form')[0].checkValidity()) {
            return false;
          }
          const _this = this;
          rsvp.going = (parseInt($("input[name='going']:checked").val()) === 1);
          let name = $.trim($("input[name='fullName']").val());
          name = name.split(' ');
          rsvp.lastName = name.pop();
          rsvp.firstName = name.join(' ');
          rsvp.attendees = [{
            lastName: rsvp.lastName,
            firstName: rsvp.firstName
          }];
          const rsvpDoc = firebase.firestore().collection("rsvp").doc(rsvpKey(rsvp));
          rsvpDoc.get()
            .then((rsvpSnapshot) => {
              if(rsvpSnapshot.exists) {
                $.extend(rsvp, {modified: firebase.firestore.FieldValue.serverTimestamp()});
              } else {
                $.extend(rsvp, {created: firebase.firestore.FieldValue.serverTimestamp(), modified: firebase.firestore.FieldValue.serverTimestamp()})
              }
              rsvpDoc.set(rsvp, {merge: true})
                .then(function() {
                  if(rsvp.going) {
                    _this.close(_this.id);
                    rsvpPartTwo();
                  } else {
                    vex.dialog.alert('We are sorry you cannot make it '+rsvp.firstName+'. Thank you for your RSVP.');
                  }
                })
                .catch(function(error) {
                  console.log(error);
                  vex.dialog.alert('There was an issue with your response, please email us at taylor.rebecca.eke@gmail.com 🤞🏻');
                });
          });
        }}),
        $.extend({}, vex.dialog.buttons.NO, { className: 'vex-dialog-button-secondary', text: 'Later', click: function(e) {
          this.close(this.id);
        }})
      ]
    });
  });

}

function rsvpPartTwo() {

  vex.dialog.open({
    unsafeMessage: rsvpPartTwoTemplate,
    buttons: [
      $.extend({}, vex.dialog.buttons.YES, { className: 'vex-dialog-button-primary', text: 'Continue', click: function(e) {
        if(!$(e.target).closest('form')[0].checkValidity()) {
          return false;
        }
        const _this = this;
        rsvp.phone = $.trim($("input[name='phone']").val());
        $('input[id^="plus"]').each((i, item) => {
          let name = $.trim($(item).val());
          if(name.length) {
            name = name.split(' ');
            const lastName = name.pop();
            const firstName = name.join(' ');
            rsvp.attendees.push({
              lastName: lastName,
              firstName: firstName
            });
          }
        });
        const rsvpDoc = firebase.firestore().collection("rsvp")
          .doc(rsvpKey(rsvp))
          .update({
            phone: rsvp.phone,
            attendees: rsvp.attendees
          })
          .then(function() {
            _this.close(_this.id);
            vex.dialog.alert('Thanks '+rsvp.firstName+'. Please read all the information on our website so you can get informed about attending our wedding on Orcas Island.');
          })
          .catch(function(error) {
            _this.close(_this.id);
            console.log(error);
            vex.dialog.alert('There was an issue capturing your response, please email us at taylor.rebecca.eke@gmail.com 🤞🏻');
          });
      }}),
      $.extend({}, vex.dialog.buttons.NO, { className: 'vex-dialog-button-secondary', text: 'It\'s Just Me', click: function(e) {
        this.close(this.id);
        vex.dialog.alert('Thanks '+rsvp.firstName+'. Please read all the information on our website so you can get informed about attending our wedding on Orcas Island.');
      }})
    ]
  });

}

function rsvpList(e) {
  e.preventDefault();

  blockAccess(() => {

    vex.dialog.open({
      unsafeMessage: rsvpListTemplate,
      buttons: [
        $.extend({}, vex.dialog.buttons.YES, { className: 'vex-dialog-button-primary', text: 'Adios', click: function(e) {
          this.close(this.id);
        }})
      ]
    });

    firebase.firestore().collection("rsvp").where('going', '==', true).get().then(function(querySnapshot) {
      querySnapshot.forEach(function(rsvpDoc) {
        rsvpDoc.data().attendees.forEach((attendant) => {
          $('<li>'+attendant.firstName + ' ' + attendant.lastName+'</li>').appendTo('#rsvpList');
        });
      });
    });

    const rsvps = firebase.firestore().collection("security-question").doc('primary');
    securityQuestionDoc.get()
      .then((securityQuestionSnapshot) => {
        const securityQuestion = securityQuestionSnapshot.data();
        $('#question').text(securityQuestion.question);
        window.answer = $.trim(securityQuestion.answer.toLowerCase());
      });

  });

}

let additionals = 1;
function addPlusOne() {
  const $additional = $('#plus'+additionals);
  additionals++;
  const $another = $additional.clone();
  $another.prop({id: 'plus'+additionals, value: null, name: 'plus'+additionals});
  $another.insertAfter($additional);
}

window.validateFullName = function(e) {
  let name = $.trim($(e.target).val());
  if(!name.length && !e.target.required) {
    e.target.setCustomValidity("");
    return;
  }
  name = name.split(' ');
  if(name.length < 2) {
    e.target.setCustomValidity("We request that you enter a full name");
  } else {
    e.target.setCustomValidity("");
  }
};

window.resetRadioValidity = function() {
  $('input[name="going"]').each((i, item) => {
    item.setCustomValidity("");
  });
};

window.validateAnswer = function(e) {
  if(window.answer === null) {
    e.target.setCustomValidity("It's not the answer");
    return;
  }
  const theAnswer = $.trim($(e.target).val()).toLowerCase();
  if(theAnswer === window.answer) {
    e.target.setCustomValidity("");
  } else {
    e.target.setCustomValidity("It's not the answer");
  }
};

function giftClick() {
  vex.dialog.open({
    unsafeMessage: '<p>In lieu of physical gifts we are asking for donation to help us get to our honeymoon in Fiji! Click the link to go to our honeymoon travel pool on Paypal. Paypal is our preferred platform for contributions, because you can send us gifts without any fees if you connect your bank account.</p><br><a href="https://paypal.me/pools/c/8aXbOHLFBl" target="_blank">Give to our pool</a>',
    buttons: [
      $.extend({}, vex.dialog.buttons.YES, { className: 'vex-dialog-button-primary', text: 'Ok', click: function(e) {
        this.close(this.id);
      }}),
    ]
  });
}
