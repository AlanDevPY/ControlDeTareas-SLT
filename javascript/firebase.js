
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
  import { getFirestore, collection, addDoc, onSnapshot, deleteDoc, getDocs, doc } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAE3gYKTLHY2DKYr9O7tlqHuRMwgr4ksAI",
    authDomain: "controldetareas---latrinidad.firebaseapp.com",
    projectId: "controldetareas---latrinidad",
    storageBucket: "controldetareas---latrinidad.appspot.com",
    messagingSenderId: "306822255768",
    appId: "1:306822255768:web:18005c270dca0c888caced"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
//   const analytics = getAnalytics(app);
const db = getFirestore();

export const registrarAsistencia = (ticket,solicitud, area, nombre, telefono, descripcion) => {
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

    
    
    addDoc(collection(db,"ticketAsistencia"),{
      solicitud,
      area,
      nombre,
      telefono,
      descripcion,
      fecha,
      ticket
    });

    console.log("Asistencia Registrada");
  }
  catch {
    console.error('Error al registrar asistencia', error)
  }
}

export const asistenciaTermianda = (ticket,solicitud, area, nombre, descripcion) => {
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

    
    
    addDoc(collection(db,"asistenciaterminada"),{
      solicitud,
      area,
      nombre,
      descripcion,
      fecha,
      ticket
    });

    console.log("Asitencia Terminadado Registrado con exito");
  }
  catch {
    console.error('Error al registrar asistencia', error)
  }
}

export const registrarCliente = (nombre, telefono) => {
  try {
    addDoc(collection(db,"cliente"),{
      nombre,
      telefono
    });

    console.log("Cliente Registrado");
  }
  catch {
    console.error('Error al registrar cliente', error)
  }
}

export const registrarArea = (area) => {
  try {
    addDoc(collection(db,"area"),{
      area
    });

    console.log("Area Registrado");
  }
  catch {
    console.error('Error al registrar Area', error)
  }
}

export const asistenciasBD = (callback) => onSnapshot(collection(db,'ticketAsistencia'),callback)
export const asistenciasTerminadoBD = (callback) => onSnapshot(collection(db,'asistenciaterminada'),callback)
export const clientesDB = (callback) => onSnapshot(collection(db,'cliente'),callback)
export const areaDB = (callback) => onSnapshot(collection(db,'area'),callback)


export const borrarAsistencia = (id) => deleteDoc(doc(db,'ticketAsistencia',id));
// export const obtenerDatos = () => getDocs(collection(db, 'cliente'))