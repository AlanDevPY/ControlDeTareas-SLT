
import { clientesDB, areaDB, deliveryDB, registrarAsistencias, obtenerClientePorId, pedidosDB, borrarPedido, obtenerPedidosPorID } from "./firebase.js";

window.addEventListener('DOMContentLoaded', async () => {

    //Mostar pedidos registrados
        // MOSTRAR ESTUDIOS REGISTRADOS
        pedidosDB((querySnapshot) => {
        let tBody = document.getElementById('tBody')
        let options = ''
        let datos = []

        querySnapshot.forEach((doc) => {
            let dato = doc.data()
            datos.push({ ...dato, id: doc.id })
        })



        let contador = 1

        datos.sort((b, a) => {
            const fechaA = convertirAFecha(a.fecha);
            const fechaB = convertirAFecha(b.fecha);
            return fechaB - fechaA;
        });

        function convertirAFecha(fecha) {
            const partesFechaHora = fecha.split(', ');
            const partesFecha = partesFechaHora[0].split('/');
            const partesHora = partesFechaHora[1].split(':');

            const dia = partesFecha[0];
            const mes = partesFecha[1];
            const año = partesFecha[2];
            const hora = partesHora[0];
            const minuto = partesHora[1];
            const segundo = partesHora[2];

            return new Date(año, mes - 1, dia, hora, minuto, segundo);
        }

        // datos.forEach((dato) =>{
        //     console.log(dato.fechaRegistro);
        // })


        datos.forEach((dato) => {
            options += `  
            <tr>
            <th>${contador++}</th>
            <th>${dato.fecha}</th>
            <th>${dato.solicitud}</th>
            <td>${dato.area}</td>
            <td>${dato.cliente}</td>
            <td>
            <button type="button" data-id="${dato.id}" class="btn btn-outline-success print ">Terminado</button>
                <button type="button" data-id="${dato.id}" class="btn btn-outline-danger delete ">Eliminar</button>
            </td>
          </tr>
            
                `
        })
        tBody.innerHTML = options;

        const btnDelet = tBody.querySelectorAll(".delete");

        btnDelet.forEach((btn) => {
            btn.addEventListener("click", (event) => {
                // Llamar a la función deletTask con el ID de la tarea asociado al botón
                borrarPedido(event.target.dataset.id);
            });
        });


        const btnPrint = tBody.querySelectorAll(".print");

        btnPrint.forEach((btn) => {
            btn.addEventListener("click", async () => {
                let dataId = btn.getAttribute('data-id');
                console.log(dataId); // Imprime el valor del atributo data-id del botón actual
                let dato = await obtenerPedidosPorID(dataId)
                console.log(dato.data());

                document.getElementById('ticketCliente').textContent = dato.data().cliente;
                document.getElementById('ticketTelefono').textContent = dato.data().telefono;
                document.getElementById('ticketDireccion').textContent = dato.data().direccion;
                document.getElementById('ticketMenu').textContent = dato.data().pedido;
                document.getElementById('ticketCostoMenu').textContent = dato.data().menuCosto;
                document.getElementById('ticketTotal').textContent = dato.data().total;

                window.print();
            });
        });





        // mostrar cliente registrdos
        clientesDB((querySnapshot) => {
            let tBodyCliente = document.getElementById('datalistOptions')
            let datos = ''
            let clientes = []

            querySnapshot.forEach((doc) => {
                let cliente = doc.data()
                clientes.push({ ...cliente, id: doc.id });
            });

            clientes.sort((a, b) => a.nombre.localeCompare(b.nombre));

            clientes.forEach((cliente) => {
                datos += `
            <option value="${cliente.nombre} ${cliente.telefono}" data-id="${cliente.id}">
            `
            })
            tBodyCliente.innerHTML = datos;
        })

        // mostrar menus
        areaDB((querySnapshot) => {
            let datos = ''
            let menus = []

            querySnapshot.forEach((doc) => {
                let menu = doc.data()
                menus.push({ ...menu, id: doc.id });
            });


            menus.forEach((menu) => {
                datos += `
            <option value="${menu.area}">${menu.area}</option>
            `
            })
            selectMenu.innerHTML = datos;
        })
    })




    // FUNCION PARA REGISTRAR PEDIDO Y GENERAR TICKET
    let btnRegistrarPedido = document.getElementById('btnRegistrarPedido')
    btnRegistrarPedido.addEventListener('click', async () => {
        let inputCliente = document.getElementById('exampleDataList');
        let valorCliente = inputCliente.value;

        // Buscar el data-id.
        let datalist = document.getElementById('datalistOptions');
        let opciones = datalist.querySelectorAll('option');
        let dataIdEncontrado = null;

        opciones.forEach(opcion => {
            if (opcion.value === valorCliente) {
                dataIdEncontrado = opcion.getAttribute('data-id');
                console.log(dataIdEncontrado);
            }
        });


        //obtenemos los datos del cliente
        let datoCliente = await obtenerClientePorId(dataIdEncontrado)
        let cliente = datoCliente.data().nombre
        let telefono = datoCliente.data().telefono

        let area = document.getElementById('selectMenu').value
        let solicitud = document.getElementById('inputSolicitud').value

        console.log(cliente, telefono, area, solicitud);
        registrarAsistencias(cliente, telefono, area, solicitud);

        let modalElement = document.getElementById('modalTicket');
        let modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();

    })


})