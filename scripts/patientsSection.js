let currentPatient 
// <-------------função de exibição dos dados do admin no card do paciente--------------->

async function displayPatient(){
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const user = urlParams.get('user')
   
    
    const response  = await fetch("https://db-wexer.onrender.com/patients/" + user)
    const patients = await response.json()
    
    const patientName = document.querySelector('#paragraph')
    const patientBirth = document.querySelector('#paragraph-1')
    const patientProfession = document.querySelector('#paragraph-2')
    const patientSchooling = document.querySelector('#paragraph-3')

    patientName.textContent = patients.name
    patientBirth.textContent = patients.dateOfBirth
    patientProfession.textContent = patients.profession
    patientSchooling.textContent = patients.schooling
    currentPatient  = patients
}
document.addEventListener("DOMContentLoaded", async () => {

    await displayPatient()
    showSection(currentPatient.id)
    showFact(currentPatient.id)
})

// <---------------------captura de dados no formulario do modal nova sessão e inclusão desses dados no db------------------------>

const formNewSection = document.querySelector('#main-np')
const btnClose  = document.querySelector('#btn-close')
btnClose.addEventListener('click', (e) => {
    e.preventDefault()

    const title = document.querySelector('#inputEmail4')
    const date = document.querySelector('#input3')
    const start = document.querySelector('#input4')
    const end = document.querySelector('#input5')
    const paid = document.querySelector('#input6')
    const pay = document.querySelector('#payment')
    const summary = document.querySelector('#textarea')

    const fieldSection = {
        "type": "section",
        "title": title.value,
        "date": date.value,
        "startTime": start.value,
        "endTime": end.value,
        "paid": paid.value,
        "pay": pay.value,
        "patientId": currentPatient.id,
        "summary": summary.value
    }

const createPost = async (fieldSection) => {

    await fetch("https://db-wexer.onrender.com/medicalRecord", {
        method: "POST",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
            body: JSON.stringify(fieldSection)
        }); 
        showSection(currentPatient.id)
    }
    createPost(fieldSection)
    formNewSection.style.display = 'none'
    return false
  
})
// <------------------------------------------------------------------------------------------------------------------------------->


// <---------------------------------gerador de sessões--------------------------------------->

async function showSection(patientId){
    const response  = await fetch("https://db-wexer.onrender.com/medicalRecord?patientId=" + patientId)
    const section = await response.json()
    const objSection = document.querySelector('#sectionField')
    
    objSection.innerHTML =  ''
    let htmlStructure = ''

    section.forEach((section, index) =>{

   if(section.type === 'section'){
    if(index === 0){
     htmlStructure += `
    <div class="fieldSection position-relative" id="fieldSection">
    <img  class="elipse-g" src="./imagens/elipse-green.png" alt="" id="elipse-g">
    <a href="sectionfinal.html?user=${section.id}"><img class="m-white" src="./imagens/mental-health-line-white.png" alt=""></a>
    <div class="d-flex justify-content-between">
    <h6 class="title-sf">${section.title}</h6>
    <button type="button" id="down-rt" class="dropdown-button" data-bs-toggle="dropdown">
    ...
    </button>
    <ul class="dropdown-menu dropdown-menu-center">
    <li>
    <img class="pencil" src="./imagens/pencil-line.png" alt="">
    <a class="dropdown-items" href="#">To edit</a>
    </li>
    <li><img class="delete-line" src="./imagens/delete-bin-5-line.png">
    <a class="dropdown-items" onclick="delSection(${section.id})">Delete</a>
    </li>
    </ul>
    </div>
    <span class="field-span">${section.date}</span>
    <p class="field-p">${section.summary}</p>
    </div>
    `
    }else{
        htmlStructure += `<div class="between"></div>
        <div class="fieldSection position-relative" id="fieldSection">
        <img  class="elipse-g" src="./imagens/elipse-green.png" alt="">
        <a href="sectionfinal.html?user=${section.id}"><img class="m-white" src="./imagens/mental-health-line-white.png" alt=""></a>
        <div class="d-flex justify-content-between">
        <h6 class="title-sf">${section.title}</h6>
        <button type="button" id="down-rt" class="dropdown-button" data-bs-toggle="dropdown">
        ...
        </button>
        <ul class="dropdown-menu dropdown-menu-center">
        <li>
        <img class="pencil" src="./imagens/pencil-line.png" alt="">
        <a class="dropdown-items" href="#">To edit</a>
        </li>
        <li><img class="delete-line" src="./imagens/delete-bin-5-line.png">
        <a class="dropdown-items" onclick="delSection(${section.id})">Delete</a>
        </li>
        </ul>
        </div>
        <span class="field-span">${section.date}</span>
        <p class="field-p">${section.summary}</p>
        </div>`
    } 
    }
})
    objSection.insertAdjacentHTML('afterbegin', htmlStructure)   
}
// <--------------------------------------------------------------------------------------------------->


// <----------deletar sessão----------------------------------->

async function delSection(id){
    console.log('entrei delSection', id)
    await fetch(`https://db-wexer.onrender.com/medicalRecord/${id}`,{
      method: "DELETE"
    })
    showSection(currentPatient.id)
}

