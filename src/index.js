// libs
import $ from '_jquery';

// styles
import './scss/index.scss';
import './scss/map.scss';

// template parts
import mapTemplate from './parts/map.html';
$(function(){
  $('body').append(mapTemplate);
});

// scripts
import './map.js';
