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
  window.location.href = "../index.html";
}

async function addReserva(e) {
  e.preventDefault();
  const token = sessionStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: token,
  };

  // Obtenha a data do formulário
  const data = e.target.data.value;

  try {
    // Verificar se a data já existe no banco antes de prosseguir com a criação da reserva
    const response = await fetch(
      `http://localhost:8000/verificarData?data=${data}`,
      {
        headers,
      }
    );

    // Verifique se a resposta da API está OK
    if (!response.ok) {
      throw new Error("Erro ao verificar a existência da data da reserva.");
    }

    // Analise a resposta JSON
    const { existe } = await response.json();

    // Se a data já existir, exiba um alerta e retorne
    if (existe) {
      window.alert("Essa data já foi reservada.");
      return;
    }

    // Se a data não existir, prossiga com a criação da reserva
    const createReservaResponse = await fetch("http://localhost:8000/reserva", {
      method: "POST",
      headers,
      body: JSON.stringify({
        titulo: e.target.titulo.value,
        descricao: e.target.descricao.value,
        data,
        hora: e.target.hora.value,
        idCliente: e.target.idCliente.value,
        adicionais: e.target.adicionais.value,
        status: e.target.status.value,
      }),
    });

    // Verifique se a resposta da criação da reserva está OK
    if (!createReservaResponse.ok) {
      throw new Error("Erro ao criar a reserva.");
    }

    // Obtenha os dados da reserva criada
    const dados = await createReservaResponse.json();
    console.log(dados);
    window.alert("Reserva Cadastrada Com Sucesso!");
    window.location.href = "../html/crudReserva.html";
  } catch (error) {
    // Trate qualquer erro que ocorra durante o processo
    console.error(error);
    window.alert("Ocorreu um erro ao adicionar a reserva.");
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
          <br>
          <br>
          <button onclick="deletereserva(${workshop.id})">
    <img src="../img/botao.jpg" alt="Excluir" width="30" height="30">
</button>

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
