"use strict";

var form = document.querySelector("form");
var failFeeback = "Mince, il semblerait qu'il y ait eu un problème avec mon service d'envoi de message. Je vous invite à réessayer mais si le souci persiste, n'hésitez pas à me contacter directement par mail à <a href='mailto:alexis.degryse@gmail.com'>alexis.degryse@gmail.com</a>.";
var feedback = document.querySelector(".feedback");
var feedbackText = feedback.querySelector("span");
function handleSubmit(event) {
  feedbackText.textContent = '';
  feedback.classList.remove('success', 'error');
  form.setAttribute('inert', '');
  event.preventDefault();
  var data = new FormData(event.target);
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
      'Accept': 'application/json'
    }
  }).then(function (response) {
    if (response.ok) {
      feedbackText.textContent = "Votre message a bien été envoyé. Je vous remercie et tâcherai d'y répondre au plus vite.";
      feedback.classList.add('success');
      form.reset();
    } else {
      feedbackText.textContent = failFeeback;
      feedback.classList.add('error');
    }
    form.removeAttribute('inert');
  })["catch"](function (error) {
    feedbackText.textContent = failFeeback;
    feedback.classList.add('error');
    form.removeAttribute('inert');
  });
}
form.addEventListener("submit", handleSubmit);
