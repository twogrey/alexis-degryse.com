"use strict";

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

/* ------------------------------------*
    Is ready
*------------------------------------*/

document.addEventListener('DOMContentLoaded', function () {});
