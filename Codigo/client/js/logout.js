// Função de logout
function logout() {
  // Limpar os dados de sessão, se necessário;
  localStorage.removeItem("token");

  // Redirecionar o usuário para a página de login ou qualquer outra página desejada após o logout;
  // Exemplo: window.location.href = 'pagina_de_login.html';

  // Exemplo de mensagem de logout
  console.log("Usuário saiu");
  window.alert("Usuario saiu");

  // Se preferir redirecionar para a página inicial após o logout;
  window.location.href = "../html/index.html";
}
