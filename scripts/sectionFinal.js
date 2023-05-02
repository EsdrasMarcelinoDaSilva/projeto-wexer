// <----------------------inserção de dados capturados nos elementos da pagina sectionfinal.html------------------------>

const showSectionFinalData = async () => {

try {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString) //
    const user = urlParams.get('user')
   
    const response = await fetch("http://localhost:3000/medicalRecord/" + user)
    const data = await response.json()
    
    const titleFinal = document.querySelector('#title-final')
    const dateTime = document.querySelector('#date-time')
    const hour = document.querySelector('#hour')
    const hour1 = document.querySelector('#hour1')
    const paid = document.querySelector('#value1')
    const pay = document.querySelector('#payment')
    const textSection = document.querySelector('#text-Section')

  
    if(data){
    titleFinal.textContent = data.title
    dateTime.textContent = data.date
    hour.textContent = data.startTime
    hour1.textContent = data.endTime
    paid.textContent = data.paid
    pay.textContent = data.pay
    textSection.textContent = data.summary

    const backLink = document.querySelector('#back-a') // mantendo os dados atualizados na pagina anterior ao clicar em voltar (28-32) 
    backLink.addEventListener('click', (e) => {
    e.preventDefault()
    history.back()
    });

    backLink.setAttribute("href", `javascript:void(0);`);

}else{
    console.log('dados medico não encontrados')
}

}catch (error) {
    console.log('Erro ao buscar os dados:', error)
}
}

document.addEventListener("DOMContentLoaded", async () => {
    await showSectionFinalData()
})

