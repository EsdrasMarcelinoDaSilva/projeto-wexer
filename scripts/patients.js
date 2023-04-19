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

const user = {
    "name": name,
    "email": email,
    "password": password,
}

const createPost = async (user) => {
    await fetch("http://localhost:3000/patients", {
      method: "POST",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    }); 
}
createPost(user)