
import { clientesDB, menuDB, deliveryDB, registrarPedido, obtenerClientePorId, pedidosDB, borrarPedido, obtenerPedidosPorID } from "./firebase.js";

window.addEventListener('DOMContentLoaded', async () => {

    //Mostar pedidos registrados
    pedidosDB((querySnapshot) => {
        let tBody = document.getElementById('tBody')
        let datos = ''
        let pedidos = []

        querySnapshot.forEach((doc) => {
            let pedido = doc.data()
            pedidos.push({ ...pedido, id: doc.id });
        });

        let contador = 1



        pedidos.sort((b, a) => {
            return new Date(a.fecha) - new Date(b.fecha);
        });

        const hoy = new Date();
        const año = hoy.getFullYear();
        let mes = hoy.getMonth() + 1; // Sumamos 1 porque los meses van de 0 a 11
        let dia = hoy.getDate();

        // Formateamos el día y mes con dos dígitos si son menores a 10
        if (mes < 10) {
            mes = '0' + mes;
        }
        if (dia < 10) {
            dia = '0' + dia;
        }

        const fechaHoy = `${dia}-${mes}-${año}`;
        console.log(fechaHoy);
        const pedidosFiltrados = pedidos.filter(pedido => {
            // Convertimos la fecha del pedido al formato "DD-MM-YYYY"
            const fechaPedidoParts = pedido.fecha.split('/');
            const fechaPedido = `${fechaPedidoParts[0].padStart(2, '0')}-${fechaPedidoParts[1].padStart(2, '0')}-${fechaPedidoParts[2]}`;
            // console.log(`Comparando fechaPedido: ${fechaPedido} con fechaHoy: ${fechaHoy}`);
            return fechaPedido === fechaHoy;
        });
        
        console.log("Pedidos filtrados:", pedidosFiltrados);
        
        
        
        

        


        pedidosFiltrados.forEach((pedido) => {
            datos += `  
            <tr>
            <th>${contador++}</th>
            <th>${pedido.fecha}</th>
            <td>${pedido.cliente}</td>
            <td>${pedido.pedido}</td>
            <td>${pedido.menuCantidad}</td>
            <td>${pedido.delivery}</td>
            <td>${pedido.total}</td>
            <td>
            <button type="button" data-id="${pedido.id}" class="btn btn-outline-success print ">Imprimir</button>
                <button type="button" data-id="${pedido.id}" class="btn btn-outline-danger delete ">Eliminar</button>
            </td>
          </tr>
            
                `
        })
        tBody.innerHTML = datos;

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
            <option value="${cliente.nombre} ${cliente.apellido}" data-id="${cliente.id}">
            `
            })
            tBodyCliente.innerHTML = datos;
        })

        // mostrar menus
        menuDB((querySnapshot) => {
            let datos = ''
            let menus = []

            querySnapshot.forEach((doc) => {
                let menu = doc.data()
                menus.push({ ...menu, id: doc.id });
            });


            menus.forEach((menu) => {
                datos += `
            <option data-nombre="${menu.menu}" value="${menu.costo}">${menu.menu}</option>
            `
            })
            selectMenu.innerHTML = datos;
        })

        // mostrar delivery
        deliveryDB((querySnapshot) => {
            let datos = ''
            let deliverys = []

            querySnapshot.forEach((doc) => {
                let delivery = doc.data()
                deliverys.push({ ...delivery, id: doc.id });
            });


            deliverys.forEach((delviery) => {
                datos += `
                <option data-nombre="${delviery.delivery}" value="${delviery.delivery}">${delviery.delivery}</option>
                `
            })
            selectDelivery.innerHTML = datos;
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
                // console.log(dataIdEncontrado);
            }
        });


        //obtenemos los datos del cliente
        let datoCliente = await obtenerClientePorId(dataIdEncontrado)
        let ClienteNombre = datoCliente.data().nombre
        let telefono = datoCliente.data().telefono
        let direccion = datoCliente.data().direccion
        let ClienteApellido = datoCliente.data().apellido
        let cliente = `${ClienteNombre} ${ClienteApellido}` // unimos nombr y apellido del cliente
        let delivery = document.getElementById('selectDelivery').value // Obtenemos el nombre del Delivery
        let pedido = parseFloat(document.getElementById('selectMenu').value); // Obtenemos el costo del menú como número
        let menuCosto = parseFloat(document.getElementById('selectMenu').value); // Obtenemos el costo del menú como número
        let cobrarDelivery = parseFloat(document.getElementById('cobrarDelivery').value); // Obtenemos el costo del Delivery como número
        let menuCantidad = document.getElementById('inputMenuCantidad').value
        let costoTotal = null
        // Verificamos si ambos valores son números válidos
        if (!isNaN(pedido) && !isNaN(cobrarDelivery)) {
            costoTotal = (pedido * menuCantidad) + cobrarDelivery;

            console.log('El costo total a cobrar es: ' + costoTotal);
        } else {
            // console.log('Uno o ambos valores no son números válidos.');
        }


        //forma de acceder el texto de un select
        let selectElement = document.getElementById('selectMenu');
        let selectedIndex = selectElement.selectedIndex;
        let selectedOption = selectElement.options[selectedIndex];
        let pedidoTexto = selectedOption.text;
        



        // console.log(cliente);
        // console.log(pedidoTexto);
        // console.log(delivery);
        // console.log(costoTotal);



        registrarPedido(cliente, telefono, direccion, menuCosto, pedidoTexto, menuCantidad, delivery, costoTotal)


        let modalElement = document.getElementById('modalTicket');
        let modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();


        setTimeout(() => {
            window.print()
        }, 1000)
        document.getElementById('ticketCliente').textContent = cliente
        document.getElementById('ticketTelefono').textContent = datoCliente.data().telefono
        document.getElementById('ticketDireccion').textContent = datoCliente.data().direccion
        document.getElementById('ticketMenu').textContent = pedidoTexto
        document.getElementById('ticketMenuCantidad').textContent = menuCantidad
        document.getElementById('ticketCostoMenu').textContent = pedido
        document.getElementById('ticketTotal').textContent = costoTotal;
        document.getElementById('ticketDelivery').textContent = delivery;
    })


})