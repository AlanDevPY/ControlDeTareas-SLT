


let btnRegistrar = document.getElementById('btnRegistrar')
let inputSolicitud = document.getElementById('inputSolicitud');
let inputArea = document.getElementById('inputArea')
let inputNombre = document.getElementById('inputNombre')
let inputTelefono = document.getElementById('inputTelefono')
let inputDescripcion = document.getElementById('inputDescripcion')

btnRegistrar.addEventListener("click", (e) => {
    e.preventDefault()
    let solicitud = inputSolicitud.value;
    let area = inputArea.value;
    let nombre = inputNombre.value;
    let telefono = inputTelefono.value;
    let descripcion = inputDescripcion.value;
})