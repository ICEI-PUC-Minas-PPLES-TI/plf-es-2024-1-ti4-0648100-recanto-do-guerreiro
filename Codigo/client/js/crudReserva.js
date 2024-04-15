window.addEventListener('load', displayWorkshops());

async function addReserva(e) {
    const token = sessionStorage.getItem('token'); //PEGA O TOKEM DO LOCAL STORAGE E JOGA NO HEADERS PARA VERIFICACAO
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token,
    };
    e.preventDefault();
    try {
        const response = await fetch('http://localhost:8000/reserva', {
            method: 'POST',
            headers,
            body: JSON.stringify({
                titulo: e.target.titulo.value,
                descricao: e.target.descricao.value,
                data: e.target.data.value,
                hora: e.target.hora.value,
                idCliente: e.target.idCliente.value,
                adicionais: e.target.adicionais.value,
                status: e.target.status.value,
            })
        });
        const dados = await response.json();
        console.log(dados);
        window.alert("Reserva Cadastrada Com Sucesso!");
        window.location.href = "/Codigo/client/crudReserva.html";
    } catch (erro) {
        console.log(erro);
    }
}

async function displayWorkshops() {
    const table = document.getElementById("displayReservas");
    table.innerHTML = "";
    const token = sessionStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token,
    };
    let dadoBruto = await fetch('http://localhost:8000/reserva', { headers });
    let workshops = await dadoBruto.json();

    workshops.forEach(async(workshop) => {
        // Obter detalhes do cliente
        let clienteResponse = await fetch(`http://localhost:8000/clienteFilterId/${workshop.idCliente}`, { headers });
        let cliente = await clienteResponse.json();

        const newRow = table.insertRow();
        newRow.innerHTML = `
            <td>${workshop.titulo}</td>
            <td>${workshop.descricao}</td>
            <td>${workshop.data}</td>
            <td>${workshop.hora}</td>
            <td>${cliente.nome}</td> 
            <td>${workshop.adicionais}</td>
            <td>${workshop.status}</td>
            <td>
            <a class="btn btn-primary" href="/Codigo/client/attReserva.html?id=${workshop.id}">Editar →</a>
            <button onclick="deletereserva(${workshop.id})">Excluir</button>
            </td>
        `;
    });
}


async function deletereserva(index) {
    const token = sessionStorage.getItem('token'); //PEGA O TOKEM DO LOCAL STORAGE E JOGA NO HEADERS PARA VERIFICACAO
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token,
    };

    const response = await fetch(`http://localhost:8000/reserva/${index}`, {
        method: 'DELETE',
        headers
    });

    displayWorkshops();
}