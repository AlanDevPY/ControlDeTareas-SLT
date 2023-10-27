import {
    registrarAsistencia,
    areaDB,
    clientesDB
  } from "./firebase.js";


let btnRegistrar = document.getElementById('btnRegistrar')
let inputSolicitud = document.getElementById('inputSolicitud');
let inputDescripcion = document.getElementById('inputDescripcion')
let alert = document.getElementById("alert")
let operadora = 595








window.addEventListener('DOMContentLoaded', async () => {
    
  let inputSelectArea = document.getElementById('inputSelectArea')

  areaDB((querySnapshot) => {
      let option = ''
      let areas = []

      querySnapshot.forEach((doc) => {
          let area = doc.data()
          areas.push({...area, id: doc.id});
      });



      areas.forEach((area) =>{
          option +=`
          <option value="${area.area}">${area.area}</option>
          `
      })


      inputSelectArea.innerHTML = option;
  })
})


window.addEventListener('DOMContentLoaded', async () => {
    
  let inputSelectCliente = document.getElementById('inputSelectCliente')

  clientesDB((querySnapshot) => {
      let tr = ''
      let clientes = []

      querySnapshot.forEach((doc) => {
          let cliente = doc.data()
          clientes.push({...cliente, id: doc.id});
      });



      clientes.forEach((cliente) =>{
          tr +=`
          <option value="${cliente.telefono}">${cliente.nombre}</option>
          `
      })


      inputSelectCliente.innerHTML = tr;
  })
})



btnRegistrar.addEventListener("click", (e) => {
    e.preventDefault()
    let solicitud = inputSolicitud.value;
    let descripcion = inputDescripcion.value;
    let inputSelectArea = document.getElementById('inputSelectArea')
    let area = inputSelectArea.value
    let inputSelectCliente = document.getElementById('inputSelectCliente')
    let nombre = inputSelectCliente.options[inputSelectCliente.selectedIndex].text;
    let telefono = inputSelectCliente.value

    if((solicitud === '' || descripcion === '')){
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
*${nombre}* Su ticket de asistencia fue generado | Ticket N°#*${ticket}*❗❗
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
    inputDescripcion.value = ''
    inputSolicitud.value = ''
})