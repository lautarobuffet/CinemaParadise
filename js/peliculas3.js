let favoritos = []

let favoritosLocal = localStorage.getItem('favoritos')
if (favoritosLocal != null){
    favoritos = JSON.parse(favoritosLocal)
}
let URLIMG='../assets/images/fotoencontrada.jpg'
//// ========================================Botones========================================
let contenedor = document.getElementById('botones');

let grupoBotones = document.createElement('div');
grupoBotones.className = 'btn-group me-2';
grupoBotones.setAttribute('role', 'group');
grupoBotones.setAttribute('aria-label', 'First group');

for (let i = 1; i <= 3; i++) {
    let enlace = document.createElement('a');
    enlace.href = `peliculas${i}.html`;

    let boton = document.createElement('button');
    boton.type = 'button';
    boton.className = 'btn btn-outline-secondary';
    boton.innerText = i;

    enlace.appendChild(boton);
    grupoBotones.appendChild(enlace);
}

contenedor.appendChild(grupoBotones);


//// ========================================Mostrar Populares========================================
let contenedor2 = document.getElementById('contenedorPopulares')

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YWNlMTczMGVmOWI2Y2QzMWNlNGE0YmZkNTYwZGFiNSIsInN1YiI6IjY1OWRkNzk1OGU4ZDMwMDI1ZTEyMzQ4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wwyif_WTgvoonZWtcSH0-odS49L4m1g2mOQ0nU-Kr4o'
    }
  };
  
  fetch('https://api.themoviedb.org/3/movie/popular?language=es-MX&page=3', options)
    .then(response => response.json())
    .then(data => {console.log(data)

        data.results.forEach(pelicula => {
        console.log(pelicula.original_title)
        
    if (pelicula.poster_path == null){
        URLIMG = '../assets/images/fotonoencontrada.jpg'
    } else { URLIMG = `https://image.tmdb.org/t/p/w780/${pelicula.poster_path}`}
    
    let card = document.createElement('div')
    card.classList.add("card")
    card.style.width = "18rem";

    let img = document.createElement('img')
    img.src = URLIMG
    img.classList.add('card-img-top')
    img.alt = "foto pelicula"

    let cardBody = document.createElement('div')
    cardBody.classList.add('card-body')

    let titulo = document.createElement('h5')
    titulo.classList.add('card-title')
    titulo.innerText = pelicula.original_title

    let descripcion = document.createElement('p')
    descripcion.classList.add('card-text')
    descripcion.innerText = pelicula.overview

    //// ========================================Boton Agregar========================================
    let botonAgregar = document.createElement("button");
    botonAgregar.classList.add("btn", "btn-success");
    botonAgregar.innerText = "Agregar a la lista";
    botonAgregar.style.width = "100%";
    botonAgregar.addEventListener("click", (e) => {
        e.preventDefault()
        let estado = localStorage.getItem('activo')
        let peliculaEnLista = favoritos.includes(pelicula) 
        if (peliculaEnLista){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Esta película ya está en la lista!"
            });
        }else{ if (estado ==='false'){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Debes ingresar a tu cuenta!"
                });  
            }
            else{
                Swal.fire({
                icon: "success",
                title: "Película agregada",
                text: "La película ahora está en la lista!"
                });
             favoritos.push(pelicula)
             localStorage.setItem('favoritos',JSON.stringify(favoritos))
            }
        }
    })

    cardBody.appendChild(titulo)
    cardBody.appendChild(descripcion)
    cardBody.appendChild(botonAgregar)

    card.appendChild(img)
    card.appendChild(cardBody)

    document.getElementById('contenedorNombre').innerHTML = 'Películas Populares (3)';
    contenedor2.appendChild(card)

})

.catch((error) => {
    console.log(error)
})
    })