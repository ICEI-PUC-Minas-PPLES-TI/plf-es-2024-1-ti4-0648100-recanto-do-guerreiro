window.addEventListener("load", displayWorkshops());

async function addReserva(e) {
  e.preventDefault();
  const token = sessionStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: token,
  };

  try {
    const response = await fetch("http://localhost:8000/reserva", {
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

    const dados = await response.json();
    console.log(dados);
    window.alert("Reserva Cadastrada Com Sucesso!");
    window.location.href = "../html/crudReserva.html";
  } catch (error) {
    console.log("Error adding reserva:", error);
  }
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
        `http://localhost:8000/filterIdCliente/${workshop.idCliente}`,
        { headers }
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
      newRow.innerHTML = `
        <td>${workshop.titulo}</td>
        <td>${workshop.descricao}</td>
        <td>${dataFormatada}</td> <!-- Utiliza a data formatada -->
        <td>${workshop.hora}</td>
        <td>${cliente.nome}</td> 
        <td>${workshop.adicionais}</td>
        <td>${workshop.status}</td>
        <td>
          <a class="btn btn-primary" href="../html/attReserva.html?id=${workshop.id}">Editar →</a>
          <button onclick="deletereserva(${workshop.id})">Excluir</button>
        </td>
      `;
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

// Preencher as listas suspensas quando a página for carregada;
window.addEventListener("load", () => {
  populateClienteSelect();
});
