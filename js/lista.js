let URLIMG = '../assets/images/fotonoencontrada.jpg'

let favoritos = []

let favoritosLocal = localStorage.getItem('favoritos')
if (favoritosLocal != null){
    favoritos = JSON.parse(favoritosLocal)
}

let contenedor = document.getElementById('contenedorPeliculas')
    favoritos.forEach(pelicula =>{
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

        //// ========================================Boton Eliminar========================================
            let botonEliminar = document.createElement("button");
            botonEliminar.classList.add("btn", "btn-success");
            botonEliminar.innerText = "Eliminar de la lista";
            botonEliminar.style.width = "100%";
            botonEliminar.addEventListener("click", (e) => {
                e.preventDefault()
                let estado = localStorage.getItem('activo')
                if (estado === "false"){
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Debes ingresar a tu cuenta!"
                    });  
                }   
                else{
                    favoritos = favoritos.filter(elemento => elemento.original_title !== pelicula.original_title);
                    localStorage.setItem('favoritos',JSON.stringify(favoritos))
                    Swal.fire({
                    icon: "success",
                    title: "Película eliminada",
                    text: "La película ya no está en la lista!"
                    });
                    setTimeout(function() {
                    window.location.reload();
                    }, 1000); 
                }
            })

            cardBody.appendChild(titulo)
            cardBody.appendChild(descripcion)
            cardBody.appendChild(botonEliminar)

            card.appendChild(img)
            card.appendChild(cardBody)

            contenedor.appendChild(card)
    
})

