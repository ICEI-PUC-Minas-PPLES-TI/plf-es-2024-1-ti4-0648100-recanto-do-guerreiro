window.addEventListener('load', displayWorkshops());

async function addCliente(e) {
    const token = sessionStorage.getItem('token'); //PEGA O TOKEM DO LOCAL STORAGE E JOGA NO HEADERS PARA VERIFICACAO
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token,
    };
    e.preventDefault();
    try {
        const response = await fetch('http://localhost:8000/cliente', {
            method: 'POST',
            headers,
            body: JSON.stringify({
                nome: e.target.nome.value,
                telefone: e.target.telefone.value,
                email: e.target.email.value,
                logradouro: e.target.logradouro.value,
                complemento: e.target.complemento.value,
                bairro: e.target.bairro.value,
            })
        });
        const dados = await response.json();
        console.log(dados);
        window.alert("Cliente Cadastrado Com Sucesso!");
        window.location.href = "/Codigo/client/crudCliente.html";
    } catch (erro) {
        console.log(erro);
    }
}

async function displayWorkshops() {
    const table = document.getElementById("displayClientes");
    table.innerHTML = "";
    const token = sessionStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token,
    };
    let dadoBruto = await fetch('http://localhost:8000/cliente', { headers });
    let workshops = await dadoBruto.json();

    workshops.forEach(async(workshop) => {
        const newRow = table.insertRow();
        newRow.innerHTML = `
            <td>${workshop.nome}</td>
            <td>${workshop.telefone}</td>
            <td>${workshop.email}</td>
            <td>${workshop.logradouro}</td>
            <td>${workshop.complemento}</td> 
            <td>${workshop.bairro}</td>
            <td>
            <a class="btn btn-primary" href="/Codigo/client/attCliente.html?id=${workshop.id}">Editar →</a>
            <button onclick="deletecliente(${workshop.id})">Excluir</button>
            </td>
        `;
    });
}


async function deletecliente(index) {
    const token = sessionStorage.getItem('token'); //PEGA O TOKEM DO LOCAL STORAGE E JOGA NO HEADERS PARA VERIFICACAO
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token,
    };

    const response = await fetch(`http://localhost:8000/cliente/${index}`, {
        method: 'DELETE',
        headers
    });

    displayWorkshops();
}