async function getUser(){
    const apiResponse = await fetch("https://projeto-wexer.vercel.app/user")
    const users = await apiResponse.json()
    console.log(users)
}
getUser()

const proceedBtn = document.querySelector('#bt-pass')
    proceedBtn.addEventListener('click', async (event) => {
        event.preventDefault()
        const name = document.querySelector('#inputName').value
        const email = document.querySelector('#inputEmail').value

        if(!name || !email){
            alert('Please fill in name and email before proceeding')
               return
        }
        const registerForm = document.querySelector('#register-form')
        registerForm.classList.add('d-none')
        
        const passwordForm = document.querySelector('#password-f')
        passwordForm.classList.remove('d-none')
       
})
const passwordForm = document.querySelector('#password-form')
passwordForm.addEventListener('submit', async (event) =>{
    event.preventDefault()
    const name = document.querySelector('#inputName').value
    const email = document.querySelector('#inputEmail').value
    const password = document.querySelector('#inputPassword').value
    const confirmPassword = document.querySelector('#inputPass').value

    if(password !== confirmPassword){
        alert('Passwords do not match')
        return
    }else if(password == '' || confirmPassword == ''){
        alert('Enter a valid password')
        return
    }else if(password.length < 8 || confirmPassword.length < 8){
        alert('eight digits required')
        return
    }
    const user = {
        "name": name,
        "email": email,
        "password": password,
    }
   
    const createPost = async (user) => {
       await fetch("https://projeto-wexer.vercel.app/user", {
          method: "POST",
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
         },
          body: JSON.stringify(user)
        }); 
    }
    createPost(user)
    
    window.localStorage.setItem('user', JSON.stringify(user))
    window.location.href = 'patients.html'
   
})


