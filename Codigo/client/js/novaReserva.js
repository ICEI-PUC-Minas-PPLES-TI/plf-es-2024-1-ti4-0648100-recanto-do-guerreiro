$(document).ready(function() {
    $('form').submit(function(e) {
        e.preventDefault();

        // Serializar os dados do formulário;
        var formData = $(this).serialize();

        // Solicitação AJAX para enviar dados do formulário ao servidor;
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8000/reserva',
            data: formData,
            success: function(response) {
                // Resposta de sucesso;
                console.log('Data saved successfully:', response);
                // Redirecionar o usuário para outra página após o sucesso
                window.location.href = 'index.html';
            },
            error: function(xhr, status, error) {
                // Erro;
                console.error('Error saving data:', error);
            }
        });
    });
});
