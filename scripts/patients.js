// <--------content user login header-------->
const nameHeader = document.querySelector('#name-header')
const emailHeader = document.querySelector('#email-a')
const btnExit = document.querySelector('#exit')

const userStorage = window.localStorage.getItem('user')
const users = JSON.parse(userStorage)

nameHeader.textContent = users.name
emailHeader.textContent = users.email

//<-----------modal new-register------------->

const form = document.querySelector('#form-new')
form.addEventListener('submit', (e) => {
e.preventDefault()

const cpf = document.querySelector('#input-1')
const name = document.querySelector('#input-2')
const dateOfBirth = document.querySelector('#input-3')
const email = document.querySelector('#input-4')
const sex = document.querySelector('#input-5')
const nationality = document.querySelector('#input-6')
const naturalness = document.querySelector('#input-7')
const profession = document.querySelector('#input-8')
const schooling = document.querySelector('#input-9')
const maritalStatus = document.querySelector('#input-10')
const mother = document.querySelector('#input-11')
const father = document.querySelector('#input-12')

const patient = {
    "cpf": cpf.value,
    "name": name.value,
    "dateOfBirth": dateOfBirth.value,
    "email": email.value,
    "sex": sex.value,
    "nationality": nationality.value,
    "naturalness": naturalness.value,
    "profession": profession.value,
    "schooling": schooling.value,
    "maritalStatus": maritalStatus.value,
    "mother": mother.value,
    "father": father.value
}

const createPost = async (patient) => {
    await fetch("https://db-wexer.onrender.com/patients", {
       method: "POST",
       headers: {
         'Accept': 'application/json, text/plain, */*',
         'Content-Type': 'application/json'
        },
            body: JSON.stringify(patient)
        }); 
    }
    createPost(patient)
    showModal('main-check')
    const closeButton = document.querySelector('#main-check .success')
    closeButton.addEventListener('click', () => {
    window.location.href = 'patients.html'; // Redireciona após o fechamento do modal
    });
    
})


let allPatients = []

async function displayPatient(){
    const response  = await fetch("https://db-wexer.onrender.com/patients")
    const patients = await response.json()
    allPatients = patients // armazenando todos os pacientes na variável global

    const objPatients = document.querySelector('#row')
    const inputFilter = document.querySelector('#input-filter')
    const buttonFilter = document.querySelector('.filter')

    let html = ''
    allPatients.forEach(patient =>{
        
        html += `<div class="col-2 first text-center py-2 px-0">${patient.id}</div>
         <div class="col-4 first py-2 px-1 patient-1" id="patient-1"    
        onclick="showPatientModal(${patient.id})">${patient.name}</div>
        <div class="col-4 first py-2 px-1">${patient.cpf}</div>
        <div class="col-2 first d-flex justify-content-evenly py-2 px-0 flex-wrap">
        <a href="section.html?user=${patient.id}"><img src="./imagens/section.png" alt=""></a>
        <a href="#" onclick="editPatient(${patient.id})"><img src="./imagens/edit.png" alt=""></a>
        <a href="#" onclick="deletePatient(${patient.id})">
        <img src="./imagens/bin.png" alt=""></a>
        </div>`
   
    })

    objPatients.innerHTML = html   

    buttonFilter.addEventListener('click', (e) => {
        e.preventDefault()
        const filterValue = inputFilter.value.trim().toLowerCase()

        if (filterValue !== '') {
            const filteredPatients = allPatients.filter(patient => {
                return patient.name.toLowerCase().includes(filterValue) || 
                patient.cpf.toLowerCase().includes(filterValue)
            })

            let htmlFiltered = ''
            filteredPatients.forEach(patient => {
                htmlFiltered += `<div class="col-2 first text-center py-2 px-0">${patient.id}</div>
                     <div class="col-4 first py-2 px-1 patient-1" id="patient-1" 
                      onclick="showPatientModal(${patient.id})">${patient.name}</div>
                    <div class="col-4 first py-2 px-1">${patient.cpf}</div>
                    <div class="col-2 first d-flex justify-content-evenly py-2 px-0 flex-wrap">
                    <a href="section.html?user=${patient.id}"><img src="./imagens/section.png" alt=""></a>
                    <a href="#" onclick="editPatient(${patient.id})"><img src="./imagens/edit.png" alt=""></a>
                    <a href="#" onclick="deletePatient(${patient.id})">
                    <img src="./imagens/bin.png" alt=""></a>
                    </div>`
            })

            objPatients.innerHTML = htmlFiltered
        } else {
            displayPatient() // exibe todos os pacientes novamente
        }
    })
}

