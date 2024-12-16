"use strict";

/* eslint-env browser, jquery */

/* global MCD, Promise */

/* ------------------------------------*
    Variables
*------------------------------------*/
var html = document.querySelector('html');
var body = document.querySelector('body');
var baseFontSize = parseInt(window.getComputedStyle(html, null).getPropertyValue('font-size'), 10);
var mqMedium = baseFontSize * getComputedStyle(html).getPropertyValue('--mq-md-unitless');
var mqLarge = baseFontSize * getComputedStyle(html).getPropertyValue('--mq-lg-unitless'); // Use mqMedium & mqLarge with window.innerWidth

var focusableSelector = 'button:not([disabled]), a[href], input:not([type="hidden"]):not([disabled]), textarea:not([disabled]), select:not([disabled]), [contenteditable]';
/* ------------------------------------*
    Generalities
*------------------------------------*/

function is_touch_device() {
  return 'ontouchstart' in window || navigator.MaxTouchPoints > 0 || navigator.msMaxTouchPoints > 0; // navigator.msMaxTouchPoints for microsoft IE backwards compatibility
}

if (!is_touch_device()) {
  html.classList.add('not-touch');
  html.classList.remove('touch');
}
/**
 * Get scrollbar width then assign it to global CSS var
 */


function getScrollbarWidth() {
  document.documentElement.style.setProperty('--scrollbar-width', "".concat(window.innerWidth - document.documentElement.clientWidth, "px"));
}

window.addEventListener('resize', function () {
  getScrollbarWidth();
});
/* ------------------------------------*
    Expose element dimensions
*------------------------------------*/

function getComputedDimensions() {
  document.querySelectorAll('[data-computed-style]').forEach(function (element) {
    var prop = element.getAttribute('data-computed-style').split(', ');
    var name = element.getAttribute('data-computed-style-name');
    var target = element;
    prop.forEach(function (p) {
      var value = window.getComputedStyle(element, null).getPropertyValue(p);

      if (element.hasAttribute('data-computed-style-root')) {
        target = document.documentElement;
      }

      if (element.hasAttribute('data-computed-style-unitless')) {
        value = parseInt(value);
      }

      target.style.setProperty("--".concat(name, "-").concat(p), value);
    });
  });
}

window.addEventListener('resize', function () {
  getComputedDimensions();
});
/* ------------------------------------*
    
*------------------------------------*/

function positionMusicHeadphone() {
  var bg = document.querySelector('.about-me__bg'),
      imageWidth = bg.getAttribute('data-initial-width'),
      imageHeight = bg.getAttribute('data-initial-height'),
      aspectRatio = imageWidth / imageHeight;
  var wi = 0,
      hi = 0,
      r = bg.offsetWidth / bg.offsetHeight;

  if (aspectRatio <= r) {
    wi = bg.offsetWidth;
    hi = bg.offsetWidth / aspectRatio;
  } else {
    wi = bg.offsetHeight * aspectRatio;
    hi = bg.offsetHeight;
  }

  var offsetTop = (hi - document.querySelector('.about-me__bg').offsetHeight) / 2,
      offsetLeft = (wi - document.querySelector('.about-me__bg').offsetWidth) / 2,
      x = wi * 1220 / imageWidth,
      y = hi * 300 / imageHeight;
  document.querySelector('.headphone').style.top = y - offsetTop + 'px';
  document.querySelector('.headphone').style.left = x - offsetLeft + 'px';
}
/* ------------------------------------*
    Is ready
*------------------------------------*/


document.addEventListener('DOMContentLoaded', function () {
  /**
   * End loading bar animation
   */
  html.classList.add('loading-page-done');
  /**
   *
   */

  getComputedDimensions();
  /**
   * 
   */

  getScrollbarWidth();
  /**
   * Apply styles if user has scrolled
   */

  var observer = new IntersectionObserver(function (entries) {
    if (entries[0].boundingClientRect.y < 0) {
      document.querySelector('.js-header').classList.add('header--opaque');
    } else {
      document.querySelector('.js-header').classList.remove('header--opaque');
    }
  });
  observer.observe(document.querySelector(".js-start-opaque-header"));
  /**
   * 
   */

  if (window.innerWidth >= mqLarge) {
    positionMusicHeadphone();
  }

  window.addEventListener('resize', function () {
    if (window.innerWidth >= mqLarge) {
      positionMusicHeadphone();
    }
  });
});
