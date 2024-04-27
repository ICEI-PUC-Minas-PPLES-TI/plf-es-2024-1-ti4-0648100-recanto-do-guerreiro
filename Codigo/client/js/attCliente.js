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

async function putCliente(e) {
  const token = sessionStorage.getItem("token"); //PEGA O TOKEM DO LOCAL STORAGE E JOGA NO HEADERS PARA VERIFICACAO
  const headers = {
    "Content-Type": "application/json",
    Authorization: token,
  };
  e.preventDefault();
  const reservaid = document.getElementById("idCliente").value;

  try {
    const body = {};

    if (e.target.nome.value) {
      body.nome = e.target.nome.value;
    }
    if (e.target.telefone.value) {
      body.telefone = e.target.telefone.value;
    }
    if (e.target.email.value) {
      body.email = e.target.email.value;
    }
    if (e.target.logradouro.value) {
      body.logradouro = e.target.logradouro.value;
    }
    if (e.target.complemento.value) {
      body.complemento = e.target.complemento.value;
    }
    if (e.target.bairro.value) {
      body.bairro = e.target.bairro.value;
    }

    const response = await fetch(
      `http://localhost:8000/clientePut/${reservaid}`,
      {
        method: "PUT",
        headers,
        body: JSON.stringify(body),
      }
    );
    const dados = await response.json();
    console.log(dados);

    alert = "Cliente atualizado com sucesso";
    window.location.href = "../html/crudCliente.html";
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
