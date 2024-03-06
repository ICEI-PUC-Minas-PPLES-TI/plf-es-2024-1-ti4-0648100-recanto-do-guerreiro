window.onload = async function getVeiculo() {
    const token = sessionStorage.getItem('token'); //PEGA O TOKEM DO LOCAL STORAGE E JOGA NO HEADERS PARA VERIFICACAO
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token,
    };
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        const dadosBrutos = await fetch(`http://localhost:8000/filterIdCarro/${id}`, { headers })
        const veiculo = await dadosBrutos.json()
            //document.getElementById('imagem').value = veiculo.imagem
        document.getElementById('marca').value = veiculo.marca
        document.getElementById('modelo').value = veiculo.modelo
        document.getElementById('ano').value = veiculo.ano
        document.getElementById('preco').value = veiculo.preco
        document.getElementById('placa').value = veiculo.placa
        document.getElementById('chassi').value = veiculo.chassi
        document.getElementById('cor').value = veiculo.cor
        document.getElementById('motor').value = veiculo.motor
        document.getElementById('status').value = veiculo.status
    } catch (erro) {
        console.log(erro)
    }
}


async function liberarVeiculo(e) {
    const token = sessionStorage.getItem('token'); //PEGA O TOKEM DO LOCAL STORAGE E JOGA NO HEADERS PARA VERIFICACAO
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token,
    };
    e.preventDefault()
    const urlParams = new URLSearchParams(window.location.search);
    const carroId = urlParams.get('id');
    try {
        const body = {};

        body.status = 'disponivel'; // Adicionado status

        const response = await fetch(`http://localhost:8000/negociacao`, {
            method: 'POST',
            headers,
            body: JSON.stringify(body)
        });
        const dados = await response.json();
        console.log(dados);

        window.alert("Veiculo liberado para venda, vá para pagina de VendaDeVeiculo.html para fazer alterações");
        //DIRECIONAR PARA A PAGINA DE VENDA DOS VEICULOS
        window.location.href = "/Codigo/client/CrudVeiculo.html";
    } catch (erro) {
        console.log(erro);
    }
}