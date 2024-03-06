<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.4.0/jspdf.umd.min.js"></script>
window.onload = async function() {
    const token = sessionStorage.getItem('token');//PEGA O TOKEM DO LOCAL STORAGE E JOGA NO HEADERS PARA VERIFICACAO
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token,
      };
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');

        const dadosVeiculo = await fetch(`http://localhost:8000/filterIdCarro?id=${id}`, {headers});
        const veiculo = await dadosVeiculo.json();

        document.getElementById('idveiculo').value = veiculo.id;
        document.getElementById('imagem').value = veiculo.imagem;
        document.getElementById('marca').value = veiculo.marca;
        document.getElementById('modelo').value = veiculo.modelo;
        document.getElementById('ano').value = veiculo.ano;
        document.getElementById('preco').value = veiculo.preco;
        document.getElementById('status').value = veiculo.status;


        const dadosManutencao = await fetch(`http://localhost:8000/filterId?id=${id}`, {headers});
        const manutencao = await dadosManutencao.json();


        document.getElementById('idmanutencao').value = manutencao.id;
        document.getElementById('veiculo').value = manutencao.carroId;
        document.getElementById('problema').value = manutencao.problema;
        document.getElementById('oficina').value = manutencao.oficinaId;
        document.getElementById('orcamento').value = manutencao.orcamento;
        document.getElementById('dataInicio').value = manutencao.dataInicio;
        document.getElementById('dataSaida').value = manutencao.dataSaida;
    } catch (erro) {
        console.log(erro);
    }
};

window.onload = displayWorkshops();
async function displayWorkshops() {
    const token = sessionStorage.getItem('token');//PEGA O TOKEM DO LOCAL STORAGE E JOGA NO HEADERS PARA VERIFICACAO
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token,
      };
    const table = document.getElementById("displayVeiculosRelatorio");
    table.innerHTML = "";

    let dadoBrutoManutencao = await fetch('http://localhost:8000/manutencao', {headers})
    let manutencoes = await dadoBrutoManutencao.json()
    let dadoBrutoVeiculo = await fetch('http://localhost:8000/carro')
    let veiculos = await dadoBrutoVeiculo.json()

    manutencoes.forEach((manutencao) => {
        veiculos.forEach((veiculos) => {
            const newRow = table.insertRow();
            newRow.innerHTML = `
            <td><img src="http://localhost:8000/${veiculos.imagem}" width="100" height="100" alt="Imagem Veiculo"></td>
                    <td>${veiculos.marca}</td>
            <td>${veiculos.marca}</td>
            <td>${veiculos.modelo}</td>
            <td>${veiculos.ano}</td>
            <td>${veiculos.preco}</td>
            <td>${veiculos.placa}</td>
            <td>${veiculos.chassi}</td>
            <td>${veiculos.cor}</td>
            <td>${veiculos.motor}</td>
            <td>${veiculos.status}</td>
            <td>${manutencao.problema}</td>
            <td>${manutencao.oficinaId}</td>
            <td>
            <button onclick="emitir(${veiculos.id}, ${manutencao.id})">Emitir</button>
            </td>
        `;
        });
    });
}
    async function emitir(veiculoId, manutencaoId) {
        const token = sessionStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': token,
        };
    
        try {
            const dadoBrutoVeiculo = await fetch(`http://localhost:8000/carro?id=${veiculoId}`, { headers });
            const veiculo = await dadoBrutoVeiculo.json();
    
            const dadoBrutoManutencao = await fetch(`http://localhost:8000/manutencao?id=${manutencaoId}`, { headers });
            const manutencao = await dadoBrutoManutencao.json();
    
            const doc = new jsPDF();
            doc.text(`Veículo: ${veiculo.marca} ${veiculo.modelo}`, 10, 10);
            doc.text(`Ano: ${veiculo.ano}`, 10, 20);
            doc.text(`Preço: ${veiculo.preco}`, 10, 30);
            doc.text(`Status: ${veiculo.status}`, 10, 40);
            doc.text(`Problema: ${manutencao.problema}`, 10, 50);
            doc.text(`Oficina ID: ${manutencao.oficinaId}`, 10, 60);
    
            
            doc.save('report.pdf');
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

