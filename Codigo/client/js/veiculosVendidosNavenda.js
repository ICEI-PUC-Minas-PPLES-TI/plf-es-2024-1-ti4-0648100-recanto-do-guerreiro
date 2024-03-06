window.onload = displayveiculos(), displayveiculosVendidos();;
async function displayveiculos() {
    const table = document.getElementById("listarVeiculos");
    table.innerHTML = "";

    try {
        let dados = (await fetch('http://localhost:8000/carro'))
        let veiculos = await dados.json()
        let veiculosDisponivel = veiculos.filter(veiculo => veiculo.status === 'disponivel');
        veiculosDisponivel.forEach((veiculos) => {
            const newRow = table.insertRow();
            newRow.innerHTML = `
                    <td>${veiculos.marca}</td>
                    <td>${veiculos.modelo}</td>
                    <td>${veiculos.ano}</td>
                    <td>${veiculos.preco}</td>
                    <td>${veiculos.status}</td>
            
                `;
        });

    } catch (erro) {
        console.log(erro)
    }
}


async function displayveiculosVendidos() {
    const table = document.getElementById("listarVeiculosVendidos");
    table.innerHTML = "";

    try {
        let dados = (await fetch('http://localhost:8000/carro'))
        let veiculos = await dados.json()
        let veiculosVendidos = veiculos.filter(veiculo => veiculo.status === 'vendido');
        veiculosVendidos.forEach((veiculos) => {
            const newRow = table.insertRow();
            newRow.innerHTML = `
            
                    <td>${veiculos.marca}</td>
                    <td>${veiculos.modelo}</td>
                    <td>${veiculos.ano}</td>
                    <td>${veiculos.preco}</td>
                    <td>${veiculos.status}</td>
                  
                    
                `;
        });

    } catch (erro) {
        console.log(erro)
    }
}