let usuarios = []

let usuariosLocal = localStorage.getItem('usuarios',usuarios)
if (usuariosLocal != null){
    usuarios = JSON.parse(usuariosLocal)
}

botonIniciarse.addEventListener('click',(e)=>{
    e.preventDefault() 

    let email = document.getElementById('email').value
    let contraseña = document.getElementById('contraseña').value

    if (email == '' || contraseña == '') {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Ingresa un correo o contraseña!"
        });
    } else{

        let usuarioEncontrado = usuarios.find(user => user.email == email && user.contraseña == contraseña)
        if (usuarioEncontrado){
            localStorage.setItem('activo',true)
            Swal.fire({
                icon: 'success',
                title: "Sesión iniciada!",
                html: "Volveremos a la página de principal en 3 segundos.",
                timer: 3000,
                timerProgressBar: true,
            }).then((result) => {
                window.location.href = '../index.html';
            });
        } else{
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "El usuario o la contraseña no coinciden!"
          });
        }
    }
})

botonCerrarse.addEventListener('click',(e)=>{
    e.preventDefault()
    localStorage.setItem('activo',false)
    Swal.fire({
        icon: 'success',
        title: "Sesión cerrada!",
        html: "Volveremos a la página de principal en 3 segundos.",
        timer: 3000,
        timerProgressBar: true,
    }).then((result) => {
        window.location.href = '../index.html';
    });

})


// let estadoSesion = localStorage.getItem('activo')

// if (estadoSesion === "true"){
//     //agregas a la lista
// } else {
//     // notificas que hay que iniciar sesion
// }