const prontuarionovo = document.getElementById('novasessao')
prontuarionovo?.addEventListener('submit', (novo) => {
    novo.preventDefault()
    let data = document.getElementById('input-data').value
    let horainicio = document.getElementById('input-hora-inicio').value
    let horafim = document.getElementById('input-hora-fim').value
    let titulo = document.getElementById('input-titulo').value
    let resumo = document.getElementById('input-resumo').value
    let valor = document.getElementById('valor').value
    let formadepagamento = document.getElementById('input-forma-pagamento').value
    let pago = document.getElementById('input-pago').value
    let naopago = document.getElementById('input-nao-pago').value
    modal(data, horainicio, horafim, titulo, resumo, valor, formadepagamento, pago, naopago)
    console.log(data)
    console.log(horainicio)
})
async function modal(data, horainicio, horafim, titulo, resumo, valor, formadepagamento, pago, naopago) {
    const urlParams =  new URLSearchParams(window.location.search)
    const pacienteId = urlParams.get('usuario')
    
    const sessao = {
        "data": data,
        "horaInicio": horainicio,
        "horaFim": horafim,
        "titulo": titulo,
        "resumo": resumo,
        "valor": valor,
        "forma": formadepagamento,
        "pago": pago,
        "naoPago": naopago,
        "paciente": pacienteId
    };
    await lista_sessao(sessao)
}

async function lista_sessao(id) {
    
    await fetch('http://localhost:3000/sessao', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(id)
    })
}

async function sessoes1() {
    const urlstring = window.location.search
    const params = new URLSearchParams(urlstring)
    const usuario = params.get('usuario')
    
    const api = await fetch('http://localhost:3000/sessao')
    const sessoes = await api.json()
    console.log(sessoes)
    const sessoesfiltradas = sessoes.filter(sessao => sessao.paciente === usuario)
   
    let sessaohtml = document.getElementById('sessao123')
   
      for (const sessao of sessoesfiltradas) {
        sessaohtml.innerHTML += `<div class="sessao1 position-relative bg-white mt-5 rounded-3">
                        <img class="elipse" src="./imagens/Ellipse 239.png" alt="">
                        <img class="m-white" src="./imagens/mental-health-line.png" alt="">
                        <div class="d-flex justify-content-between">
                            <h6 class="title-sf">Sessão ${sessao.id}</h6><span class="ellipsis">. . .</span>
                        </div>
                        <data value="2022-05-12">${sessao.data}</data>
                        <p>${sessao.titulo}</p>

                    </div>`
    }
}






async function listarSessoesEFatos() {
    const urlParams = new URLSearchParams(window.location.search)
    const usuario = urlParams.get('usuario')
    const responseSessoes = await fetch('http://localhost:3000/sessao')
    const sessoes = await responseSessoes.json()
    const sessoesFiltradas = sessoes.filter(sessao => sessao.paciente === usuario)
  
    const responseFatos = await fetch('http://localhost:3000/fatos_relevantes')
    const fatos = await responseFatos.json();
    const fatosFiltrados = fatos.filter(fato => fato.paciente === usuario)
  
    const dados = [...sessoesFiltradas, ...fatosFiltrados]
    dados.sort((a, b) => new Date(a.data) - new Date(b.data))
  
      const container = document.getElementById('sessao123')
      contagem = 1
    for (const dado of dados) {
     if (dado.titulo) { // É uma sessão
    const sessaoHTML = `<div class="sessao1 position-relative bg-white mt-5 rounded-3">
                          <img class="elipse" src="./imagens/Ellipse 239.png" alt="">
                          <img class="m-white" src="./imagens/mental-health-line.png" alt="">
                          <div class="d-flex justify-content-between">
                            <h6 class="title-sf">Sessão ${contagem}</h6>
                            <span class="ellipsis">. . .</span>
                          </div>
                          <p>${dado.data}</p>
                          <p>${dado.titulo}</p>
                        </div>`;
    contagem++;
    container.insertAdjacentHTML('afterbegin', sessaoHTML);
  } else { // É um fato relevante
    const fatoHTML = `<div class="in-between"></div>
                      <div class="relevante1 position-relative bg-white rounded-3 mt-4">
                        <img class="elipse-b" src="./imagens/Ellipse 239 (1).png" alt="">
                        <img class="m-white-b" src="./imagens/Groupnovo.png" alt="">
                        <div class="d-flex justify-content-between">
                          <h6 class="title-sf">Fatos Relevantes</h6>
                          <span class="ellipsis">. . .</span>
                        </div>
                        <p class="field-span">${dado.data}</p>
                        <p class="field-span">${dado.textorelevante}</p>
                      </div>`;
    container.insertAdjacentHTML('afterbegin', fatoHTML);
  }
      }
    }
  
  
  
  
        
  
  window.addEventListener('DOMContentLoaded', () => {
     listarSessoesEFatos()
  })
  



   // buttonFilter.addEventListener('click', () => {
    //     const filterValue = inputFilter.value.toUpperCase()
    //     const patientDivs = objPatients.querySelector('#patint-1')
    //     patientDivs.forEach(div => {
    //         const patientName = div.textContent.toUpperCase()
    //         if(patientName.includes(filterValue)){
    //             div.style.display = ''
    //         }else{
    //             div.style.display = 'none'
    //         }
    //     })
    // })





    async function displayPatient(){
    const response  = await fetch("http://localhost:3000/patients/")
    const patients = await response.json()
    allPatients = patients
    
    const objPatients = document.querySelector('#row')
    const inputFilter = document.querySelector('#input-filter' )
    const buttonFilter = document.querySelector('.filter')

    buttonFilter.addEventListener('click', () => {
        const filterValue = inputFilter.value.trim().toLowerCase()
        const filteredPatients = patients.filter(patient => {
            return patient.name.toLowerCase().includes(filterValue) ||
            patient.cpf.includes(filterValue)
        })
        displayFilteredPatient(filteredPatients)
    })

    function displayFilteredPatient(filteredPatients){
    let html = ''
    filteredPatients.forEach(patient =>{
        
    html += `<div class="col-2 first text-center py-2 px-0">${patient.id}</div>
     <div class="col-4 first py-2 px-1 patient-1" id="patient-1" onclick="showPatientModal(${patient.id})">${patient.name}</div>
    <div class="col-4 first py-2 px-1">${patient.cpf}</div>
    <div class="col-2 first d-flex justify-content-evenly py-2 px-0 flex-wrap">
    <a href="section.html?user=${patient.id}"><img src="./imagens/section.png" alt=""></a>
    <a href="#" onclick="putPatient(${patient.id})"><img src="./imagens/edit.png" alt=""></a>
    <a href="#" onclick="deletePatient(${patient.id})">
    <img src="./imagens/bin.png" alt=""></a>
    </div>`
    
    })
    
    objPatients.innerHTML = html  
    }
    displayPatient()
}
document.addEventListener("DOMContentLoaded", () => {
    displayPatient()
    console.log('entrei')
})