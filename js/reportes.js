
import { deliveryDB, pedidosDB } from "./firebase.js";

let btnFiltarDelivery = document.getElementById('btnFiltarDelivery')


btnFiltarDelivery.addEventListener('click', async () => {
    let selectDelivery = document.getElementById('selectDelivery')
    let delivery = selectDelivery.value

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
        // console.log(fechaHoy);
        const pedidosFiltrados = pedidos.filter(pedido => {
            // Convertimos la fecha del pedido al formato "DD-MM-YYYY"
            const fechaPedidoParts = pedido.fecha.split('/');
            const fechaPedido = `${fechaPedidoParts[0].padStart(2, '0')}-${fechaPedidoParts[1].padStart(2, '0')}-${fechaPedidoParts[2]}`;
            // console.log(`Comparando fechaPedido: ${fechaPedido} con fechaHoy: ${fechaHoy}`);
            return fechaPedido === fechaHoy;
        });

        console.log("Pedidos filtrados:", pedidosFiltrados);
        // Suponiendo que 'datos' es el array que contiene los objetos como el que proporcionaste
        const datosFiltrados = pedidosFiltrados.filter(dato => dato.delivery === delivery);
        console.log(datosFiltrados);



        datosFiltrados.forEach((pedido) => {
            datos += `  
            <tr>
            <th>${contador++}</th>
            <th>${pedido.fecha}</th>
            <td>${pedido.cliente}</td>
            <td>${pedido.pedido}</td>
            <td>${pedido.delivery}</td>
            <td>${pedido.total}</td>
          </tr>
            
                `
        })
        tBody.innerHTML = datos;

    })

    deliveryDB((querySnapshot) => {
        let tBody = document.getElementById('selectDelivery')
        let datos = ''
        let deliverys = []

        querySnapshot.forEach((doc) => {
            let delivery = doc.data()
            deliverys.push({ ...delivery, id: doc.id });
        });

        deliverys.forEach((delivery) => {
            datos += `
        <option value="${delivery.delivery}">${delivery.delivery}</option>
        `
        })
        tBody.innerHTML = datos;
    })
})