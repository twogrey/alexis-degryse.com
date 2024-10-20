"use strict";

var offcanvas = null;
var offcanvasFocusables = [];
var previouslyFocusedElementOffcanvas = null;
var openOffcanvas = function openOffcanvas(offcanvasID) {
  // Keep current offcanvas
  offcanvas = document.querySelector('#' + offcanvasID);

  // Keep trigger
  previouslyFocusedElementOffcanvas = document.querySelector(':focus');
  if (previouslyFocusedElementOffcanvas !== null && previouslyFocusedElementOffcanvas.getAttribute('aria-expanded')) {
    previouslyFocusedElementOffcanvas.setAttribute('aria-expanded', 'true');
  }

  // Add specific styles to <body>
  body.classList.add('offcanvas-is-open');

  // Show element
  offcanvas.classList.add('is-active');

  // Check focusable elements in the offcanvas then give focus to the first one
  offcanvasFocusables = Array.from(offcanvas.querySelectorAll(focusableSelector));
  offcanvasFocusables[0].focus();

  // Init closing offcanvas functions
  offcanvas.addEventListener('click', _closeOffcanvas);
  offcanvas.querySelectorAll('.js-offcanvas-close').forEach(function (btn) {
    btn.addEventListener('click', _closeOffcanvas);
  });
  offcanvas.querySelector('.js-offcanvas-stop').addEventListener('click', stopPropagation);
};
var _closeOffcanvas = function closeOffcanvas() {
  // Abort function if there is not opened offcanvas
  if (offcanvas === null) {
    return;
  }

  // Give focus to the trigger
  if (previouslyFocusedElementOffcanvas !== null) {
    previouslyFocusedElementOffcanvas.focus();
    if (previouslyFocusedElementOffcanvas.getAttribute('aria-expanded')) {
      previouslyFocusedElementOffcanvas.setAttribute('aria-expanded', 'false');
    }
  }

  // Add fading-out class to offcanvas
  offcanvas.classList.add('is-hiding');

  // Remove closing offcanvas functions
  offcanvas.removeEventListener('click', _closeOffcanvas);
  offcanvas.querySelectorAll('.js-offcanvas-close').forEach(function (btn) {
    btn.removeEventListener('click', _closeOffcanvas);
  });
  offcanvas.querySelector('.js-offcanvas-stop').removeEventListener('click', stopPropagation);

  //
  var _hideOffcanvas = function hideOffcanvas() {
    // Undo all the things
    offcanvas.classList.remove('is-hiding');
    offcanvas.classList.remove('is-active');
    body.classList.remove('offcanvas-is-open');
    offcanvas.removeEventListener('animationend', _hideOffcanvas);
    offcanvas = null;
    getScrollbarWidth();
  };

  // When the offcanvas has finished to fade out
  offcanvas.addEventListener('animationend', _hideOffcanvas);
};
var stopPropagation = function stopPropagation(e) {
  e.stopPropagation();
};

// Focus trap
var focusInOffcanvas = function focusInOffcanvas(e) {
  e.preventDefault();
  var index = offcanvasFocusables.findIndex(function (f) {
    return f === offcanvas.querySelector(':focus');
  });
  if (e.shiftKey === true) {
    index--;
  } else {
    index++;
  }
  if (index >= offcanvasFocusables.length) {
    index = 0;
  }
  if (index < 0) {
    index = offcanvasFocusables.length - 1;
  }
  offcanvasFocusables[index].focus();
};
window.addEventListener('keydown', function (e) {
  // Close modal by pressing Esc
  if (e.key === 'Escape' || e.key === 'Esc') {
    _closeOffcanvas(e);
  }
  if (e.key === 'Tab' && offcanvas !== null) {
    focusInOffcanvas(e);
  }
});
document.querySelectorAll('.js-offcanvas').forEach(function (a) {
  a.addEventListener('click', function () {
    openOffcanvas(a.getAttribute('data-offcanvas-id'));
  });
});
var resizeTimer;
window.addEventListener('resize', function (e) {
  if (offcanvas && offcanvas.classList.contains('offcanvas--mq') && window.innerWidth > mqMedium) {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      _closeOffcanvas(e);
    }, 250);
  }
});
