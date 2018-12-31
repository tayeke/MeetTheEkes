// libs
import $ from '_jquery';

// styles
import './scss/reset.css';
import './scss/index.scss';
import './scss/map.scss';

// template parts
import mapTemplate from './parts/map.html';
$(function(){
  let $app = $('#app');
  $app.append(mapTemplate);
});

// scripts
import './map.js';
import './rsvp.js';
