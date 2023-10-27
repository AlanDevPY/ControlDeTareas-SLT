import {
    asistenciasBD,
    registrarAsistencia,
    } from "./firebase.js";
  
// VARIABLES
let btnRegistrarCliente = document.getElementById("btnRegistrarCliente")
let btnRegistrarArea = document.getElementById("btnRegistrarArea")
let inputNombre = document.getElementById('inputNombre')
let inputTelefono = document.getElementById('inputTelefono')
let inputArea = document.getElementById('inputArea')

// EVENTOS
btnRegistrarCliente.addEventListener('click', () =>{
    let nombre = inputNombre.value;
    let telefono = inputTelefono.value;

    if(nombre === '' || telefono === ''){
        asistenciasBD(nombre,telefono)
    }


})