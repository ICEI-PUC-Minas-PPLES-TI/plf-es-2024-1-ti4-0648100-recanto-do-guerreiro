window.onload = getVeiculos(), getOficinas(), displayManutencoes()

async function displayManutencoes() {
    const token = sessionStorage.getItem('token');//PEGA O TOKEM DO LOCAL STORAGE E JOGA NO HEADERS PARA VERIFICACAO
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token,
      };
    const table = document.getElementById("maintenanceList");
    table.innerHTML = "";
    try {
        let dadosManutencao = (await fetch('http://localhost:8000/manutencao', {headers}))
        let manutencoes = await dadosManutencao.json()
        console.log(manutencoes)

        for (const manutencao of manutencoes) {
            const veiculoResponse = await fetch(`http://localhost:8000/filterIdCarro/${manutencao.carroId}`, {headers});
            const veiculo = await veiculoResponse.json();

            const oficinaResponse = await fetch(`http://localhost:8000/oficineFilterId/${manutencao.oficinaId}`, {headers});
            const oficina = await oficinaResponse.json();

            const newRow = table.insertRow();
            newRow.innerHTML = `
                <td> ${veiculo.modelo} ${veiculo.placa}</td>
                <td>${manutencao.problema}</td>
                <td>${oficina.nome}</td>
                <td>${manutencao.orcamento}</td>
                <td>${manutencao.dataInicio}</td>
                <td>${manutencao.dataSaida}</td>
                <td>
                    <a class="btn" href="/Codigo/client/attManutencoes.html?id=${manutencao.id}">Editar →</a>
                    <button onclick="deleteManutencao(${manutencao.id})">Excluir</button>
                </td>
            `;
        }
    } catch (erro) {
        console.log(erro)
    }
}



async function addManutencao(e) {
    const token = sessionStorage.getItem('token');//PEGA O TOKEM DO LOCAL STORAGE E JOGA NO HEADERS PARA VERIFICACAO
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token,
      };
    e.preventDefault();
    try {
        const response = await fetch('http://localhost:8000/manutencao', {
            method: 'POST',
            headers,
            body: JSON.stringify({
                carroId: e.target.vehicle.value,
                problema: e.target.problem.value,
                oficinaId: e.target.workshop.value,
                orcamento: e.target.budget.value,
                dataInicio: e.target.startDate.value,
                dataSaida: e.target.endDate.value,
            })
        });
        const dados = await response.json();
        console.log(dados);
    } catch (erro) {
        console.log(erro);
    }
    displayManutencoes();
}

async function deleteManutencao(index) {
    const token = sessionStorage.getItem('token');//PEGA O TOKEM DO LOCAL STORAGE E JOGA NO HEADERS PARA VERIFICACAO
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token,
      };
    const response = await fetch(`http://localhost:8000/manutencao/${index}`, {
        method: 'DELETE',
        headers
    });
    displayManutencoes()
}



async function getVeiculos() {
    const token = sessionStorage.getItem('token');//PEGA O TOKEM DO LOCAL STORAGE E JOGA NO HEADERS PARA VERIFICACAO
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token,
      };
    try {
        let dadoBruto = await fetch('http://localhost:8000/carroShort', {headers})
        let dados = await dadoBruto.json()
        const veiculoSelect = document.getElementById('vehicle')
        veiculoSelect.innerHTML = '<option value="" disabled selected>Selecione um veículo</option>';
        dados.forEach((veiculo) => {
            const option = document.createElement('option');
            option.value = veiculo.id;
            option.textContent = `
                ${veiculo.marca} ${veiculo.modelo} - ${veiculo.placa}
            `;
            veiculoSelect.appendChild(option);
        });

    } catch (erro) {
        return console.log("Erro ao pegar veiculos" + erro)
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
        const oficinaSelect = document.getElementById('workshop')
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