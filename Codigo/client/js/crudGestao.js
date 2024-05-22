window.addEventListener("load", displayWorkshops());

async function addGestao(e) {
    const token = sessionStorage.getItem("token"); //PEGA O TOKEM DO LOCAL STORAGE E JOGA NO HEADERS PARA VERIFICACAO
    const headers = {
        "Content-Type": "application/json",
        Authorization: token,
    };
    e.preventDefault();
    try {
        const response = await fetch("http://localhost:8000/gestao", {
            method: "POST",
            headers,
            body: JSON.stringify({
                idCliente: e.target.idCliente.value,
                idReserva: e.target.idReserva.value,
                custos: e.target.custos.value,
                descricao: e.target.descricao.value,
            }),
        });
        const dados = await response.json();
        console.log(dados);
        window.alert("Gestão Cadastrada Com Sucesso!");
        window.location.href = "../html/crudGestao.html";
    } catch (erro) {
        console.log(erro);
    }
}

async function displayWorkshops() {
    const table = document.getElementById("displayGestoes");
    table.innerHTML = "";
    const token = sessionStorage.getItem("token");
    const headers = {
        "Content-Type": "application/json",
        Authorization: token,
    };
    let dadoBruto = await fetch("http://localhost:8000/gestao", { headers });
    let workshops = await dadoBruto.json();

    if (workshops.length === 0) {
        return false;
    }

    workshops.forEach(async (workshop) => {
        // Obter detalhes do cliente;
        let clienteResponse = await fetch(
            `http://localhost:8000/filterIdCliente/${workshop.idCliente}`, { headers }
        );
        let cliente = await clienteResponse.json();

        // Obter detalhes da Reserva;
        let reservaResponse = await fetch(
            `http://localhost:8000/filterIdReserva/${workshop.idReserva}`, { headers }
        );
        let reserva = await reservaResponse.json();

        const newRow = table.insertRow();
        newRow.innerHTML = `
            <td>${cliente.nome}</td>
            <td>${reserva.titulo}</td>      
            <td>${workshop.custos}</td>
            <td>${workshop.descricao}</td>
            <td>
            <a class="btn btn-editar" href="../html/attGestao.html?id=${workshop.id}"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square icon-margin" viewBox="0 0 16 16">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
          </svg>Editar</a>
            <br>
            <br>
            <button class = "btn btn-excluir "onclick="deletegestao(${workshop.id})"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill icon-margin" viewBox="0 0 16 16">
            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
          </svg>Excluir</button>
            </td>
        `;
    });
    return true;
}

async function deletegestao(index) {
    const token = sessionStorage.getItem("token"); //PEGA O TOKEM DO LOCAL STORAGE E JOGA NO HEADERS PARA VERIFICACAO
    const headers = {
        "Content-Type": "application/json",
        Authorization: token,
    };
    const confirmacao = confirm("Tem certeza que deseja excluir essa Gestão?");

    if (confirmacao) {
        const response = await fetch(`http://localhost:8000/gestao/${index}`, {
            method: "DELETE",
            headers,
        });

    }

    displayWorkshops();
}

// Função para buscar Clientes cadastrados e preencher a lista suspensa;
async function populateClienteSelect() {
    const token = sessionStorage.getItem("token");
    const headers = {
        "Content-Type": "application/json",
        Authorization: token,
    };

    try {
        const response = await fetch("http://localhost:8000/cliente", { headers });
        const clientes = await response.json();
        const clienteSelect = document.getElementById("idCliente");

        // Preencha a seleção com opções;
        clientes.forEach((cliente) => {
            const option = document.createElement("option");
            option.value = cliente.id; // Armazene o valor do ID;
            option.textContent = cliente.nome; // Exibir o valor do nome;
            clienteSelect.appendChild(option);
        });
    } catch (error) {
        console.error("Error fetching Clientes:", error);
    }
}

// Função para buscar Reservas cadastradas e preencher a lista suspensa;
async function populateReservaSelect() {
    const token = sessionStorage.getItem("token");
    const headers = {
        "Content-Type": "application/json",
        Authorization: token,
    };

    try {
        const response = await fetch("http://localhost:8000/reserva", { headers });
        const reservas = await response.json();
        const reservaSelect = document.getElementById("idReserva");

        // Preencha a seleção com opções;
        reservas.forEach((reserva) => {
            const option = document.createElement("option");
            option.value = reserva.id; // Armazene o valor do ID;
            option.textContent = reserva.titulo; // Exibir o valor do título;
            reservaSelect.appendChild(option);
        });
    } catch (error) {
        console.error("Error fetching Reservas:", error);
    }
}

// Preencher as listas suspensas quando a página for carregada;
window.addEventListener("load", () => {
    populateClienteSelect();
    populateReservaSelect();
});

async function visualizarGestao() {
    try {
        const token = sessionStorage.getItem("token");
        const headers = {
            "Content-Type": "application/json",
            Authorization: token,
        }

        const response = await fetch("http://localhost:8000/gestao", { headers, });
        if (!response.ok) {
            throw new Error("Erro ao obter gestões");
        }
        displayWorkshops();
        document.getElementById('tabelaGestao').style.display = 'block';
    } catch (error) {
        console.log("erro ao visualizar gestões", error);
    }
}

async function alternarLista() {
    try {
        const botaoVisualizar = document.getElementById('btn_visualizar');
        const tabelaGestao = document.getElementById('tabelaGestao');
        const mensagemSemItens = document.getElementById('mensagemSemItens');

        if (tabelaGestao.style.display === 'none') {
            const temGestao = await displayWorkshops();
            if (temGestao) {
                tabelaGestao.style.display = 'table';
                mensagemSemItens.style.display = 'none';
                botaoVisualizar.textContent = 'Minimizar Lista';
            } else {
                tabelaGestao.style.display = 'none';
                mensagemSemItens.style.display = 'flex';
                botaoVisualizar.textContent = 'Minimizar Lista';
            }
        } else {
            tabelaGestao.style.display = 'none';
            mensagemSemItens.style.display = 'none';
            botaoVisualizar.textContent = 'Visualizar Gestões';
        }

    } catch (error) {
        console.error("Erro ao alternar lista de gestões:", error);
    }
}