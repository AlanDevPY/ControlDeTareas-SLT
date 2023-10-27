import {
    asistenciasBD,
    borrarAsistencia
  } from "./firebase.js";

  window.addEventListener('DOMContentLoaded', async () => {

    let card = document.getElementById('card')

    asistenciasBD((querySnapshot) => {
        let html = ''
        let asistencias = []

        querySnapshot.forEach((doc) => {
            let asistencia = doc.data()
            asistencias.push({...asistencia, id: doc.id});
        });


        asistencias.sort((a, b)  => b.fecha.localeCompare(a.fecha));


        asistencias.forEach((asistencia) =>{
            html +=`
            <div class="col">
            <div class="card">
                <div class="card-body p-4">
                    <p class="text-primary card-text mb-0">${asistencia.fecha} | N° de Ticket #${asistencia.ticket}</p>
                    <h4 class="card-title">${asistencia.solicitud}</h4>
                    <p class="card-text">${asistencia.descripcion}</p>
                    <div class="d-flex align-items-xl-center"><svg xmlns="http://www.w3.org/2000/svg" viewBox="-32 0 512 512" width="1em" height="1em" fill="currentColor" style="font-size: 30px;margin-right: 20px;">
                            <!--! Font Awesome Free 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. -->
                            <path d="M272 304h-96C78.8 304 0 382.8 0 480c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32C448 382.8 369.2 304 272 304zM48.99 464C56.89 400.9 110.8 352 176 352h96c65.16 0 119.1 48.95 127 112H48.99zM224 256c70.69 0 128-57.31 128-128c0-70.69-57.31-128-128-128S96 57.31 96 128C96 198.7 153.3 256 224 256zM224 48c44.11 0 80 35.89 80 80c0 44.11-35.89 80-80 80S144 172.1 144 128C144 83.89 179.9 48 224 48z"></path>
                        </svg>
                        <div>
                            <p class="fw-bold mb-0">${asistencia.nombre}</p>
                            <p class="text-muted mb-0">${asistencia.telefono}</p>
                            <p class="text-muted mb-0">${asistencia.area}</p>
                        </div>
                    </div>
                    <button class="btn btn-secondary" data-id="${asistencia.id}" type="button" style="width: 100%;margin-top: 20px;">Terminado</button>
                </div>
            </div>
        </div>
            `
        })




        card.innerHTML = html;

        const btnDelet = card.querySelectorAll(".btn");
        // Agregar un evento de clic a cada botón de borrado
        btnDelet.forEach((btn) => {
            btn.addEventListener("click", (event) => {
                // Llamar a la función deletTask con el ID de la tarea asociado al botón
                borrarAsistencia(event.target.dataset.id);
            });
        });
    })
  })