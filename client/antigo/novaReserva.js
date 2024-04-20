$(document).ready(function() {
    $('form').submit(function(e) {
        e.preventDefault();

        // Criar um ID único para a reserva
        var reservaId = generateUniqueId();

        // Criar um objeto para armazenar os dados do formulário
        var formData = {
            id: reservaId,
            titulo: $('#titulo_reserva').val(),
            descricao: $('#descricao_reserva').val(),
            data: $('#data_reserva').val(),
            hora: $('#hora_reserva').val(),
            idCliente: $('#id_cliente').val(),
            adicionais: $('#adicionais_reserva').val(),
            status: $('#status_reserva').val()
        };

        // Converter o objeto em JSON
        var jsonData = JSON.stringify(formData);

        // Solicitação AJAX para enviar dados do formulário ao servidor
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8000/reserva',
            contentType: 'application/json',
            data: jsonData,
            success: function(response) {
                // Resposta de sucesso
                console.log('Data saved successfully:', response);
                // Redirecionar o usuário para outra página após o sucesso
                window.location.href = 'index.html';
            },
            error: function(xhr, status, error) {
                // Erro
                console.error('Error saving data:', error);
            }
        });
    });
});

// Função para gerar um ID único
function generateUniqueId() {
    var timestamp = new Date().getTime();
    var randomNum = Math.floor(Math.random() * 10000);
    return timestamp + '_' + randomNum;
}
