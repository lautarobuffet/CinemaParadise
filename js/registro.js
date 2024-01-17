let usuarios = []

let usuariosLocal = localStorage.getItem('usuarios')
if (usuariosLocal != null){
    usuarios = JSON.parse(usuariosLocal)
}

botonRegistrarse.addEventListener('click',(e)=>{
    e.preventDefault()

    let email = document.getElementById('email').value
    let contraseña = document.getElementById('contraseña').value
    let contraseñaConfirmada = document.getElementById('contraseñaConfirmada').value

        if (email == '' || contraseña == '') {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Ingresa un correo o contraseña!"
            });
        } else{

            if (contraseña == contraseñaConfirmada) {

                let usuario = {
                    email : email,
                    contraseña: contraseña
                }

                usuarios.push(usuario)
                localStorage.setItem('usuarios',JSON.stringify(usuarios))
        
                Swal.fire({
                    icon: 'success',
                    title: "Cuenta creada!",
                    html: "Volveremos a la página de login en 3 segundos.",
                    timer: 3000,
                    timerProgressBar: true,
             }).then((result) => {
                    window.location.href = '../pages/cuenta.html';
                });

            } else {
             Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Contraseñas no coinciden!"
                });
            }
        }
        
})




