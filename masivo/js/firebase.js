
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
  import { getFirestore, collection, addDoc, onSnapshot, deleteDoc, getDocs, doc } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";

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
;

//   const analytics = getAnalytics(app);
  const db = getFirestore();

  export const registrarClientes = (nombre, apellido, telefono, direccion, referencia) => {
    try {
      addDoc(collection(db,"clientes"),{
        nombre,
        apellido,
        telefono,
        direccion,
        referencia
      });
    }
    catch {
      console.error('Error al agregar cliente', error)
    }
  }

  export const obtenerClientes = (callback) => onSnapshot(collection(db,'clientes'),callback)
  export const borrarCliente = (id) => deleteDoc(doc(db,'clientes',id));
  export const obtenerDatos = () => getDocs(collection(db, 'clientes'))


