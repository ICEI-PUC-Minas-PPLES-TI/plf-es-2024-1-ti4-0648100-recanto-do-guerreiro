window.addEventListener('load', displayWorkshops());

async function addOficina(e) {
    const token = sessionStorage.getItem('token');//PEGA O TOKEM DO LOCAL STORAGE E JOGA NO HEADERS PARA VERIFICACAO
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token,
      };
    e.preventDefault();
    try {
        const response = await fetch('http://localhost:8000/oficina', {
            method: 'POST',
            headers,
            body: JSON.stringify({
                nome: e.target.nome.value,
                logradouro: e.target.logradouro.value,
                numero: e.target.numero.value,
                complemento: e.target.complemento.value,
                cep: e.target.cep.value,
                descricao: e.target.descricao.value,
                especialidade: e.target.especialidade.value,
                telefone: e.target.telefone.value,

            })
        });
        const dados = await response.json();
        console.log(dados);
        window.alert("Oficina Cadastrada Com Sucesso!");
        window.location.href = "/Codigo/client/CrudCadastroOficinas.html";
    } catch (erro) {
        console.log(erro);
    }
}

async function displayWorkshops() {
    const table = document.getElementById("displayOficinas");
    table.innerHTML = "";
    const token = sessionStorage.getItem('token');//PEGA O TOKEM DO LOCAL STORAGE E JOGA NO HEADERS PARA VERIFICACAO
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token,
      };
    let dadoBruto = await fetch('http://localhost:8000/oficina', {headers})
    let workshops = await dadoBruto.json()

    workshops.forEach((workshop) => {
        const newRow = table.insertRow();
        newRow.innerHTML = `
            <td>${workshop.nome}</td>
            <td>${workshop.logradouro}</td>
            <td>${workshop.numero}</td> <!-- Exibe o número -->
            <td>${workshop.complemento}</td> <!-- Exibe o complemento -->
            <td>${workshop.descricao}</td>
            <td>${workshop.especialidade}</td>
            <td>${workshop.telefone}</td>
            <td>${workshop.cep}</td>
            <td>
            <a class="btn btn-primary" href="/Codigo/client/attOficina.html?id=${workshop.id}">Editar →</a>
            <button onclick="deleteoficinas(${workshop.id})">Excluir</button>
            </td>
        `;
    });
}

async function deleteoficinas(index) {
    const token = sessionStorage.getItem('token');//PEGA O TOKEM DO LOCAL STORAGE E JOGA NO HEADERS PARA VERIFICACAO
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token,
      };

    const response = await fetch(`http://localhost:8000/oficina/${index}`, {
        method: 'DELETE',
        headers
    });

    displayWorkshops();
}