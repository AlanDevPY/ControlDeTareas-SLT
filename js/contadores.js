
import { deliveryDB, pedidosDB } from "./firebase.js";

window.addEventListener('DOMContentLoaded', async () => {

    //Mostar pedidos registrados
    pedidosDB((querySnapshot) => {
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

        // console.log("Pedidos filtrados:", pedidosFiltrados);
        // Suponiendo que 'datos' es el array que contiene los objetos como el que proporcionaste

        // FILTRADO PARA SABER CUANTOS MENUS SE PIDEN
        // FILTRADO DE MENU TRADICIONAL
        const menuTraducional = pedidosFiltrados.filter(dato => dato.pedido.toLowerCase().includes('tradicional'));
        let cantidadTradicional = menuTraducional.length
        document.getElementById('contadorTradicional').innerHTML = cantidadTradicional


        // FILTRADO DE MENU SALUDABLE
        const menuSaludable = pedidosFiltrados.filter(dato => dato.pedido.toLowerCase().includes('saludable'));
        let cantidadSaludable = menuSaludable.length
        document.getElementById('contadorSaludable').innerHTML = cantidadSaludable

        // FILTRADO DE MENU BC
        const menuBC = pedidosFiltrados.filter(dato => dato.pedido.toLowerCase().includes('bajo en carbohidratos'));
        let cantidadBC = menuBC.length
        document.getElementById('contadorBC').innerHTML = cantidadBC

        // FILTRADO DE MENU ESPECIAL
        const menuEspecial = pedidosFiltrados.filter(dato => dato.pedido.toLowerCase().includes('especial'));
        let cantidadEspecial = menuEspecial.length
        document.getElementById('contadorEspecial').innerHTML = cantidadEspecial



    



    })
})