const token="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjI0LCJlbWFpbCI6Im0uc2VycmFub0B1dHAuZWR1LmNvIiwiaWF0IjoxNzI2MDc0ODMzLCJleHAiOjE3NDMzNTQ4MzN9.goHFu6-zAFIWBidc566TNIh9l0wDL0KqhQKV5Rqc9TA"
let idedit = 0;

fetch("https://fake-api-vq1l.onrender.com/posts",{
    headers:{
        "Authorization": token
    }
}).then(res => res.json()).then(res => {
    console.log(res)

    const list = document.getElementById("lista")
    res.forEach(product => {
        console.log(product)
        const li = document.createElement("li")
        const images = JSON.parse(product.images)
        const html = `<div class="card" style="width: 18rem; margin: 10px">
<img src="${images[0]}" class="card-img-top" alt="...">
<div class="card-body">
    <h5 class="card-title">${product.title}</h5>
    <p class="card-text">${product.description}</p>
    <p  style="color: red;">${product.value}</p>
    <button type="button" onclick="eliminar(${product.id})" class="btn btn-danger">Eliminar</button>
    <button type="button" onclick="editForm(${product.id},'${product.title}','${product.description}','${product.value}','${images[0]}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal-edit">Editar</button
</div>`
        li.innerHTML = html
        list.appendChild(li)
    });
})


function sendForm(){
    const title = document.getElementById("title");
    const description = document.getElementById("description");
    const value = document.getElementById("value");
    const image = document.getElementById("image");
    const body ={
      title: title.value,
      description: description.value,
      value: value.value,
      images: [image.value] 
    }
  
  
    fetch("https://fake-api-vq1l.onrender.com/posts", {
      method: "POST", 
      headers: {
        "Authorization": token,
        "Content-type": "application/json"
      },
      body: JSON.stringify(body)
    })
    .then( res => res.json())
    .then( res => {
      console.log(
        "respuesta de la api", res
      )
      title.value = "";
      description.value = "";
      value.value = "";
      image.value = "";
      location.reload();
    })
  
  }

  function editForm(id, title, description, value, image) {
    console.log(image)
    idedit = id;
    const title1 = document.getElementById("title-edit");
    const description2 = document.getElementById("description-edit");
    const value3 = document.getElementById("value-edit");
    const image4 = document.getElementById("image-edit");
    title1.value = title;
    description2.value = description;
    value3.value = value;
    image4.value = image;
    
}

function eliminar(id){
    console.log(id)
    fetch(`https://fake-api-vq1l.onrender.com/posts/${id}`, {
        method: "DELETE", 
        headers: {
        "Authorization": token
        },
    })
    .then( res => res.json())
    .then( res => {
        console.log(
        "respuesta de la api", res
        )
        location.reload();
    })}


  function saveedit() {
      const title = document.getElementById("title-edit");
      const description = document.getElementById("description-edit");
      const value = document.getElementById("value-edit");
      const image = document.getElementById("image-edit");
      console.log(title.value,description.value,value.value,image.value, idedit)
      const body ={
        title: title.value,
        description: description.value,
        value: value.value,
        images: [image.value] 
      }
      fetch(`https://fake-api-vq1l.onrender.com/posts/${idedit}`, {
        method: "PATCH", 
        headers: {
        "Authorization": token,
        "Content-type": "application/json"
        },
        body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then( res => {
      console.log(
        "respuesta de la api", res
      )
      title.value = "";
      description.value = "";
      value.value = "";
      image.value = "";

      location.reload();

    })}

    