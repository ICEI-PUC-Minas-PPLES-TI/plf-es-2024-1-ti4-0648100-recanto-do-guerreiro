window.onload = async function getOficina() {
    const token = sessionStorage.getItem('token');//PEGA O TOKEM DO LOCAL STORAGE E JOGA NO HEADERS PARA VERIFICACAO
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token,
      };
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        const dadosBrutos = await fetch(`http://localhost:8000/oficineFilterId/${id}`, {headers})
        const oficina = await dadosBrutos.json()
        document.getElementById('idoficina').value = oficina.id
        document.getElementById('nome').value = oficina.nome
        document.getElementById('logradouro').value = oficina.logradouro
        document.getElementById('numero').value = oficina.numero
        document.getElementById('complemento').value = oficina.complemento
        document.getElementById('cep').value = oficina.cep
        document.getElementById('descricao').value = oficina.descricao
        document.getElementById('especialidade').value = oficina.especialidade
        document.getElementById('telefone').value = oficina.telefone
    } catch (erro) {
        console.log(erro)
    }
}


async function putOficina(e) {
    const token = sessionStorage.getItem('token');//PEGA O TOKEM DO LOCAL STORAGE E JOGA NO HEADERS PARA VERIFICACAO
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token,
      };
    e.preventDefault()
    const oficinaid = document.getElementById("idoficina").value
    try {
        const body = {};

        if (e.target.nome.value) {
            body.nome = e.target.nome.value;
        }
        if (e.target.logradouro.value) {
            body.logradouro = e.target.logradouro.value;
        }
        if (e.target.numero.value) {
            body.numero = e.target.numero.value;
        }
        if (e.target.complemento.value) {
            body.complemento = e.target.complemento.value;
        }
        if (e.target.cep.value) {
            body.cep = e.target.cep.value;
        }
        if (e.target.descricao.value) {
            body.descricao = e.target.descricao.value;
        }
        if (e.target.especialidade.value) {
            body.especialidade = e.target.especialidade.value;
        }
        if (e.target.telefone.value) {
            body.telefone = e.target.telefone.value;
        }

        const response = await fetch(`http://localhost:8000/oficinaPut/${oficinaid}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify(body)
        });
        const dados = await response.json();
        console.log(dados);

        alert = "Oficina atualizada com sucesso";
        window.location.href = "/Codigo/client/CrudCadastroOficinas.html";

    } catch (erro) {
        console.log(erro);
    }
}