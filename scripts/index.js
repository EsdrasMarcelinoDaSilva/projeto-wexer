const loginForm = document.querySelector('#form-signin');
loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.querySelector('#inputEmail').value;
    const password = document.querySelector('#inputPassword').value;
    
    const userStorage = window.localStorage.getItem('user')
    const user = JSON.parse(userStorage)

  if (email === user.email && password === user.password) {
    window.location.href = 'patients.html'
  } else {
    alert('Invalid email or password');
  }
});
