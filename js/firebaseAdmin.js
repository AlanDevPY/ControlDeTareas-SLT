// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, collection, addDoc, onSnapshot, deleteDoc, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Your web app's Firebase configuration
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
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app); // Recommended to pass `app`

  // apartado registrar cliente
  export const registrarCliente = async (nombre, apellido, telefono, direccion, referencia) => {
    try {
        await addDoc(collection(db, "clientes"), {
            nombre, apellido, telefono, direccion, referencia
        });
        console.log("Cliente Registrado con Éxito");
    } catch (error) {
        console.error('Cliente no registrado', error);
    }
}


  export const clientesDB = (callback) => onSnapshot(collection(db,'clientes'),callback) //mostrar clientes
  export const borrarCliente = (id) => deleteDoc(doc(db,'clientes',id)); // eliminar cliente cargados

// apartado registrar menu
  export const registrarMenu = async (menu, costo) => {
    try {
        await addDoc(collection(db, "menu"), {
            menu, costo
        });
        console.log("Menu Registrado con Éxito");
    } catch (error) {
        console.error('Menu no registrado', error);
    }
}

export const menuDB = (callback) => onSnapshot(collection(db,'menu'),callback) //mostrar clientes
export const borrarMenu = (id) => deleteDoc(doc(db,'menu',id)); // eliminar cliente cargados

// apartado registrar delivery
export const registrarDelivery = async (delivery, telefono) => {
    try {
        await addDoc(collection(db, "delivery"), {
            delivery, telefono
        });
        console.log("delivery Registrado con Éxito");
    } catch (error) {
        console.error('delivery no registrado', error);
    }
}
export const deliveryDB = (callback) => onSnapshot(collection(db,'delivery'),callback) //mostrar clientes
export const borarDelivery = (id) => deleteDoc(doc(db,'delivery',id)); // eliminar cliente cargados


// Función para obtener un cliente por ID
export const obtenerClientePorId = (id) => getDoc(doc(db,'clientes', id))


// apartado registrar pedidos
export const registrarPedido = async (cliente, menu, delivery, costo) => {
    try {
        await addDoc(collection(db, "pedidos"), {
            cliente, menu, delivery, costo
        });
        console.log("pedido Registrado con Éxito");
    } catch (error) {
        console.error('pedido no registrado', error);
    }
}

export const pedidosDB = (callback) => onSnapshot(collection(db,'pedidos'),callback) //mostrar clientes
export const borrarPedido = (id) => deleteDoc(doc(db,'pedidos',id)); // eliminar cliente cargados


// COMPROBAR SI HAY USUARIO REGISTRADO

// onAuthStateChanged(auth, (user) => {
//     if (user) {
//       // Si `user` no es null, significa que hay un usuario autenticado.
//       // Puedes acceder a propiedades del usuario como sigue:
//       console.log("UID del usuario:", user.uid);
//       console.log("Correo electrónico del usuario:", user.email);
//       // ... y cualquier otra propiedad del objeto user que necesites.
//     } else {
//       // Si `user` es null, significa que no hay un usuario autenticado.
//       console.log('usuario no registrado');
//       window.location.href = '../index.html';
//     }
//   });


//   FUNCION PARA ACTUALIZAR DATOS

export const actualizarDato = (id, newFields) => updateDoc ( doc(db, 'clientes', id), newFields)
