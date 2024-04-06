// Redirecionamento para a página novaReserva
document.querySelector('.btn-editar').addEventListener('click', function() {
    window.location.href = 'novaReserva.html'; 
});

// Exclusão da reserva ao clicar em "Excluir"
document.querySelector('.btn-excluir').addEventListener('click', function() {
    if (confirm('Tem certeza que deseja excluir esta reserva?')) {
        // Se o usuário confirmar, você pode implementar a lógica para excluir a reserva aqui
        // Por exemplo, você pode fazer uma solicitação AJAX para um servidor para excluir a reserva do banco de dados
        // Depois de excluir com sucesso, você pode redirecionar o usuário de volta para a página inicial ou fazer qualquer outra ação necessária
        alert('Reserva excluída com sucesso!');
    }
});