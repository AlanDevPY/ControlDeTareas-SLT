import {
    registrarCliente,
    registrarArea,
    clientesDB,
    areaDB
    } from "./firebase.js";
  
// VARIABLES
let btnRegistrarCliente = document.getElementById("btnRegistrarCliente")
let btnRegistrarArea = document.getElementById("btnRegistrarArea")
let inputNombre = document.getElementById('inputNombre')
let inputTelefono = document.getElementById('inputTelefono')
let inputArea = document.getElementById('inputArea')


// EVENTOS


// EVENTO DE REGISTRAR NUEVO CLIENTE
btnRegistrarCliente.addEventListener('click', () =>{
    let nombre = inputNombre.value;
    let telefono = inputTelefono.value;

    if(nombre === '' || telefono === ''){
       console.log('Favor completar los campos');
    }else{
        registrarCliente(nombre,telefono)
        inputNombre.value = ''
        inputTelefono.value = ''
    }
})


// EVENTO DE REGISTRAR NUEVA AREA

btnRegistrarArea.addEventListener('click', () =>{
    let area = inputArea.value
    if(area === ''){
        console.log('Favor completar los campos');
    }else{
        registrarArea(area)
        inputArea.value = ''
    }
})

// ENVENTO DE MOSTRAR CLIENTES

window.addEventListener('DOMContentLoaded', async () => {
    
    let tBodyCliente = document.getElementById('tBodyCliente')
    let contador = 1

    clientesDB((querySnapshot) => {
        let tr = ''
        let clientes = []

        
        querySnapshot.forEach((doc) => {
            let cliente = doc.data()
            clientes.push({...cliente, id: doc.id});
        });
        
        clientes.sort((a, b) => a.nombre.localeCompare(b.nombre));

        clientes.forEach((cliente) =>{
            tr +=`
            <tr>
            <td>${contador++}</td>
            <td>${cliente.nombre}</td>
            <td>${cliente.telefono}</td>
        </tr>
            `
        })


        tBodyCliente.innerHTML = tr;
    })
  })

  window.addEventListener('DOMContentLoaded', async () => {
    
    let tBodyArea = document.getElementById('tBodyArea')
    let contador = 1

    areaDB((querySnapshot) => {
        let tr = ''
        let areas = []

        querySnapshot.forEach((doc) => {
            let area = doc.data()
            areas.push({...area, id: doc.id});
        });

        areas.sort((a, b) => a.area.localeCompare(b.area));
        areas.forEach((area) =>{
            tr +=`
            <tr>
            <td>${contador++}</td>
            <td>${area.area}</td>
        </tr>
            `
        })


        tBodyArea.innerHTML = tr;
    })
  })
