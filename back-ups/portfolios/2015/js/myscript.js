$(document).ready(function() {

    // Contact form

    $('#send').click(function() {
        $(this).val('En cours ...');
        $('#success p').remove();
        $.post('contact/contact.php', $('#contact-form').serialize(), function(response) {
            $('#success').html(response);
            //$('#success').hide('slow');
            $('#send').val('Envoyer');
        });
        return false;
    });

});
