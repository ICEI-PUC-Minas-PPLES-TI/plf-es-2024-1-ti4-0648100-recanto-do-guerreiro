// Função para validar o formulário
function validarFormulario() {
    var nome = document.getElementById("nome").value;
    var email = document.getElementById("email").value;
    var telefone = document.getElementById("telefone").value;
    var marcaCarro = document.getElementById("marcaCarro").value;
    var modeloCarro = document.getElementById("modeloCarro").value;
    var mensagem = document.getElementById("mensagem").value;

    if (nome === "") {
        alert("Por favor, preencha o campo Nome.");
        return false;
    }

    if (email === "") {
        alert("Por favor, preencha o campo E-mail.");
        return false;
    }

    if (telefone === "") {
        alert("Por favor, preencha o campo Telefone.");
        return false;
    }

    if (marcaCarro === "") {
        alert("Por favor, preencha o campo Marca do Carro Desejado.");
        return false;
    }

    if (modeloCarro === "") {
        alert("Por favor, preencha o campo Modelo do Carro Desejado.");
        return false;
    }

    if (mensagem === "") {
        alert("Por favor, preencha o campo Modelo do Carro Desejado.");
        return false;
    }
    // Se todos os campos estiverem preenchidos, o formulário é válido
    return true;
}

window.onload = async function getCompra() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        const dadosBrutos = await fetch(`http://localhost:8000/filterIdCarro/${id}`)
        const veiculo = await dadosBrutos.json()
        document.getElementById('marcaCarro').value = veiculo.marca
        document.getElementById('modeloCarro').value = veiculo.modelo
            //getCheck(id)
    } catch (erro) {
        console.log(erro)
    }
}

async function addCompra(e) {
    e.preventDefault();
    const headers = {
        'Content-Type': 'application/json',
    };
    try {
        const response = await fetch('http://localhost:8000/compraCarro', {
            method: 'POST',
            headers,
            body: JSON.stringify({
                nome: e.target.nome.value,
                email: e.target.email.value,
                telefone: e.target.telefone.value,
                marcaCarro: e.target.marcaCarro.value,
                modeloCarro: e.target.modeloCarro.value,
                mensagem: e.target.mensagem.value,
            })
        });
        const dados = await response.json();
        console.log(dados);

        window.alert("Intencao de compra registrada!");
        window.location.href = "/Codigo/client/index.html";

    } catch (erro) {
        console.log(erro);
    }
}