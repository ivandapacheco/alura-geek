import { conexionAPI } from "./conexionAPI.js";


const listJugadores = document.querySelector("[data-jugadores]");

export default function crearCardJugador(jugador) {
    // Crear un nuevo div para la tarjeta
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("col-lg-3", "col-md-4", "col-sm-6", "col-12");

    // Agregar el contenido HTML de la tarjeta
    tarjeta.innerHTML = `
        <div class="card jugador-card mb-4 text-white shadow-sm">
            <img src="${jugador.imagen}" class="card-img-top jugador-img" alt="Imagen del Jugador">
            <div class="card-body jugador-info">
                <h5 class="card-title text-center text-white mb-1">${jugador.nombre} <span class="fw-bold">${jugador.apellido}</span> </h5>
                <p class="card-text text-center text-light mb-3">${jugador.posicion}</p>
                <div class="text-center">
                    <span class="badge bg-warning text-dark">Valor de Mercado: €${jugador.valorMercado}</span>
                </div>
            </div>

            <!-- Contenedor de botones (oculto por defecto) -->
            <div class="card-buttons position-absolute top-50 start-50 translate-middle rounded p-4">
                <div class="row gap-3 p-0 m-0">
                    <!-- Botón de Editar -->
                    <div class="btn col-12 d-flex align-items-center p-2 edit-button">
                        <i class="fa-solid fa-pen-to-square fs-4 me-2 text-success"></i>
                        <span class="text-light fw-bold">Editar</span>
                    </div>

                    <!-- Botón de Eliminar -->
                    <div class="btn delete-button col-12 d-flex align-items-center p-2" data-id="${jugador.id}">
                        <i class="fa-solid fa-trash-can fs-4 me-2 text-danger"></i>
                        <span class="text-light fw-bold">Eliminar</span>
                    </div>
                </div>
            </div>
        </div>
    `;

    addDeleteEvent(tarjeta, jugador);
    addEditEvent(tarjeta, jugador);
    return tarjeta;
}


function addDeleteEvent(tarjeta, jugador) {
    const deleteButton = tarjeta.querySelector(".delete-button");
    deleteButton.addEventListener("click", async () => {
        const confirmDelete = confirm(`¿Estás seguro de que deseas eliminar a ${jugador.nombre} ${jugador.apellido} ?`);
        if (!confirmDelete) return; // Si el usuario cancela, no se ejecuta nada más

        try {
            await conexionAPI.eliminarJugador(jugador.id);
            alert(`El jugador ya no es parte del equipo`);
        } catch (error) {
            console.error(`Error al eliminar el jugador con id ${id}:`, error);
        }
    });
}

function addEditEvent(tarjeta, jugador){
    // Agregar el evento al botón de edición
    const editButton = tarjeta.querySelector(".edit-button");
    editButton.addEventListener("click", () => {
        alert("Pronto se podrá editar al jugador");
    });
}

async function listarJugadores() {
    const jugadores = await conexionAPI.obtenerJugadores();

    jugadores.forEach(jugador => listJugadores.appendChild(crearCardJugador(jugador)));
    
}

listarJugadores()