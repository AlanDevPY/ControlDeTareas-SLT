// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, deleteDoc, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAE3gYKTLHY2DKYr9O7tlqHuRMwgr4ksAI",
  authDomain: "controldetareas---latrinidad.firebaseapp.com",
  projectId: "controldetareas---latrinidad",
  storageBucket: "controldetareas---latrinidad.appspot.com",
  messagingSenderId: "306822255768",
  appId: "1:306822255768:web:18005c270dca0c888caced",
  measurementId: "G-6637YCDJ7S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Recommended to pass `app`

//----------------------------------------------------------------------------------------------------------------//
export const pedidosDB = (callback) => onSnapshot(collection(db, 'pedidos'), callback) //mostrar clientes
export const borrarPedido = (id) => deleteDoc(doc(db,'pedidos',id)); // eliminar pedidos cargados
//-----------------------------------------------------------------------------------------------------------------//

export const clientesDB = (callback) => onSnapshot(collection(db, 'cliente'), callback) //mostrar clientes
export const areaDB = (callback) => onSnapshot(collection(db,'area'),callback) //mostrar Menus
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