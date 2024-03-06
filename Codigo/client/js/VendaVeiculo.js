const carSelect = document.getElementById("carro");
const idNegociacao = document.getElementById("idNegociacao");
const negociacaoPreco = document.getElementById("preco");
const negociacaoTroca = document.getElementById("troca");
const negociacaoPromo = document.getElementById("promocaoPercent");

let negociacoes;

window.onload = getNegociacoes()


async function getNegociacoes(){
    const token = sessionStorage.getItem('token');//PEGA O TOKEM DO LOCAL STORAGE E JOGA NO HEADERS PARA VERIFICACAO
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token,
      };
    try {
        let dadoBruto = await fetch('http://localhost:8000/negociacao', {headers})
        negociacoes = await dadoBruto.json()
        negociacoes.forEach(async (negocio) => {
            
            var carro = await getVeiculo(negocio.carroId)
            const option = document.createElement("option");
            option.value = negocio.carroId; // A chave estrangeira para o carro
            option.textContent = `
                ${carro.placa} - ${carro.marca} - ${carro.modelo}
            `
            
            carSelect.appendChild(option);
            carSelect.dispatchEvent(new Event("change", { bubbles: true }));
        })
        

    } catch (erro) {
        return console.log("Erro ao pegar negociações" + erro)
    }
}

async function getVeiculo(id){
    const token = sessionStorage.getItem('token');//PEGA O TOKEM DO LOCAL STORAGE E JOGA NO HEADERS PARA VERIFICACAO
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token,
      };
    try {
        const dadosBrutos = await fetch(`http://localhost:8000/filterIdCarro/${id}`, {headers})
        const veiculo = await dadosBrutos.json()
        carSelect.value = veiculo.id
        return veiculo
    } catch (erro) {
        console.log(erro)
    }
    
}
//submite do form ainda vai decidir se deleta ou atualiza
async function deletAtt(e){

    // Determina qual botão foi pressionado com base no valor do botão
    const botaoPressionado = e.submitter;
    if (botaoPressionado.id == "atualizarNegocio") {
        await attNegociacao(e);
      } else if (botaoPressionado.id == "deletarNegocio") {
        await deletNegociacao(e);
      }
      return false; // Impede o envio do formulário
}
// func para atualizar
async function attNegociacao(e){
    const token = sessionStorage.getItem('token');//PEGA O TOKEM DO LOCAL STORAGE E JOGA NO HEADERS PARA VERIFICACAO
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token,
      };
    try {
        const body = {};

        body.precoNegociacao = e.target.preco.value;
        body.troca = e.target.troca.checked;
        body.promoPorCem = e.target.promocaoPercent.value;

        const response = await fetch(`http://localhost:8000/negociacaoPut/${idNegociacao.value}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify(body)
        });
        const dados = await response.json();
        console.log(dados);

    } catch (erro) {
        console.log(erro);
    }
}
// func para deletar
async function deletNegociacao(e){
    const token = sessionStorage.getItem('token');//PEGA O TOKEM DO LOCAL STORAGE E JOGA NO HEADERS PARA VERIFICACAO
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token,
      };
    const response = await fetch(`http://localhost:8000/negociacao/${idNegociacao.value}`, {
        method: 'DELETE',
        headers
    })
    console.log(response);
}

// Adicione um ouvinte de evento para o <select>
carSelect.addEventListener("change", () => {
  const selectedCarId = carSelect.value;
  
  const selectedNegotiation = negociacoes.find(negotiation => negotiation.carroId == selectedCarId);
  console.log(selectedNegotiation)
  // Atualize os campos de detalhes da negociação
  if (selectedNegotiation) {
    idNegociacao.value = `${selectedNegotiation.id}`
    negociacaoPreco.value = `${selectedNegotiation.precoNegociacao}`
    negociacaoTroca.checked = selectedNegotiation.troca
    negociacaoPromo.value = `${selectedNegotiation.promoPorCem}`
  } else {
    idNegociacao.value = ""
    negociacaoPreco.value = ""
    negociacaoTroca.checked = false
    negociacaoPromo.value = ""
  }
});