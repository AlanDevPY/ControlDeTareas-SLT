import {
    registrarAsistencia,
    areaDB
  } from "./firebase.js";


let btnRegistrar = document.getElementById('btnRegistrar')
let inputSolicitud = document.getElementById('inputSolicitud');
let inputArea = document.getElementById('inputArea')
let inputNombre = document.getElementById('inputNombre')
let inputTelefono = document.getElementById('inputTelefono')
let inputDescripcion = document.getElementById('inputDescripcion')
let alert = document.getElementById("alert")
let operadora = 595








window.addEventListener('DOMContentLoaded', async () => {
    
  let inputSelect = document.getElementById('inputSelect')

  areaDB((querySnapshot) => {
      let tr = ''
      let areas = []

      querySnapshot.forEach((doc) => {
          let area = doc.data()
          areas.push({...area, id: doc.id});
      });

      console.log(areas);


      areas.forEach((area) =>{
          tr +=`
          <option value="${area.area}">${area.area}</option>
          `
      })


      inputSelect.innerHTML = tr;
  })
})



btnRegistrar.addEventListener("click", (e) => {
    e.preventDefault()
    let solicitud = inputSolicitud.value;
    let area = inputArea.value;
    let nombre = inputNombre.value;
    let telefono = inputTelefono.value;
    let descripcion = inputDescripcion.value;

    if((solicitud === '' || area === '' || nombre === '' || descripcion === '')){
        alert.innerHTML = `<div class="alert alert-danger" role="alert">Por favor completa todo los campos</div>`
    }else{
        function generarCadenaAleatoria() {
            const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            let cadena = '';
          
            // Genera 3 letras aleatorias
            for (let i = 0; i < 3; i++) {
              const letraAleatoria = letras.charAt(Math.floor(Math.random() * 26));
              cadena += letraAleatoria;
            }
          
            // Genera 2 números aleatorios
            for (let i = 0; i < 2; i++) {
              const numeroAleatorio = Math.floor(Math.random() * 10);
              cadena += numeroAleatorio;
            }
          
            return cadena;
          }
          
          const ticket = generarCadenaAleatoria();
          
        registrarAsistencia(ticket,solicitud, area, nombre, telefono,descripcion)
        alert.innerHTML = ` <div class="alert alert-success" role="alert">Asistencia registrada</div>`

        let mensaje = ` 
*${nombre}* Su ticket de asistencia fue generado | Ticket N°#*${ticket}*✅
*Motivo* : ${solicitud}
*Despcripcion del problema* : ${descripcion}
*Area* : ${area}
        `;

        var chat = {
          secret: "e513c41e6b43f77bc144d81ba7c39db3914a7c59",
          account: "1698239289e4da3b7fbbce2345d7772b0674a318d56539133983e61",
          recipient:operadora+telefono,
          type: "text",
          message: mensaje, // Aquí debes proporcionar el mensaje que deseas enviar
        }; 

        $.ajax({
          type: "POST",
          url: "https://whats-flow.com/api/send/whatsapp",
          data: chat,
          success: function (response) {
            // Maneja la respuesta del servidor aquí (puede requerir validación)
            console.log(response);
            
          },
          error: function (xhr, textStatus, errorThrown) {
            // Maneja los errores de manera adecuada, muestra mensajes al usuario si es necesario
            console.error("Error en la solicitud: " + textStatus, errorThrown);
          },
        });
    }
})