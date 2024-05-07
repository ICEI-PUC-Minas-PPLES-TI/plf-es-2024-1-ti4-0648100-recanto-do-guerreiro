window.addEventListener("load", displayWorkshops());

async function addCliente(e) {
    const token = sessionStorage.getItem("token"); //PEGA O TOKEM DO LOCAL STORAGE E JOGA NO HEADERS PARA VERIFICACAO
    const headers = {
        "Content-Type": "application/json",
        Authorization: token,
    };
    e.preventDefault();
    try {
        const response = await fetch("http://localhost:8000/cliente", {
            method: "POST",
            headers,
            body: JSON.stringify({
                nome: e.target.nome.value,
                telefone: e.target.telefone.value,
                email: e.target.email.value,
                logradouro: e.target.querySelector("#logradouro").value,
                complemento: e.target.complemento.value,
                bairro: e.target.bairro.value,
            }),
        });
        const dados = await response.json();
        console.log(dados);
        window.alert("Cliente Cadastrado Com Sucesso!");
        window.location.href = "../html/crudCliente.html";
    } catch (erro) {
        console.log(erro);
    }
}

async function displayWorkshops() {
    const table = document.getElementById("displayClientes");
    table.innerHTML = "";
    const token = sessionStorage.getItem("token");
    const headers = {
        "Content-Type": "application/json",
        Authorization: token,
    };
    let dadoBruto = await fetch("http://localhost:8000/cliente", { headers });
    let workshops = await dadoBruto.json();

    workshops.forEach(async (workshop) => {
        const newRow = table.insertRow();
        newRow.innerHTML = `
            <td>${workshop.nome}</td>
            <td>${workshop.telefone}</td>
            <td>${workshop.email}</td>
            <td>${workshop.logradouro}</td>
            <td>${workshop.complemento}</td> 
            <td>${workshop.bairro}</td>
            <td>
            <a class="btn btn-primary" href="../html/attCliente.html?id=${workshop.id}">Editar →</a>
            <br>
            <br>
            <button onclick="deletecliente(${workshop.id})">
            <img src="../img/botao.jpg" alt="Excluir" width="30" height="30">
        </button>
            </td>
        `;
    });
}

async function deletecliente(index) {
    const token = sessionStorage.getItem("token"); //PEGA O TOKEM DO LOCAL STORAGE E JOGA NO HEADERS PARA VERIFICACAO
    const headers = {
        "Content-Type": "application/json",
        Authorization: token,
    };

    const response = await fetch(`http://localhost:8000/cliente/${index}`, {
        method: "DELETE",
        headers,
    });

    displayWorkshops();
}

async function visualizarClientes() {
    try {
        const token = sessionStorage.getItem("token");
        const headers = {
            "Content-Type": "application/json",
            Authorization: token,
        }

        const response = await fetch("http://localhost:8000/cliente", { headers, });
        if (!response.ok) {
            throw new Error("Erro ao obter clientes");
        }
        displayWorkshops();
        document.getElementById('tabelaClientes').style.display = 'block';
    } catch (error) {
        console.log("erro ao visualizar clientes", error);
    }
}

async function alternarLista() {
    try {
        const botaoVisualizar = document.getElementById('btn_Visualizar');
        const tabelaClientes = document.getElementById('tabelaClientes');

        if (tabelaClientes.style.display === 'none') {
            await visualizarClientes();
            tabelaClientes.style.display = 'block';
            botaoVisualizar.textContent = 'Minimizar Lista';
        } else {
            tabelaClientes.style.display = 'none';
            botaoVisualizar.textContent = 'Visualizar Clientes';
        }
    } catch (error) {
        console.error("Erro ao alternar lista de clientes:", error);
    }
}