document.addEventListener("DOMContentLoaded", () => {
    displayPatient()
    console.log('entrei')
})


async function deletePatient(id){
    await fetch(`https://db-wexer.onrender.com/patients/${id}`, {
      method: "DELETE"
    })
    window.location.href = 'patients.html'
}

async function showPatientModal(id) {
    const response = await fetch(`https://db-wexer.onrender.com/patients/${id}`);
    const patient = await response.json()
    //campos do formulário com os dados do paciente
    document.querySelector('#input-0').value = patient.cpf;
    document.querySelector('#input-13').value = patient.name;
    document.querySelector('#input-14').value = patient.dateOfBirth;
    document.querySelector('#input-15').value = patient.email;
    document.querySelector('#input-16').value = patient.sex;
    document.querySelector('#input-17').value = patient.nationality;
    document.querySelector('#input-18').value = patient.naturalness;
    document.querySelector('#input-19').value = patient.profession;
    document.querySelector('#input-20').value = patient.schooling;
    document.querySelector('#input-21').value = patient.maritalStatus;
    document.querySelector('#input-22').value = patient.mother;
    document.querySelector('#input-23').value = patient.father;
    // exibe o modal preenchido
    showModal('main-pt')  
}  
// <---------------------------------------------------------------->

async function editPatient(id) {
    const response = await fetch(`https://db-wexer.onrender.com/patients/${id}`);
    const patient = await response.json()

    let editCpf = document.querySelector('#input-24')
    editCpf.value = patient.cpf
    
    let editName = document.querySelector('#input-25')
    editName.value = patient.name

    let editdateOfBirth = document.querySelector('#input-26')
    editdateOfBirth.value = patient.dateOfBirth

    let editEmail = document.querySelector('#input-27')
    editEmail.value = patient.email

    let editSex = document.querySelector('#input-28')
    editSex.value = patient.sex

    let editNationality = document.querySelector('#input-29')
    editNationality.value = patient.nationality

    let editNaturalness = document.querySelector('#input-30')
    editNaturalness.value = patient.naturalness

    let editProfession = document.querySelector('#input-31')
    editProfession.value = patient.profession

    let editSchooling = document.querySelector('#input-32')
    editSchooling.value = patient.schooling

    let editMaritalStatus = document.querySelector('#input-33')
    editMaritalStatus.value = patient.maritalStatus

    let editMother = document.querySelector('#input-34')
    editMother.value = patient.mother

    let editFather = document.querySelector('#input-35')
    editFather.value = patient.father
  
    showModal('main-edit-patient')

    const form = document.getElementById('form-new-edit')
    form.addEventListener('submit', async (event) => {
      event.preventDefault()

    const editPatient = {

        "cpf": editCpf.value,
        "name": editName.value,
        "dateOfBirth": editdateOfBirth.value,
        "email": editEmail.value,
        "sex": editSex.value,
        "nationality": editNationality.value,
        "naturalness": editNaturalness.value,
        "profession": editProfession.value,
        "schooling": editSchooling.value,
        "maritalStatus": editMaritalStatus.value,
        "mother": editMother.value,
        "father": editFather.value

    }
    console.log(editPatient)
      await fetch(`https://db-wexer.onrender.com/patients/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editPatient)
      });
      displayPatient()
      closeModal('main-edit-patient')
  });
}
