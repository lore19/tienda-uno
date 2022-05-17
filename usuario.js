var usuario = window.location.search.substring(9);

if(usuario != ""){
   const usuarioDiv = document.getElementById("verUsuario").innerHTML = 
   `<h5>Usted se ha identificado como: "${usuario}"</h5>`;
}