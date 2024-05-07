import {
    obtenerClientes,
} from "./firebase.js";

let btnEnvio = document.getElementById("btnEnvio");
let areaMensaje = document.getElementById("areaMensaje");
let operadora = 595;
let inputFile = document.getElementById("inputFile");

btnEnvio.addEventListener('click', (e) => {
    e.preventDefault();

    obtenerClientes((querySnapshot) => {
        const clientes = []; // Arreglo para almacenar números de teléfono
        querySnapshot.forEach((doc) => { 
            const cliente = doc.data();
            clientes.push(cliente);
        });

        clientes.sort((a, b) => a.nombre.localeCompare(b.nombre));

        function enviarMensajeConRetraso(clientes) {
            let index = 0;
            function enviarSiguienteMensaje() {
                if (index < clientes.length) {
                    var formData = new FormData();
                    formData.append("secret", "e513c41e6b43f77bc144d81ba7c39db3914a7c59"); 
                    formData.append("account", "1715015201e4da3b7fbbce2345d7772b0674a318d566390e21894a8"); // AQUÍ SE INSERTA EL CAMPO VACÍO
                    formData.append("recipient", operadora + clientes[index].telefono);
                    formData.append("type", "media");
                    formData.append("message", `
                    ¡Tu satisfacción es nuestro mayor objetivo!
                    no te olvides de pedir tu menu diario!!
                    `);
                    formData.append("media_file", inputFile.files[0]);

                    var xhr = new XMLHttpRequest();
                    
                    xhr.open("POST", "https://whats-flow.com/api/send/whatsapp", true);

                    xhr.onload = function() {
                        if (xhr.status === 200) {
                            var result = JSON.parse(xhr.responseText);
                            // console.log("Mensaje enviado: " + JSON.stringify(result, null, 4));

                            if(result.status === 200) {
                                console.log("Mensaje enviado: " + JSON.stringify(result, null, 4));
                                Toastify({
                                    text: "Mensaje Enviado a : " + clientes[index].nombre,
                                    duration: 3000,
                                    destination: "https://github.com/apvarun/toastify-js",
                                    newWindow: true,
                                    close: false,
                                    gravity: "bottom", // `top` or `bottom`
                                    position: "right", // `left`, `center` or `right`
                                    stopOnFocus: true, // Prevents dismissing of toast on hover
                                    style: {
                                      background: "linear-gradient(to right, #00b09b, #96c93d)",
                                    },
                                    onClick: function(){} // Callback after click
                                  }).showToast();

                            }else{
                                Toastify({
                                    text: "Mensaje  No Enviado a : " + clientes[index].nombre,
                                    duration: 3000,
                                    destination: "https://github.com/apvarun/toastify-js",
                                    newWindow: true,
                                    close: false,
                                    gravity: "bottom", // `top` or `bottom`
                                    position: "right", // `left`, `center` or `right`
                                    stopOnFocus: true, // Prevents dismissing of toast on hover
                                    style: {
                                      background: "red",
                                    },
                                    onClick: function(){} // Callback after click
                                  }).showToast();
                                console.log("Mensaje no enviado a a " + clientes[index].nombre);
                                console.log("Mensaje enviado: " + JSON.stringify(result, null, 4));
                            }

                        } else if (xhr.status === 404) {
                            console.log("Error 404: URL no encontrada");
                        }
                         else {
                            console.log("Error al enviar el mensaje: " + xhr.statusText);
                        }
                        index++;
                        setTimeout(enviarSiguienteMensaje, 1000); // Espera 1 segundo antes de enviar el siguiente mensaje
                    };

                    xhr.onerror = function() {
                        console.log("Error en la solicitud AJAX");
                        index++;
                        setTimeout(enviarSiguienteMensaje, 1000); // Si hay un error, espera 1 segundo antes de enviar el siguiente mensaje
                    };

                    xhr.send(formData);
                }
            }
            enviarSiguienteMensaje(); // Comienza el proceso de enviar mensajes con retraso
        }

        enviarMensajeConRetraso(clientes);
    });
});
