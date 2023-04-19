function showModal(modalId){
    const modal = document.getElementById(modalId)
    modal.style.display = "block"   
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = "none";
}

const minhaDiv = document.getElementById('patient-1');

minhaDiv.addEventListener('click', function () {
    showModal('main-pt')
});

async function getPosts(){
  const apiResponse = await fetch("http://localhost:3000/posts")
  const posts = await apiResponse.json()
    console.log(posts)
    posts.forEach(post => Mostrar(post))
    console.log(posts)
}

const createPost = async (data) => {
    await fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
}

async function addPost(titulo,autor,imagem,texto){ 
    const post = {
      "title": titulo,
      "author": autor,
      "image": imagem,
      "text": texto,    
  }
    await createPost(post)
}

async function deletePost(id){
    await fetch(`http://localhost:3000/posts/${id}`, {
      method: "DELETE"
    })
    window.location.href = "index.html"
}
  
// const contentWrapper = document.querySelector('.content-wrapper')
// contentWrapper.innerHTML = ` <div class="col-12 mt-4">
// <div class=" new-content d-flex justify-content-center">conteudo  aqui</div>
// </div>

