window.addEventListener("load", displayWorkshops());

async function addReserva(e) {
    e.preventDefault();
    const token = sessionStorage.getItem("token");
    const headers = {
        "Content-Type": "application/json",
        Authorization: token,
    };

    // Se a data não existir, prossiga com a criação da reserva
    const createReservaResponse = await fetch("http://localhost:8000/reserva", {
        method: "POST",
        headers,
        body: JSON.stringify({
            titulo: e.target.titulo.value,
            descricao: e.target.descricao.value,
            data: e.target.data.value,
            hora: e.target.hora.value,
            idCliente: e.target.idCliente.value,
            adicionais: e.target.adicionais.value,
            status: e.target.status.value,
        }),
    });

    // Obtenha os dados da reserva criada
    const dados = await createReservaResponse.json();
    console.log(dados);
    window.alert("Reserva Cadastrada Com Sucesso!");
    window.location.href = "../html/crudReserva.html";


}

async function displayWorkshops() {
    const table = document.getElementById("displayReservas");
    table.innerHTML = "";
    const token = sessionStorage.getItem("token");
    const headers = {
        "Content-Type": "application/json",
        Authorization: token,
    };

    try {
        const response = await fetch("http://localhost:8000/reserva", { headers });
        const workshops = await response.json();

        workshops.forEach(async (workshop) => {
            // Obter detalhes do cliente
            const clienteResponse = await fetch(
                `http://localhost:8000/filterIdCliente/${workshop.idCliente}`, { headers }
            );
            const cliente = await clienteResponse.json();

            // Extrair dia, mês e ano da data
            const data = new Date(workshop.data);
            const dia = String(data.getUTCDate()).padStart(2, "0");
            const mes = String(data.getUTCMonth() + 1).padStart(2, "0"); // Mês começa do zero
            const ano = data.getUTCFullYear();

            // Formatando a data manualmente para "dd/mm/aaaa"
            const dataFormatada = `${dia}/${mes}/${ano}`;

            const newRow = table.insertRow();
            newRow.innerHTML = `<td>${workshop.titulo}</td>
        <!--<td>${workshop.descricao}</td>-->
        <td>${dataFormatada}</td> <!-- Utiliza a data formatada -->
        <td>${workshop.hora}</td>
        <td>${cliente.nome}</td> 
        <!--<td>${workshop.adicionais}</td>-->
        <td>${workshop.status}</td>
        <td class = "td-especial">
          <a class="btn btn-editar" href="../html/attReserva.html?id=${workshop.id}">Editar</a>
          <br>
          <br>
          <button class = "btn btn-excluir" "onclick="deletereserva(${workshop.id})">Excluir</button>

        </td>`;
        });
    } catch (error) {
        console.error("Error fetching workshops:", error);
    }
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

async function deletereserva(index) {
    const token = sessionStorage.getItem("token"); //PEGA O TOKEM DO LOCAL STORAGE E JOGA NO HEADERS PARA VERIFICACAO
    const headers = {
        "Content-Type": "application/json",
        Authorization: token,
    };

    const response = await fetch(`http://localhost:8000/reserva/${index}`, {
        method: "DELETE",
        headers,
    });

    displayWorkshops();
}
// Verificar se a data selecionada é um sábado ou domingo
function checkWeekend(input) {
    const selectedDate = new Date(input.value);
    const day = selectedDate.getDay();
    if (day === 5 || day === 6) {
        input.setCustomValidity("");
    } else {
        input.setCustomValidity(
            "Por favor, selecione uma data de sábado ou domingo."
        );
    }
}

// Preencher as listas suspensas quando a página for carregada;
window.addEventListener("load", () => {
    populateClienteSelect();
});

async function visualizarReservas() {
    try {
        const token = sessionStorage.getItem("token");
        const headers = {
            "Content-Type": "application/json",
            Authorization: token,
        }

        const response = await fetch("http://localhost:8000/cliente", { headers, });
        if (!response.ok) {
            throw new Error("Erro ao obter Reservas");
        }
        displayWorkshops();
        document.getElementById('tabelaReservas').style.display = 'block';
    } catch (error) {
        console.log("erro ao visualizar Reservas", error);
    }
}

async function alternarLista() {
    try {
        const botaoVisualizar = document.getElementById('btn_Visualizar');
        const tabelaReservas = document.getElementById('tabelaReservas');

        if (tabelaReservas.style.display === 'none') {
            await visualizarReservas();
            tabelaReservas.style.display = 'block';
            botaoVisualizar.textContent = 'Minimizar Lista';
        } else {
            tabelaReservas.style.display = 'none';
            botaoVisualizar.textContent = 'Visualizar Reservas';
        }
    } catch (error) {
        console.error("Erro ao alternar lista de Reservas:", error);
    }
}