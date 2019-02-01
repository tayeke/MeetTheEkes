// libs
import $ from '_jquery';

// styles
import './scss/reset.css';
import './scss/index.scss';
import './scss/map.scss';
import './scss/footer.scss';

// template parts
import calloutsTemplate from './parts/callouts.html';
import mapTemplate from './parts/map.html';
import faqTemplate from './parts/faq.html';
import footerTemplate from './parts/footer.html';
$(function(){
  let $app = $('#app');
  $('#headingLeft').append(calloutsTemplate);
  $app.append(mapTemplate);
  $app.append(faqTemplate);
  $app.append(footerTemplate);
});

// scripts
import './map.js';
import './rsvp.js';

function initPage() {
  // $('#headingRight img').height($(window).height());
}

$(initPage);
