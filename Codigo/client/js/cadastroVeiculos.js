var closeModalBtn = document.getElementById("closeModalBtn");
var modal = document.getElementById("myModal");

window.addEventListener('load', displayveiculos());

async function mostrarDetalhes(id) {

    try {
        const token = sessionStorage.getItem('token'); //PEGA O TOKEM DO LOCAL STORAGE E JOGA NO HEADERS PARA VERIFICACAO
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': token,
        };
        let dados = (await fetch(`http://localhost:8000/filterIdCarro/${id}`))
        let dadoCheck = (await fetch(`http://localhost:8000/checklist/${id}`, { headers }))
        let checklist = await dadoCheck.json()
        let veiculo = await dados.json()
        document.getElementById("placaDisplay").innerHTML = veiculo.placa
        document.getElementById("chassiDisplay").innerHTML = veiculo.chassi
        document.getElementById("corDisplay").innerHTML = veiculo.cor
        document.getElementById("motorDisplay").innerHTML = veiculo.motor

        document.getElementById("suspensaoDet").checked = checklist.suspensao;
        document.getElementById("latariaDet").checked = checklist.lataria;
        document.getElementById("pneusDet").checked = checklist.pneus;
        document.getElementById("motorCheckDet").checked = checklist.motor;
        document.getElementById("cambioDet").checked = checklist.cambio;
        document.getElementById("interiorDet").checked = checklist.interior;
        document.getElementById("documentacaoDet").checked = checklist.documentacao;
        document.getElementById("eletricaDet").checked = checklist.eletrica;
        modal.style.display = "block";

    } catch (erro) {
        console.log(erro)
    }
}

closeModalBtn.addEventListener("click", function() {
    modal.style.display = "none";
});

window.addEventListener("click", function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
});

async function addveiculos(e) {
    const token = sessionStorage.getItem('token'); //PEGA O TOKEM DO LOCAL STORAGE E JOGA NO HEADERS PARA VERIFICACAO
    const headers = {
        'Authorization': token,
    };
    e.preventDefault();
    const formData = new FormData();
    formData.append('imagem', e.target.imagem.files[0]); // Adiciona a imagem ao FormData
    formData.append('marca', e.target.marca.value);
    formData.append('modelo', e.target.modelo.value);
    formData.append('ano', e.target.ano.value);
    formData.append('preco', e.target.preco.value);
    formData.append('placa', e.target.placa.value);
    formData.append('chassi', e.target.chassi.value);
    formData.append('motor', e.target.motor.value);
    formData.append('cor', e.target.cor.value);
    formData.append('status', e.target.status.value);
    try {
        const response = await fetch('http://localhost:8000/carro', {
            method: 'POST',
            headers,
            body: formData
        });
        const dados = await response.json();
        console.log(dados)

        window.alert("Veiculo Cadastrado Com Sucesso!");
        //window.location.href = "/Codigo/client/CrudVeiculo.html";
    } catch (erro) {
        console.log(erro);
    }
    displayveiculos();
}

async function displayveiculos() {
    const table = document.getElementById("listarVeiculos");
    table.innerHTML = "";
    const token = sessionStorage.getItem('token'); //PEGA O TOKEM DO LOCAL STORAGE E JOGA NO HEADERS PARA VERIFICACAO
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token,
    };
    try {
        let dados = (await fetch('http://localhost:8000/carro'))
        let veiculos = await dados.json()
        veiculos.forEach((veiculos) => {
            const newRow = table.insertRow();
            newRow.innerHTML = `
                    <td><img src="http://localhost:8000/${veiculos.imagem}" width="100" height="100" alt="Imagem Veiculo"></td>
                    <td>${veiculos.marca}</td>
                    <td>${veiculos.modelo}</td>
                    <td>${veiculos.ano}</td>
                    <td>${veiculos.preco}</td>
                    <td>${veiculos.status}</td>
                    
                    <td>
                    <a class="btn btn-primary" href="/Codigo/client/attVeiculo.html?id=${veiculos.id}">Editar</a>
                    <button onclick="handleClick(${veiculos.id})">Liberar veiculo para venda</button>
                    <button onclick="mostrarDetalhes(${veiculos.id})">Detalhes</button>
                    <a class="btn btn-primary" href="/Codigo/client/vendaFinal.html?id=${veiculos.id}">Registrar Venda</a>
                    <button onclick="deleteveiculos(${veiculos.id})">Excluir</button>
                    </td>
                    
                `;
        });

    } catch (erro) {
        console.log(erro)
    }
}

async function deleteveiculos(index) {
    const token = sessionStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token,
    };
    const response = await fetch(`http://localhost:8000/carro/${index}`, {
        method: 'DELETE',
        headers
    });
    deletecheck(index)
    displayveiculos()
}
async function deletecheck(index) {
    const token = sessionStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token,
    };
    const response = await fetch(`http://localhost:8000/checklistCar/${index}`, {
        method: 'DELETE',
        headers
    });
    console.log(response)
}

// abrir e fechar modal
var openModalBtn = document.getElementById("openModalBtn");
var closeModalBtn = document.getElementById("closeModalBtn");
var modal = document.getElementById("myModal");

openModalBtn.addEventListener("click", function() {
    modal.style.display = "block";
});

closeModalBtn.addEventListener("click", function() {
    modal.style.display = "none";
});

window.addEventListener("click", function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
});

async function liberarVeiculo(index) {
    const token = sessionStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token,
    };
    try {
        // Primeiro, obtenha o veículo atual
        const responseGet = await fetch(`http://localhost:8000/filterIdCarro/${index}`, {
            method: 'GET',
            headers
        });
        const veiculo = await responseGet.json();

        // Verifique o status
        if (veiculo.status == 'oficina' || veiculo.status == 'disponivel') {
            // Se o status for 'oficina', atualize o status para 'disponivel'
            const body = {};
            body.status = 'disponivel';

            const responsePut = await fetch(`http://localhost:8000/carroPut/${index}`, {
                method: 'PUT',
                headers,
                body: JSON.stringify(body)
            });
            const dados = await responsePut.json();
            console.log(dados);

            window.alert("Veículo liberado para venda, vá para a página de VendaDeVeiculo.html para fazer alterações");
            window.location.href = "/Codigo/client/CrudVeiculo.html";
        } else {
            window.alert("Não é possível liberar o veículo para venda pois ele ja foi vendido!");
            return;
        }


    } catch (erro) {
        console.log(erro);
    }
}

async function handleClick(id) {
    try {
        await liberarVeiculo(id);
    } catch (erro) {
        console.error(erro);
    }
}