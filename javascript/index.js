import {
    registrarAsistencia,
    areaDB,
    clientesDB
  } from "./firebase.js";


let btnRegistrar = document.getElementById('btnRegistrar')
let inputSolicitud = document.getElementById('inputSolicitud');
let inputDescripcion = document.getElementById('inputDescripcion')
let alert = document.getElementById("alert")
let whatsapp = document.getElementById("whatsapp")
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


      areas.sort((a, b) => a.area.localeCompare(b.area));
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

      clientes.sort((a, b) => a.nombre.localeCompare(b.nombre));

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
        // alert.innerHTML = `<div class="alert alert-danger" role="alert">Por favor completa todo los campos</div>`
        Toastify({
          text: "Favor de completar los datos",
          duration: 2000,
          destination: "https://github.com/apvarun/toastify-js",
          newWindow: true,
          // close: true,
          gravity: "bottom", // `top` or `bottom`
          position: "right", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: "black",
          }
        }).showToast();
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

          Toastify({
            text: "Asistencia Tecnica Registrado",
            duration: 2000,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            // close: true,
            gravity: "bottom", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "black",
            }
          }).showToast();


          
        registrarAsistencia(ticket,solicitud, area, nombre, telefono,descripcion)
        // alert.innerHTML = ` <div class="alert alert-success text-center" role="alert">Asistencia registrada</div>`

        let mensaje = ` 

  TICKET DE ASISTENCIA GENERADO ❗❗ N°#*${ticket}

*${nombre}* Su ticket de asistencia fue generado
*Motivo* : ${solicitud}
*Despcripcion* : ${descripcion}
*Area* : ${area}
        `;

        var chat = {
          secret: "e513c41e6b43f77bc144d81ba7c39db3914a7c59",
          account: "1705662305e4da3b7fbbce2345d7772b0674a318d565aa576122301",
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
            Toastify({
              text: "Whatsapp Enviado",
              duration: 3000,
              destination: "https://github.com/apvarun/toastify-js",
              newWindow: true,
              // close: true,
              gravity: "bottom", // `top` or `bottom`
              position: "right", // `left`, `center` or `right`
              stopOnFocus: true, // Prevents dismissing of toast on hover
              style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
              }
            }).showToast();
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