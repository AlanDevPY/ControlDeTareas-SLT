// Importaciones
import {
    clientesDB, registrarCliente, borrarCliente,
    menuDB, registrarMenu, borrarMenu,
    registrarDelivery, deliveryDB, borarDelivery,
    obtenerClientePorId,
    actualizarDato
} from "./firebase.js";

let editEstatus = false
let id = '';
let cliente
// CUANDO EL DOM SE CARGA
// APARTAD MOSTRAR CLIENTE, MENU, DELIVERY
window.addEventListener('DOMContentLoaded', async () => {

    let tBody = document.getElementById('tBodyCliente')
    let tBodyMenu = document.getElementById("tBodyMenu")
    let tBodyDelviery = document.getElementById("tBodyDelivery")


    // mostrar cliente registrdos
    clientesDB((querySnapshot) => {
        let datos = ''
        let clientes = []

        querySnapshot.forEach((doc) => {
            let cliente = doc.data()
            clientes.push({ ...cliente, id: doc.id });
        });

        let contador = 1
        clientes.sort((a, b) => a.nombre.localeCompare(b.nombre));

        clientes.forEach((cliente) => {
            datos += `
            <tr>
            <th>${contador++}</th>
            <td>${cliente.nombre} ${cliente.apellido}</td>
            <td>${cliente.telefono}</td>
            <td>${cliente.direccion}</td>
            <td>${cliente.referencia}</td>
             <td>
             <button data-id="${cliente.id}" class="btn btn-warning btn-sm">Editar</button>
             <button data-id="${cliente.id}" class="btn btn-danger btn-sm">Eliminar</button>
             </td>
          </tr>
            `
        })
        tBody.innerHTML = datos;

        const btnDelet = tBody.querySelectorAll(".btn-danger");
        const btnEdiit = tBody.querySelectorAll(".btn-warning");

        // Agregar un evento de clic a cada botón de borrado
        btnDelet.forEach((btn) => {
            btn.addEventListener("click", async (event) => {
                borrarCliente(event.target.dataset.id);


                Toastify({
                    text: "Cliente Eliminado",
                    duration: 3000,
                    destination: "https://github.com/apvarun/toastify-js",
                    newWindow: true,
                    close: true,
                    gravity: "bottom", // `top` or `bottom`
                    position: "right", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                        background: "linear-gradient(to right, #00b09b, #96c93d)",
                    },
                    onClick: function () { } // Callback after click
                }).showToast();
            });
        });

        btnEdiit.forEach((btn) => {
            btn.addEventListener("click", async (event) => {
                id = event.target.dataset.id
                cliente = await obtenerClientePorId(event.target.dataset.id)
                cliente = cliente.data()
                btnRegistrarCliente.textContent = 'Actualizar Dato'
                document.getElementById('inputNombre').value = cliente.nombre
                document.getElementById('inputApellido').value = cliente.apellido
                document.getElementById('inputTelefono').value = cliente.telefono
                document.getElementById('inputDireccion').value = cliente.direccion
                document.getElementById('inputReferencia').value = cliente.referencia
                editEstatus = true


            });
        });
    })


    // Mostrar menu registrados
    menuDB((querySnapshot) => {
        let datos = ''
        let menus = []

        querySnapshot.forEach((doc) => {
            let menu = doc.data()
            menus.push({ ...menu, id: doc.id });
        });

        let contador = 1
        menus.sort((a, b) => a.menu.localeCompare(b.menu));

        menus.forEach((menu) => {
            datos += `
            <tr>
            <th>${contador++}</th>
            <td>${menu.menu}</td>
            <td>${menu.costo}</td>
             <td>
              <button data-id="${menu.id}" class="btn btn-warning btn-sm btnMenu">Eliminar</button>
             </td>
          </tr>
            `
        })
        tBodyMenu.innerHTML = datos;

        const btnDelet = tBodyMenu.querySelectorAll(".btnMenu");

        // Agregar un evento de clic a cada botón de borrado
        btnDelet.forEach((btn) => {
            btn.addEventListener("click", (event) => {
                // Llamar a la función deletTask con el ID de la tarea asociado al botón
                borrarMenu(event.target.dataset.id);
                Toastify({
                    text: "Menu Eliminado",
                    duration: 3000,
                    destination: "https://github.com/apvarun/toastify-js",
                    newWindow: true,
                    close: true,
                    gravity: "bottom", // `top` or `bottom`
                    position: "right", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                        background: "linear-gradient(to right, #00b09b, #96c93d)",
                    },
                    onClick: function () { } // Callback after click
                }).showToast();
            });
        });
    })

    // Mostrar Deliverys 
    deliveryDB((querySnapshot) => {
        let datos = ''
        let deliverys = []

        querySnapshot.forEach((doc) => {
            let delivery = doc.data()
            deliverys.push({ ...delivery, id: doc.id });
        });

        let contador = 1
        // deliverys.sort((a, b) => a.menu.localeCompare(b.menu));

        deliverys.forEach((delivery) => {
            datos += `
            <tr>
            <th>${contador++}</th>
            <td>${delivery.delivery}</td>
            <td>${delivery.telefono}</td>
             <td>
              <button data-id="${delivery.id}" class="btn btn-warning btn-sm btnDelivery">Eliminar</button>
             </td>
          </tr>
            `
        })
        tBodyDelviery.innerHTML = datos;

        const btnDelet = tBodyDelviery.querySelectorAll(".btnDelivery");

        // Agregar un evento de clic a cada botón de borrado
        btnDelet.forEach((btn) => {
            btn.addEventListener("click", (event) => {
                // Llamar a la función deletTask con el ID de la tarea asociado al botón
                borarDelivery(event.target.dataset.id);
                Toastify({
                    text: "Delivery Eliminado",
                    duration: 3000,
                    destination: "https://github.com/apvarun/toastify-js",
                    newWindow: true,
                    close: true,
                    gravity: "bottom", // `top` or `bottom`
                    position: "right", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                        background: "linear-gradient(to right, #00b09b, #96c93d)",
                    },
                    onClick: function () { } // Callback after click
                }).showToast();
            });
        });
    })
})


