$(document).ready(function() {
    $('form').submit(function(e) {
        e.preventDefault();

        // Serializar os dados do formulário;
        var formData = $(this).serialize();

        // Solicitação AJAX para enviar dados do formulário ao servidor;
        $.ajax({
            type: 'POST',
            url: '',
            data: formData,
            success: function(response) {
                // Resposta de sucesso;
                console.log('Data saved successfully:', response);
            },
            error: function(xhr, status, error) {
                // Erro;
                console.error('Error saving data:', error);
            }
        });
    });
});
