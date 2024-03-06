window.onload = async function getVeiculo() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        const dadosBrutos = await fetch(`http://localhost:8000/filterIdCarro/${id}`)
        const veiculo = await dadosBrutos.json()
        document.getElementById('idveiculo').value = veiculo.id
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
        getCheck(id)
    } catch (erro) {
        console.log(erro)
    }
}

async function putVeiculo(e) {
    const token = sessionStorage.getItem('token');//PEGA O TOKEM DO LOCAL STORAGE E JOGA NO HEADERS PARA VERIFICACAO
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token,
      };
    e.preventDefault()
    const veiculoid = document.getElementById("idveiculo").value
    try {
        const body = {};

        body.marca = e.target.marca.value;
        body.modelo = e.target.modelo.value;
        body.ano = e.target.ano.value;
        body.preco = e.target.preco.value;
        body.placa = e.target.placa.value;
        body.chassi = e.target.chassi.value;
        body.cor = e.target.cor.value;
        body.motor = e.target.motor.value;
        body.status = e.target.status.value;

        const response = await fetch(`http://localhost:8000/carroPut/${veiculoid}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify(body)
        });
        const dados = await response.json();

        const dadosBrutosC = await fetch(`http://localhost:8000/checklist/${veiculoid}`, {headers})
        const dadosCheck = await dadosBrutosC.json()
        if(dadosCheck == null){
            postCheck(e, veiculoid)
        }
        else{
            putCheck(e, veiculoid)
        }
        window.alert("Veiculo atualizado com sucesso")
        window.location.href = "/Codigo/client/CrudVeiculo.html";
        
    } catch (erro) {
        console.log(erro);
    }
}

async function getCheck(id) {
    const token = sessionStorage.getItem('token');//PEGA O TOKEM DO LOCAL STORAGE E JOGA NO HEADERS PARA VERIFICACAO
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token,
      };
    try {
        const dadosBrutos = await fetch(`http://localhost:8000/checklist/${id}`, {headers})
        const dados = await dadosBrutos.json()
        document.getElementById('suspensao').checked = dados.suspensao
        document.getElementById('lataria').checked = dados.lataria
        document.getElementById('motorCheck').checked = dados.motor
        document.getElementById('interior').checked = dados.interior
        document.getElementById('cambio').checked = dados.cambio
        document.getElementById('pneus').checked = dados.pneus
        document.getElementById('documentacao').checked = dados.documentacao
        document.getElementById('eletrica').checked = dados.eletrica
        
    } catch (error) {
        console.log(`Erro ao fazer get do check ${error}`)
        
    }
}

async function putCheck(e, id) {
    const token = sessionStorage.getItem('token');//PEGA O TOKEM DO LOCAL STORAGE E JOGA NO HEADERS PARA VERIFICACAO
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token,
      };
    try {
        const response = await fetch(`http://localhost:8000/checklist/${id}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify({
                carroId: id,
                suspensao: e.target.suspensao.checked,
                lataria: e.target.lataria.checked,
                pneus: e.target.pneus.checked,
                motor: e.target.motorCheck.checked,
                cambio: e.target.cambio.checked,
                interior: e.target.suspensao.checked,
                documentacao: e.target.documentacao.checked,
                eletrica: e.target.eletrica.checked,
            })
        });
        const dados = await response.json();
    } catch (error) {
        console.log(`Erro ao fazer put do check ${error}`)
    }
}

async function postCheck(e, id) {
    const token = sessionStorage.getItem('token');//PEGA O TOKEM DO LOCAL STORAGE E JOGA NO HEADERS PARA VERIFICACAO
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token,
      };
      try {
        const responseCheck = await fetch('http://localhost:8000/checklist', {
        method: 'POST',
        headers,
        body: JSON.stringify({
            carroId: id,
            suspensao: e.target.suspensao.checked,
            lataria: e.target.lataria.checked,
            pneus: e.target.pneus.checked,
            motor: e.target.motorCheck.checked,
            cambio: e.target.cambio.checked,
            interior: e.target.suspensao.checked,
            documentacao: e.target.documentacao.checked,
            eletrica: e.target.eletrica.checked,
        })
     });
        const dadosCheck = await responseCheck.json()
        console.log(dadosCheck)
      } catch (error) {
        console.log(error)
      }
    
}
