window.onload = async function getCliente() {
  const token = sessionStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: token,
  };

  try {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    const dadosBrutos = await fetch(
      `http://localhost:8000/filterIdCliente/${id}`,
      { headers }
    );
    const cliente = await dadosBrutos.json();

    document.getElementById("idCliente").value = cliente.id;
    document.getElementById("nome").value = cliente.nome;
    document.getElementById("telefone").value = cliente.telefone;
    document.getElementById("email").value = cliente.email;
    document.getElementById("logradouro").value = cliente.logradouro;
    document.getElementById("complemento").value = cliente.complemento;
    document.getElementById("bairro").value = cliente.bairro;
  } catch (error) {
    console.log(error);
  }
};

async function putReserva(e) {
  e.preventDefault();
  const token = sessionStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: token,
  };

  const reservaid = document.getElementById("idReserva").value;

  try {
    const body = {};

    if (e.target.titulo.value) {
      body.titulo = e.target.titulo.value;
    }
    if (e.target.descricao.value) {
      body.descricao = e.target.descricao.value;
    }
    if (e.target.data.value) {
      // Verificar se a nova data já está reservada
      const dataExistente = await verificarDataExistente(
        e.target.data.value,
        reservaid
      );
      if (dataExistente) {
        window.alert("Essa data já foi reservada.");
        return;
      }
      body.data = e.target.data.value;
    }
    if (e.target.hora.value) {
      body.hora = e.target.hora.value;
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

    const response = await fetch(
      `http://localhost:8000/reservaPut/${reservaid}`,
      {
        method: "PUT",
        headers,
        body: JSON.stringify(body),
      }
    );

    const dados = await response.json();
    console.log(dados);

    window.alert("Reserva atualizada com sucesso");
    window.location.href = "../html/crudReserva.html";
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
  // Se preferir redirecionar para a página inicial após o logout;
  window.location.href = "../index.html";
}
