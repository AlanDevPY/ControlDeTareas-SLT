import {
asistenciasTerminadoBD
  } from "./firebase.js";

  window.addEventListener('DOMContentLoaded', async () => {
    
    let tBody = document.getElementById('tBody')
    
    asistenciasTerminadoBD((querySnapshot) => {
        let tr = ''
        let asistencias = []
        
        console.log(asistencias);
        
        querySnapshot.forEach((doc) => {
            let asistencia = doc.data()
            asistencias.push({...asistencia, id: doc.id});
        });
        
        asistencias.sort((a, b) => a.ticket.localeCompare(b.ticket));
        let contador = 1
        
        asistencias.forEach((asistencia) =>{
            tr +=`
            <tr>
            <td>${contador++}</td>
            <td>${asistencia.ticket}</td>
            <td>${asistencia.nombre}</td>
            <td>${asistencia.solicitud} | ${asistencia.descripcion}</td>
            <td>${asistencia.area}</td>
            <td>${asistencia.fecha}</td>
        </tr>
            `
        })


        tBody.innerHTML = tr;
    })
  })