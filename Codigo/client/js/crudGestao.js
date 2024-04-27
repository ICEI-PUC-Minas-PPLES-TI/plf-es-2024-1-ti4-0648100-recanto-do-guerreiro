window.addEventListener("load", displayWorkshops());

// Função de logout;
function logout() {
  // Limpar os dados de sessão, se necessário;
  localStorage.removeItem("token");
  // Redirecionar o usuário para a página de login ou qualquer outra página desejada após o logout;
  // Exemplo: window.location.href = 'pagina_de_login.html';
  // Exemplo de mensagem de logout;
  console.log("Usuário saiu");
  window.alert("Usuario saiu");
  // Se preferir redirecionar para a página inicial após o logout;
  window.location.href = "./index.html";
}

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

  workshops.forEach(async (workshop) => {
    // Obter detalhes do cliente;
    let clienteResponse = await fetch(
      `http://localhost:8000/filterIdCliente/${workshop.idCliente}`,
      { headers }
    );
    let cliente = await clienteResponse.json();

    // Obter detalhes da Reserva;
    let reservaResponse = await fetch(
      `http://localhost:8000/filterIdReserva/${workshop.idReserva}`,
      { headers }
    );
    let reserva = await reservaResponse.json();

    const newRow = table.insertRow();
    newRow.innerHTML = `
            <td>${cliente.nome}</td>
            <td>${reserva.titulo}</td>      
            <td>${workshop.custos}</td>
            <td>${workshop.descricao}</td>
            <td>
            <a class="btn btn-primary" href="../html/attGestao.html?id=${workshop.id}">Editar →</a>
            <br>
            <br>
            <button onclick="deletegestao(${workshop.id})">
            <img src="../img/botao.jpg" alt="Excluir" width="30" height="30">
        </button>
            </td>
        `;
  });
}

async function deletegestao(index) {
  const token = sessionStorage.getItem("token"); //PEGA O TOKEM DO LOCAL STORAGE E JOGA NO HEADERS PARA VERIFICACAO
  const headers = {
    "Content-Type": "application/json",
    Authorization: token,
  };

  const response = await fetch(`http://localhost:8000/gestao/${index}`, {
    method: "DELETE",
    headers,
  });

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
