// variavel global
var formData;

// ouvinte de evento ao botão "Editar"
document.querySelector('.btn-editar').addEventListener('click', function() {
    // Seletor para todos os campos de entrada e textareas
    var campos = document.querySelectorAll('input, textarea');
    
    // Habilita a edição de todos os campos
    campos.forEach(function(campo) {
        campo.removeAttribute('disabled');
    });

    // Altera o texto do botão para "Salvar"
    this.textContent = 'Salvar';

    // Remove o ouvinte de evento de clique atual
    this.removeEventListener('click', arguments.callee);

    this.addEventListener('click', function() {
        $.ajax({
            type: 'PUT',
            url: 'http://localhost:8000/reservaPut',
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
        console.log('Dados editados serão enviados para o servidor');
    });
});

// Exclusão da reserva ao clicar em "Excluir"
document.querySelector('.btn-excluir').addEventListener('click', function() {
    if (confirm('Tem certeza que deseja excluir esta reserva?')) {
        // Implemente aqui a lógica para excluir a reserva
        // Por exemplo, você pode fazer uma solicitação AJAX para um servidor
        // para excluir a reserva do banco de dados
        // Após a exclusão bem-sucedida, você pode redirecionar o usuário de volta para a página inicial ou
        // realizar qualquer outra ação necessária
        alert('Reserva excluída com sucesso!');
    }
});
