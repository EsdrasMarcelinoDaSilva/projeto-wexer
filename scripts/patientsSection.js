async function displayPatient(){
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const user = urlParams.get('user')

    console.log(user)
    
    const response  = await fetch("http://localhost:3000/patients/" + user)
    const patients = await response.json()
    
    const patientName = document.querySelector('#paragraph')
    const patientBirth = document.querySelector('#paragraph-1')
    const patientProfession = document.querySelector('#paragraph-2')
    const patientSchooling = document.querySelector('#paragraph-3')

    patientName.textContent = patients.name
    patientBirth.textContent = patients.dateOfBirth
    patientProfession.textContent = patients.profession
    patientSchooling.textContent = patients.schooling
}
document.addEventListener("DOMContentLoaded", () => {
    displayPatient()
    console.log('entrei')
})




