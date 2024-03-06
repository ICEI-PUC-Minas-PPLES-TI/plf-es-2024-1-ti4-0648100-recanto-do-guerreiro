
window.addEventListener('load', getOficinas());
window.addEventListener('load', getManutencao());

async function getManutencao() {
    const token = sessionStorage.getItem('token');//PEGA O TOKEM DO LOCAL STORAGE E JOGA NO HEADERS PARA VERIFICACAO
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token,
      };
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');

        const dadosBrutos = await fetch(`http://localhost:8000/filterId?id=${id}`, {headers})
        const manutencao = await dadosBrutos.json()
        const carroData = await fetch(`http://localhost:8000/filterIdCarro/${manutencao.carroId}`);
        const carro = await carroData.json()
        console.log(carro)
        document.getElementById('idmanutencao').value = manutencao.id
        document.getElementById('veiculo').innerHTML = `<img src="${carro.imagem}" width="100" height="100" alt="Imagem Veiculo"> <p>${carro.marca} ${carro.modelo} - ${carro.placa} <p>`
        document.getElementById('problema').value = manutencao.problema
        document.getElementById('oficina').value = manutencao.oficinaId
        document.getElementById('orcamento').value = manutencao.orcamento
        document.getElementById('dataInicio').value = manutencao.dataInicio
        document.getElementById('dataSaida').value = manutencao.dataSaida
    } catch (erro) {
        console.log(erro)
    }
}


async function putManutencao(e) {
    e.preventDefault()
    const token = sessionStorage.getItem('token');//PEGA O TOKEM DO LOCAL STORAGE E JOGA NO HEADERS PARA VERIFICACAO
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token,
      };
    const manutencaoid = document.getElementById("idmanutencao").value
    try {
        const body = {};

        if (e.target.problema.value) {
            body.problema = e.target.problema.value;
        }
        if (e.target.oficina.value) {
            body.oficina = e.target.oficina.value;
        }
        if (e.target.orcamento.value) {
            body.orcamento = e.target.orcamento.value;
        }
        if (e.target.dataInicio.value) {
            body.dataInicio = e.target.dataInicio.value;
        }
        if (e.target.dataSaida.value) {
            body.dataSaida = e.target.dataSaida.value;
        }

        const response = await fetch(`http://localhost:8000/manutencaoPut/${manutencaoid}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify(body)
        });
        const dados = await response.json();
        console.log(dados);

        alert = "Manutenção atualizada com sucesso";
        window.location.href = "/Codigo/client/CrudGerenciarManutencoes.html";

    } catch (erro) {
        console.log(erro);
    }
}

async function getOficinas() {
    const token = sessionStorage.getItem('token');//PEGA O TOKEM DO LOCAL STORAGE E JOGA NO HEADERS PARA VERIFICACAO
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token,
      };
    try {
        let dadoBruto = await fetch('http://localhost:8000/oficina', {headers})
        let dados = await dadoBruto.json()
        const oficinaSelect = document.getElementById('oficina')
        oficinaSelect.innerHTML = '<option value="" disabled selected>Selecione uma oficina</option>';
        dados.forEach((oficina) => {
            const option = document.createElement('option');
            option.value = oficina.id;
            option.textContent = `
                ${oficina.nome} - ${oficina.especialidade}
            `;
            oficinaSelect.appendChild(option);
        });

    } catch (erro) {
        return console.log("Erro ao pegar oficinas" + erro)
    }
}