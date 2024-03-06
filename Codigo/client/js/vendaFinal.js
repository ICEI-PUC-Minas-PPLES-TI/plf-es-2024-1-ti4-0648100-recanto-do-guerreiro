window.onload = getVeiculo(), getVenda()

async function getVeiculo() {
    const token = sessionStorage.getItem('token');//PEGA O TOKEM DO LOCAL STORAGE E JOGA NO HEADERS PARA VERIFICACAO
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token,
      };
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        const dadosBrutos = await fetch(`http://localhost:8000/filterIdCarro/${id}` , {headers})
        const veiculo = await dadosBrutos.json()
        document.getElementById('marca').value = veiculo.marca
        document.getElementById('modelo').value = veiculo.modelo
        document.getElementById('ano').value = veiculo.ano
        document.getElementById('placa').value = veiculo.placa
    } catch (erro) {
        console.log(erro)
    }
}

async function getVenda(){
    const token = sessionStorage.getItem('token');//PEGA O TOKEM DO LOCAL STORAGE E JOGA NO HEADERS PARA VERIFICACAO
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token,
      };
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        const dadosBrutos = await fetch(`http://localhost:8000/filterVendaC/${id}` , {headers})
        const venda = await dadosBrutos.json()
        if(!venda.length > 0){
        document.getElementById('preco').value = venda.precoFinal
        document.getElementById('nomeComprador').value = venda.nomeComprador
        document.getElementById('telefoneComprador').value = venda.telefoneComprador
        document.getElementById('emailComprador').value = venda.emailComprador
        document.getElementById('dataVenda').value = venda.dataVenda

        document.getElementById("btn_submit").disabled = true;
        document.getElementById("btn_submit").style.backgroundColor = "gray";
        }
        else{
            console.log("nao tem venda")
        }
    } catch (erro) {
        console.log(erro)
    }
}
function validarTelefone(e){
    var formulario = e.target;
    var campos = formulario.elements;
    for(var i = 0; i < campos.length; i++){
        if((campos[i].type !== 'submit' && campos[i].value.trim() === '')){
        e.preventDefault();
        window.alert("Preencha todos os campos")
        break
        }
    }
    if(e.target.telefoneComprador.value>99999999999 || e.target.telefoneComprador.value<10000000000){
        e.preventDefault();
        window.alert("Telefone deve ter 11 numeros (dd + numero)")
    }
    else
        putVenda(e)
}
async function putVenda(e) {
    const token = sessionStorage.getItem('token');//PEGA O TOKEM DO LOCAL STORAGE E JOGA NO HEADERS PARA VERIFICACAO
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token,
      };
    e.preventDefault();
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const idCarro = urlParams.get('id');
        const response = await fetch('http://localhost:8000/venda', {
            method: 'POST',
            headers,
            body: JSON.stringify({
                carroId: idCarro,
                precoFinal: e.target.preco.value,
                nomeComprador: e.target.nomeComprador.value,
                telefoneComprador: e.target.telefoneComprador.value,
                emailComprador: e.target.emailComprador.value,
                dataVenda: e.target.dataVenda.value,
            })
        });
        const dados = await response.json();
        await attStatus(idCarro)
    } catch (erro) {
        console.log(erro);
    }
}

async function attStatus(idCarro){
    const token = sessionStorage.getItem('token');//PEGA O TOKEM DO LOCAL STORAGE E JOGA NO HEADERS PARA VERIFICACAO
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token,
      };
    const status = await fetch(`http://localhost:8000/carroPut/${idCarro}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify({
                status: "vendido"
            })
        });
        const dadosS = await status.json();
        window.alert("Venda Registrada!")
        window.location.href = "/Codigo/client/CrudVeiculo.html";
}
