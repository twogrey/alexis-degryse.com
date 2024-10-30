"use strict";

var form = document.querySelector("form");
var failFeeback = "Mince, il semblerait qu'il y ait eu un problème avec mon service d'envoi de message. Je vous invite à réessayer mais si le souci persiste, n'hésitez pas à me contacter directement par mail à alexis.degryse@gmail.com.";
var feedback = document.querySelector("[role=alert]");
function handleSubmit(event) {
  feedback.innerHTML = '';
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
      feedback.innerHTML = "Votre message a bien été envoyé. Je vous remercie et tâcherai d'y répondre au plus vite.";
      form.reset();
    } else {
      feedback.innerHTML = failFeeback;
    }
  })["catch"](function (error) {
    feedback.innerHTML = failFeeback;
  });
}
form.addEventListener("submit", handleSubmit);
