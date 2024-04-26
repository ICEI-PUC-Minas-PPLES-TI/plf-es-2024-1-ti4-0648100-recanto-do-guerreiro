window.onload = async function getGestao() {
  const token = sessionStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: token,
  };

  try {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    const dadosBrutos = await fetch(
      `http://localhost:8000/filterIdGestao/${id}`,
      { headers }
    );
    const gestao = await dadosBrutos.json();

    document.getElementById("idGestao").value = gestao.id;

    // Obter detalhes do cliente;
    const clienteResponse = await fetch(
      `http://localhost:8080/filterIdCliente/${gestao.idCliente}`,
      { headers }
    );
    const cliente = await clienteResponse.json();
    document.getElementById("idCliente").value = cliente.nome;

    // Obter detalhes da reserva;
    const reservaResponse = await fetch(
      `http://localhost:8080/filterIdReserva/${gestao.idReserva}`,
      { headers }
    );
    const reserva = await reservaResponse.json();
    document.getElementById("idReserva").value = reserva.titulo;

    document.getElementById("custos").value = gestao.custos;
    document.getElementById("descricao").value = gestao.descricao;
  } catch (error) {
    console.log(error);
  }
};

async function putGestao(e) {
  const token = sessionStorage.getItem("token"); //PEGA O TOKEM DO LOCAL STORAGE E JOGA NO HEADERS PARA VERIFICACAO
  const headers = {
    "Content-Type": "application/json",
    Authorization: token,
  };
  e.preventDefault();
  const gestaoid = document.getElementById("idGestao").value;
  try {
    const body = {};

    if (e.target.idCliente.value) {
      body.idCliente = e.target.idCliente.value;
    }
    if (e.target.idReserva.value) {
      body.idReserva = e.target.idReserva.value;
    }
    if (e.target.custos.value) {
      body.custos = e.target.custos.value;
    }
    if (e.target.descricao.value) {
      body.descricao = e.target.descricao.value;
    }

    const response = await fetch(
      `http://localhost:8000/gestaoPut/${gestaoid}`,
      {
        method: "PUT",
        headers,
        body: JSON.stringify(body),
      }
    );
    const dados = await response.json();
    console.log(dados);

    alert = "Gestão atualizada com sucesso";
    window.location.href = "../html/crudGestao.html";
  } catch (erro) {
    console.log(erro);
  }
}

// Função de logout;
function logout() {
  // Limpar os dados de sessão, se necessário;
  localStorage.removeItem("token");
  // Redirecionar o usuário para a página de login ou qualquer outra página desejada após o logout;
  // Exemplo: window.location.href = 'pagina_de_login.html';
  // Exemplo de mensagem de logout;
  console.log("Usuário saiu");
  window.alert("Usuario saiu");
  // Se preferir redirecionar para a página inicial após o logout
  window.location.href = "./index.html";
}
