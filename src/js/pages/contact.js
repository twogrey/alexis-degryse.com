const form = document.querySelector("form");
const failFeeback = "Mince, il semblerait qu'il y ait eu un problème avec mon service d'envoi de message. Je vous invite à réessayer mais si le souci persiste, n'hésitez pas à me contacter directement par mail à <a href='mailto:alexis.degryse@gmail.com'>alexis.degryse@gmail.com</a>.";
let feedback = document.querySelector(".feedback");
let feedbackText = feedback.querySelector("span");
 
function handleSubmit(event) {
	feedbackText.textContent = '';
	feedback.classList.remove('success', 'error');
	form.setAttribute('inert', '');
	event.preventDefault();
	let data = new FormData(event.target);
	fetch(event.target.action, {
		method: form.method,
		body: data,
		headers: {
				'Accept': 'application/json'
		}
	}).then(response => {
		if (response.ok) {
			feedbackText.textContent = "Votre message a bien été envoyé. Je vous remercie et tâcherai d'y répondre au plus vite.";
			feedback.classList.add('success');
			form.reset();
		} else {
			feedbackText.textContent = failFeeback;
			feedback.classList.add('error');
		}
		form.removeAttribute('inert');
	}).catch(error => {
		feedbackText.textContent = failFeeback;
		feedback.classList.add('error');
		form.removeAttribute('inert');
	});
}

form.addEventListener("submit", handleSubmit);