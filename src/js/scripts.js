/* ------------------------------------*
    Variables
*------------------------------------*/

const html = document.querySelector('html');
const body = document.querySelector('body');
const baseFontSize = parseInt(window.getComputedStyle(html, null).getPropertyValue('font-size'), 10);
const mqMedium = baseFontSize * getComputedStyle(html).getPropertyValue('--mq-md-unitless');
const mqLarge = baseFontSize * getComputedStyle(html).getPropertyValue('--mq-lg-unitless'); // Use mqMedium & mqLarge with window.innerWidth
const focusableSelector = 'button:not([disabled]), a[href], input:not([type="hidden"]):not([disabled]), textarea:not([disabled]), select:not([disabled]), [contenteditable]';

/* ------------------------------------*
    Generalities
*------------------------------------*/


/* ------------------------------------*
    Is ready
*------------------------------------*/

document.addEventListener('DOMContentLoaded', () => {




});

