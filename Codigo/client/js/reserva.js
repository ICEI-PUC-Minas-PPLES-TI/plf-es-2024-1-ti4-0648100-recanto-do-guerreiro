// ouvinte de evento ao botão "Editar"
document.querySelector('.btn-editar').addEventListener('click', function() {
    // Obtém o ID da reserva
    var reservaId = this.dataset.id;

    // Habilita a edição dos campos de entrada e textareas
    var campos = document.querySelectorAll('input, textarea');
    campos.forEach(function(campo) {
        campo.removeAttribute('disabled');
    });

    // Altera o texto do botão para "Salvar"
    this.textContent = 'Salvar';

    // Remove o ouvinte de evento de clique atual
    this.removeEventListener('click', arguments.callee);

    // Adiciona o ouvinte de evento de clique para o botão "Salvar"
    this.addEventListener('click', function() {
        // Obtém os valores dos campos do formulário
        var titulo = document.getElementById('titulo_reserva').value;
        var descricao = document.getElementById('descricao_reserva').value;
        var data = document.getElementById('data_reserva').value;
        var hora = document.getElementById('hora_reserva').value;
        var idCliente = document.getElementById('id_cliente').value;
        var adicionais = document.getElementById('adicionais_reserva').value;
        var status = document.getElementById('status_reserva').value;

        // Cria um objeto com os dados do formulário
        var formData = {
            id: reservaId,
            titulo: titulo,
            descricao: descricao,
            data: data,
            hora: hora,
            idCliente: idCliente,
            adicionais: adicionais,
            status: status
        };

        // Converte o objeto em JSON
        var jsonData = JSON.stringify(formData);

        // Envia os dados via AJAX
        $.ajax({
            type: 'PUT',
            url: 'http://localhost:8000/reserva/' + reservaId, // URL para editar a reserva
            contentType: 'application/json',
            data: jsonData,
            success: function(response) {
                // Resposta de sucesso
                console.log('Data saved successfully:', response);
                // Atualiza a página ou redireciona o usuário conforme necessário
            },
            error: function(xhr, status, error) {
                // Erro
                console.error('Error saving data:', error);
            }
        });
    });
});

// Exclusão da reserva ao clicar em "Excluir"
document.querySelector('.btn-excluir').addEventListener('click', function() {
    var reservaId = this.dataset.id; // Obtém o ID da reserva

    if (confirm('Tem certeza que deseja excluir esta reserva?')) {
        // Implemente aqui a lógica para excluir a reserva
        $.ajax({
            type: 'DELETE',
            url: 'http://localhost:8000/reserva/' + reservaId, // URL para excluir a reserva
            success: function(response) {
                // Resposta de sucesso
                console.log('Reserva excluída com sucesso:', response);
                // Atualiza a página ou redireciona o usuário conforme necessário
            },
            error: function(xhr, status, error) {
                // Erro
                console.error('Erro ao excluir reserva:', error);
            }
        });
    }
});
