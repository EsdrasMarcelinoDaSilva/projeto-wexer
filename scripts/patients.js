const nameHeader = document.querySelector('#name-header')
const emailHeader = document.querySelector('#email-a')
const btnExit = document.querySelector('#exit')

const userStorage = window.localStorage.getItem('user')
const users = JSON.parse(userStorage)

nameHeader.textContent = users.name
emailHeader.textContent = users.email

// btnExit.onclick = (e) =>{
//     window.localStorage.clear()
// }
console.log(users, typeof users)


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
    await fetch("http://localhost:3000/patients", {
       method: "POST",
       headers: {
         'Accept': 'application/json, text/plain, */*',
         'Content-Type': 'application/json'
        },
            body: JSON.stringify(patient)
        }); 
    }
    createPost(patient)
    window.location.href = 'patients.html'
   
})

async function displayPatient(){
    const response  = await fetch("http://localhost:3000/patients")
    const patients = await response.json()
    const objPatients = document.querySelector('#row')
    let html = ''
    patients.forEach(patient =>{
        
    html += `<div class="col-2 first text-center py-2 px-0">${patient.id}</div>
    <div class="col-4 first py-2 px-1 patient-1" id="patient-1" onclick="showPatientModal(${patient.id})">${patient.name}</div>
    <div class="col-4 first py-2 px-1">${patient.cpf}</div>
    <div class="col-2 first d-flex justify-content-evenly py-2 px-0 flex-wrap">
      <a href="#"><img src="./imagens/section.png" alt=""></a><a href="#"><img src="./imagens/edit.png" alt=""></a><a href="#" onclick="deletePatient(${patient.id})"><img src="./imagens/bin.png" alt=""></a>
    </div>`

    objPatients.innerHTML = html

    })
}
document.addEventListener("DOMContentLoaded", () => {
    displayPatient()
})

async function deletePatient(id){
    await fetch(`http://localhost:3000/patients/${id}`, {
      method: "DELETE"
    })
    window.location.href = 'patients.html'
}

async function showPatientModal(id) {
    const response = await fetch(`http://localhost:3000/patients/${id}`);
    const patient = await response.json();
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
