$(document).ready(function(){
    // Mostrar/ocultar campo de entrada ao clicar no botão "Filtrar por ID"
    $('#filterByIdBtn').click(function(){
        $('#filterByIdInput').toggle();
    });

    // Lidar com o clique no botão de pesquisa
    $('#searchButton').click(function(){
        var eventId = $('#eventIdInput').val();
        // Implemente a lógica de pesquisa por ID aqui
        console.log("ID do evento a ser pesquisado: " + eventId);
    });
});
