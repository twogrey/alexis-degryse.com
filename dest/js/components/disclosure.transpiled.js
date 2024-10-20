"use strict";

var openDisclosure = function openDisclosure(toggle) {
  toggle.setAttribute('aria-expanded', 'true');
};
var closeDisclosure = function closeDisclosure(toggle) {
  toggle.setAttribute('aria-expanded', 'false');
};
window.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' || e.key === 'Esc') {
    var toggles = document.querySelectorAll('.js-disclosure:has(+ :focus-within), .js-disclosure[aria-expanded="true"]:focus');
    if (toggles.length) {
      var toggle = toggles[toggles.length - 1];
      closeDisclosure(toggle);
      toggle.focus();
    }
  }
});
document.querySelectorAll('.js-disclosure').forEach(function (btn) {
  btn.addEventListener('click', function () {
    if (btn.getAttribute('aria-expanded') == 'false') openDisclosure(btn);else closeDisclosure(btn);
  });
});