// APARTADO REGISTAR CLIENTE
let btnRegistrarCliente = document.getElementById('btnRegistrarCliente')
btnRegistrarCliente.addEventListener('click', () => {
    let nombre = document.getElementById('inputNombre').value;
    let apellido = document.getElementById('inputApellido').value;
    let telefono = document.getElementById('inputTelefono').value;
    let direccion = document.getElementById('inputDireccion').value;
    let referencia = document.getElementById('inputReferencia').value;

    if (!editEstatus) {

        registrarCliente(nombre, apellido, telefono, direccion, referencia)
        
        document.getElementById('inputNombre').value = '';
        document.getElementById('inputApellido').value = '';
        document.getElementById('inputTelefono').value = '';
        document.getElementById('inputDireccion').value = '';
        document.getElementById('inputReferencia').value = '';
    }else{
        console.log(id);
        actualizarDato(id,{
            nombre: nombre,
            apellido: apellido,
            telefono:telefono,
            direccion:direccion,
            referencia:referencia

        })
        document.getElementById('inputNombre').value = '';
        document.getElementById('inputApellido').value = '';
        document.getElementById('inputTelefono').value = '';
        document.getElementById('inputDireccion').value = '';
        document.getElementById('inputReferencia').value = '';
        editEstatus = false
        btnRegistrarCliente.textContent = 'Registrar'
    }
});


// APARTADO REGISTRAR MENU
let btnRegistrarMenu = document.getElementById('btnRegistrarMenu')
btnRegistrarMenu.addEventListener('click', () => {
    let menu = document.getElementById('inputMenu').value;
    let menuCosto = document.getElementById('inputMenuCosto').value;

    registrarMenu(menu, menuCosto)
    Toastify({
        text: "Menu Registrado",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function () { } // Callback after click
    }).showToast();

    document.getElementById('inputMenu').value = '';
    document.getElementById('inputMenuCosto').value = '';
})

// APARTADO REGISTRAR DELIVERY
let btnRegistrarDelivery = document.getElementById('btnRegistrarDelivery')
btnRegistrarDelivery.addEventListener('click', () => {
    let nombre = document.getElementById('inputNombreDelivery').value
    let telefono = document.getElementById('inputTelefonoDelivery').value

    registrarDelivery(nombre, telefono)
})