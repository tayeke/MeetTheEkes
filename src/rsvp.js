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

  // firebase.firestore().collection("rsvp").doc('taylortwo').set({attendees: [{firstName: "Taylor", lastName: "Eke"},{firstName: "Rebecca", lastName: "Schulman"}], firstName: "Taylor", lastName: "Eke", created: firebase.firestore.FieldValue.serverTimestamp(), modified: firebase.firestore.FieldValue.serverTimestamp()});

  // firebase.firestore().collection("rsvp").get().then((querySnapshot) => {
  //
  //   querySnapshot.forEach((doc) => {
  //
  //       console.log(doc.data());
  //
  //   });
  //
  // });
}
