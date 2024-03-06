window.onload = displayveiculos(), displayoficinas();

async function displayveiculos() {
    let display = ""
    try {
        let dados = await fetch('http://localhost:8000/carro')
        let veiculos = await dados.json()
        veiculos.forEach((veiculo) => {
            if (veiculo.status == "disponivel") {
                display += `
                <div class="card-item">
                    <img src="http://localhost:8000/${veiculo.imagem}" alt="imagemcarro" />
                    <div class="card-content">
                    <h3>${veiculo.marca} ${veiculo.modelo}</h3>
                    <p>Ano: ${veiculo.ano}</p>
                    <a href="/Codigo/client/formCompra.html?id=${veiculo.id}"><button type="button">R$${veiculo.preco}</button></a>
                    </div>
                </div>
                `;
            }
        });
        document.getElementById("cards").innerHTML = display
    } catch (erro) {
        console.log(erro)
    }
}

async function displayoficinas() {
    let display = ""
    try {
        let dados = await fetch('http://localhost:8000/oficina')
        let oficinas = await dados.json()
        oficinas.forEach((oficina) => {
            display += `

            <div class="feature-card-item">
                    <img src="./image/feature-planet.png" alt="Feature" />
                    <div class="feature-text-content">
                        <h3>${oficina.nome}</h3>
                        <p>Endereço: Rua: ${oficina.logradouro}, Numero: ${oficina.numero} Complemento: ${oficina.complemento}</p> 
                        <p>Endereço: CEP: ${oficina.cep}</p> 
                        <p>Descricao: ${oficina.descricao}</p>
                    </div>
                </div>

                `;
        });
        document.getElementById("oficinas").innerHTML = display
    } catch (erro) {
        console.log(erro)
    }
}