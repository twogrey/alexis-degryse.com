const openDisclosure = function (toggle) {
	toggle.setAttribute('aria-expanded', 'true');
};

const closeDisclosure = function (toggle) {
	toggle.setAttribute('aria-expanded', 'false');
};

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.key === 'Esc') {
    	let toggles = document.querySelectorAll('.js-disclosure:has(+ :focus-within), .js-disclosure[aria-expanded="true"]:focus');
    	if(toggles.length) {
    		let toggle = toggles[toggles.length - 1];
        closeDisclosure(toggle);
        toggle.focus();
    	}
  	}
});

document.querySelectorAll('.js-disclosure').forEach((btn) => {
	btn.addEventListener('click', () => {
		if(btn.getAttribute('aria-expanded') == 'false')
			openDisclosure(btn);
		else
			closeDisclosure(btn);
	});
});