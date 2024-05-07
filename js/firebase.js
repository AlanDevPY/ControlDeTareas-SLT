// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, deleteDoc, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC8CbSZ-KyANrRjhnQsn7q8-EvbXyNpWik",
    authDomain: "curcuma-fcec3.firebaseapp.com",
    projectId: "curcuma-fcec3",
    storageBucket: "curcuma-fcec3.appspot.com",
    messagingSenderId: "1004966811886",
    appId: "1:1004966811886:web:aa92a7d663e312260ebbff",
    measurementId: "G-QYWFWL6VT4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Recommended to pass `app`

//----------------------------------------------------------------------------------------------------------------//
export const pedidosDB = (callback) => onSnapshot(collection(db, 'pedidos'), callback) //mostrar clientes
export const borrarPedido = (id) => deleteDoc(doc(db,'pedidos',id)); // eliminar pedidos cargados
//-----------------------------------------------------------------------------------------------------------------//

export const clientesDB = (callback) => onSnapshot(collection(db, 'clientes'), callback) //mostrar clientes
export const menuDB = (callback) => onSnapshot(collection(db,'menu'),callback) //mostrar Menus
export const deliveryDB = (callback) => onSnapshot(collection(db,'delivery'),callback) //mostrar Delivery
export const obtenerClientePorId = (id) => getDoc(doc(db,'clientes', id)) // obtener datas del cliente por ID
export const obtenerPedidosPorID = (id) => getDoc(doc(db,'pedidos', id)) // obtener datas del cliente por ID


  // apartado registrar Delivery
// REGISTRAR ESTUDIO
export const registrarPedido = (cliente,telefono,direccion,menuCosto, pedido, menuCantidad, delivery, total) => {
    try {
  
      const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      };

      let fecha = new Date().toLocaleString("es-ES", options);
      addDoc(collection(db, "pedidos"), {
        fecha: fecha,
        cliente: cliente,
        pedido: pedido,
        menuCantidad : menuCantidad,
        menuCosto: menuCosto,
        telefono: telefono,
        direccion: direccion,
        delivery: delivery,
        total: total
      });
      console.log("Pedido Registrado");
    }
    catch (error) {
      console.error('Error al registrar pedido', error)
    }
  }

  export const registarCliente = (nombre, apellido, telefono, direccion) => {
    try {
  
      const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: false, // Usar formato de 24 horas
      };

      let fecha = new Date().toLocaleString("es-ES", options);
      addDoc(collection(db, "pedidos"), {
        fecha: fecha,
        cliente: cliente,
        pedido: pedido,
        delviery: delviery,
        total: total
      });
      console.log("Pedido Registrado");
    }
    catch (error) {
      console.error('Error al registrar pedido', error)
    }
  }