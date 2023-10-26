import {
    registrarAsistencia,
  } from "./firebase.js";


let btnRegistrar = document.getElementById('btnRegistrar')
let inputSolicitud = document.getElementById('inputSolicitud');
let inputArea = document.getElementById('inputArea')
let inputNombre = document.getElementById('inputNombre')
let inputTelefono = document.getElementById('inputTelefono')
let inputDescripcion = document.getElementById('inputDescripcion')
let alert = document.getElementById("alert")

btnRegistrar.addEventListener("click", (e) => {
    e.preventDefault()
    let solicitud = inputSolicitud.value;
    let area = inputArea.value;
    let nombre = inputNombre.value;
    let telefono = inputTelefono.value;
    let descripcion = inputDescripcion.value;

    if((solicitud === '' || area === '' || nombre === '' || telefono === '' || descripcion === '')){
        alert.innerHTML = `
        <div class="alert alert-danger" role="alert">
        Por favor completa todo los campos
</div>
        `
    }else{
        registrarAsistencia(solicitud, area, nombre, telefono,descripcion)
        alert.innerHTML = `
        <div class="alert alert-success" role="alert">
  Asistencia registrada
</div>
        `
    }
})