//<------------------------------------------------------------>


// <---------------------captura de dados no formulario do modal novo fato relevante e inclusão desses dados no db------------------------>

const formNewFact = document.querySelector('#main-fact')
const btnCloseFact = document.querySelector('#btn-close-fact')
btnCloseFact.addEventListener('click', (e) => {
    e.preventDefault()

    const date = document.querySelector('#input-9')
    const title = document.querySelector('#input-10')
    const description = document.querySelector('#textarea-fact')

    const fieldFact = {
        "type": "fact",
        "title": title.value,
        "date": date.value,
        "patientId" : currentPatient.id,
        "description": description.value,
    }

const createFact = async (fieldFact) => {
    await fetch("https://db-wexer.onrender.com/medicalRecord",{
        method: "POST",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
            body: JSON.stringify(fieldFact)
        }); 
        showFact(currentPatient.id)
    }
    createFact(fieldFact)
    formNewFact.style.display = 'none'
    return false
})
// <-------------------------------------------------------------------------------------------------------------------------------------->

// <---------------------------------gerador de fatos relevantes------------------------------->

async function showFact(patientId){
    const response  = await fetch("https://db-wexer.onrender.com/medicalRecord?patientId=" + patientId)
    const facts = await response.json()
    const objFact = document.querySelector('#factField')

    objFact.innerHTML = ''
    let htmlStructure = ''

    facts.forEach((fact, index) =>{

    if(fact.type === 'fact'){
      if(index === 0){
    htmlStructure += `
    <div class="fieldFact position-relative" id="fieldFact">
    <img class="elipse-b" src="./imagens/elipse-blue.png" alt="">
    <img class="m-white-b" src="./imagens/pushpin-line-white.png" alt="">
    <div class="d-flex justify-content-between">
    <h6 class="title-sf">${fact.title}</h6>
    <button type="button" id="down-rt" class="dropdown-button" data-bs-toggle="dropdown">
    ...
    </button>
    <ul class="dropdown-menu dropdown-menu-center">
    <li><img class="pencil" src="./imagens/pencil-line.png" alt=""><a class="dropdown-items" href="#">To edit</a></li>
    <li><img class="delete-line" src="./imagens/delete-bin-5-line.png" alt="">
    <a href="#" class="dropdown-items" onclick="delFact(${fact.id})">Delete</a></li>
    </ul>
    </div>
    <span class="field-span">${fact.date}</span>
    <p class="field-p">${fact.description}</p>
    </div>
    `
    }else{
        htmlStructure += `<div class="in-between"></div>
        <div class="fieldFact position-relative" id="fieldFact">
        <img class="elipse-b" src="./imagens/elipse-blue.png" alt="">
        <img class="m-white-b" src="./imagens/pushpin-line-white.png" alt="">
        <div class="d-flex justify-content-between">
        <h6 class="title-sf">${fact.title}</h6>
        <button type="button" id="down-rt" class="dropdown-button" data-bs-toggle="dropdown">
        ...
        </button>
        <ul class="dropdown-menu dropdown-menu-center">
        <li><img class="pencil" src="./imagens/pencil-line.png" alt=""><a class="dropdown-items" href="#">To edit</a></li>
        <li><img class="delete-line" src="./imagens/delete-bin-5-line.png" alt="">
        <a href="#" class="dropdown-items" onclick="delFact(${fact.id})">Delete</a></li>
        </ul>
        </div>
        <span class="field-span">${fact.date}</span>
        <p class="field-p">${fact.description}</p>
        </div>
        `
    }
    }
     
})
    objFact.insertAdjacentHTML('afterbegin', htmlStructure)
    
}

async function delFact(id){
    console.log('entrei delFact', id)
    await fetch(`https://db-wexer.onrender.com/${id}`, {
      method: "DELETE"
    })
    showFact(currentPatient.id)
}
// <------------------------------------------------------------------------------------------->

//<---------Filtragem de sessões e fatos relevantes-------------->

const btnAll = document.querySelector('#all')
const btnSection = document.querySelector('#bt-section')
const btnFact = document.querySelector('#bt-fact')

btnAll.addEventListener("click", filterAll)
btnSection.addEventListener("click", filterSections)
btnFact.addEventListener("click", filterFacts)


function filterAll() {
const sections = document.querySelectorAll('#sectionField')
const facts = document.querySelectorAll('#factField')


sections.forEach((section) => {
section.style.display = "block"
})


facts.forEach((fact) => {
fact.style.display = "block"
})
}

// <---------------------filtragem sessões------------------------>

function filterSections() {
const sections = document.querySelectorAll('#sectionField')
const facts = document.querySelectorAll('#factField')


facts.forEach((fact) => {
fact.style.display = "none"
})


sections.forEach((section) => {
section.style.display = "block"
})
}

// <----------------------filtragem fatos------------------------->

function filterFacts() {
const sections = document.querySelectorAll('#sectionField')
const facts = document.querySelectorAll('#factField')

sections.forEach((section) => {
section.style.display = "none"
})

facts.forEach((fact) => {
fact.style.display = "block"
})
}

