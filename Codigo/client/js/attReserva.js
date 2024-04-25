window.onload = async function getReserva() {
    const token = sessionStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token,
    };

    try {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        const dadosBrutos = await fetch(`http://localhost:8000/filterIdReserva/${id}`, { headers });
        const reserva = await dadosBrutos.json();

        document.getElementById('idReserva').value = reserva.id;
        document.getElementById('titulo').value = reserva.titulo;
        document.getElementById('descricao').value = reserva.descricao;
        document.getElementById('data').value = reserva.data;
        document.getElementById('hora').value = reserva.hora;

        // Obter detalhes do cliente
        const clienteResponse = await fetch(`http://localhost:8080/filterIdCliente/${reserva.idCliente}`, { headers });
        const cliente = await clienteResponse.json();
        document.getElementById('idCliente').value = cliente.nome;

        document.getElementById('adicionais').value = reserva.adicionais;
        document.getElementById('status').value = reserva.status;
    } catch (error) {
        console.log(error);
    }
}

async function putReserva(e) {
    const token = sessionStorage.getItem('token'); //PEGA O TOKEM DO LOCAL STORAGE E JOGA NO HEADERS PARA VERIFICACAO
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token,
    };
    e.preventDefault()
    const reservaid = document.getElementById("idReserva").value
    try {
        const body = {};

        if (e.target.titulo.value) {
            body.titulo = e.target.titulo.value;
        }
        if (e.target.descricao.value) {
            body.descricao = e.target.descricao.value;
        }
        if (e.target.data.value) {
            body.data = e.target.data.value;
        }
        if (e.target.idCliente.value) {
            body.idCliente = e.target.idCliente.value;
        }
        if (e.target.adicionais.value) {
            body.adicionais = e.target.adicionais.value;
        }
        if (e.target.status.value) {
            body.status = e.target.status.value;
        }

        const response = await fetch(`http://localhost:8000/reservaPut/${reservaid}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify(body)
        });
        const dados = await response.json();
        console.log(dados);

        alert = "Reserva atualizada com sucesso";
        window.location.href = "../html/crudReserva.html";

    } catch (erro) {
        console.log(erro);
    }
}