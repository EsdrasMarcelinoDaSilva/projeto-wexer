let form1 = document.getElementById('paciente1')
form1?.addEventListener('submit', (evento) => {
    evento.preventDefault()

    let cpf = document.getElementById('cpf').value
    let nome = document.getElementById('Nome').value
    let dnascimento = document.getElementById('data_nascimento').value
    let email = document.getElementById('email').value
    let sexo = document.getElementById('sexo').value
    let nacionalidade = document.getElementById('nacionalidade').value
    let naturalidade = document.getElementById('naturalidade').value
    let profissao = document.getElementById('profissao').value
    let escolaridade = document.getElementById('escolaridade').value
    let estado_civil = document.getElementById('estado_civil').value
    let mae = document.getElementById('mae').value
    let pai = document.getElementById('pai').value
    

    lista(cpf,nome,dnascimento,email,sexo,nacionalidade,naturalidade,profissao,escolaridade,estado_civil,mae,pai)
})
async function lista(cpf,nome,dnascimento,email,sexo,nacionalidade,naturalidade,profissao,escolaridade,estado_civil,mae,pai){  
    const post = {
        "cpf": cpf,
        "nome": nome,
        "dnascimento": dnascimento,
        "email": email,
        "sexo": sexo,
        "nacionalidade": nacionalidade,
        "naturalidade": naturalidade,
        "profissao": profissao,
        "escolaridade": escolaridade,
        "estado_civil": estado_civil,
        "mae": mae,
        "pai": pai,
    }

    await lista_paciente(post)
}
async function lista_paciente(dados){
        await fetch("http://localhost:3000/paciente", {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain, /',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });
    }
 async function getposts(){
  const apiResponse = await fetch('http://localhost:3000/paciente')
  const posts = await apiResponse.json()
      console.log(posts)
      posts.map(post => exibirposts(post))
      console.log(posts)
}
window.addEventListener('DOMContentLoaded', () => {
    getposts();
})

async function exibirposts(post) {
    console.log(post)
    const exibirpaciente = document.querySelector("#pacientes23")
    exibirpaciente.innerHTML += `<div name="titulos" class="container d-flex border">
                <div class="col-2 p-1 ps-2 d-flex justify-content-center"><p class="text-secondary mb-0">${post.id}</p></div>
                <div class="col-4 p-1 ps-2 border-start"><p class="text-secondary mb-0">${post.nome}</p></div>
                <div class="col-4 p-1 ps-2 border-start"><p class="text-secondary mb-0">${post.cpf}</p></div>
                <div class="col-2 p-1 ps-2 border-start d-flex justify-content-center"><p class="text-secondary mb-0">
                   <button class="button1" id="adicionar" onclick="window.location.href='meuspacientes.html'">
                    <img src="./imagens/novo (1).png" alt="">
                   </button>
                    <button class="button1" id=""><img src="./imagens/novo (6).png" alt=""></button>
                    <button class="button1" onclick="removerpost(${post.id})"><img src="./imagens/novo (2).png" alt=""></button>
                </p></div>`
    
}

async function removerpost(id) {
   await fetch(`http://localhost:3000/paciente/${id}`, {
       method: "DELETE"
        
  })
}
