import { conexionAPI } from "./conexionAPI.js";

    const modal = new bootstrap.Modal(document.getElementById("modal-register"));
    const form = document.querySelector("form");

    const campos = [
        { input: document.getElementById("nombre"), error: "El nombre es obligatorio *" },
        { input: document.getElementById("apellido"), error: "El apellido es obligatorio *" },
        { input: document.getElementById("posicion"), error: "La posición es obligatoria *" },
        { input: document.getElementById("imagen"), error: "La URL de la imagen es obligatoria *" },
        { input: document.getElementById("valorMercado"), error: "El valor de mercado es obligatorio *" }
    ];

    function esFormularioValido() {
        let esValido = true;
        campos.forEach(({ input, error }) => {
            const errorMessage = input.nextElementSibling;
            if (input.value.trim() === "") {
                errorMessage.textContent = error;
                esValido = false;
            } else {
                errorMessage.textContent = "";
            }
        });
        return esValido;
    }

    async function datosAEnviar(e) {
        e.preventDefault();
        const nombre = document.getElementById("nombre").value.trim();
        const apellido = document.getElementById("apellido").value.trim();
        const posicion = document.getElementById("posicion").value.trim();
        const imagen = document.getElementById("imagen").value.trim();
        const valorMercado = parseInt(document.getElementById("valorMercado").value.trim());

        return {
            nombre: nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase(),
            apellido: apellido.charAt(0).toUpperCase() + apellido.slice(1).toLowerCase(),
            posicion,
            imagen,
            valorMercado,
        };
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault()
        if (!esFormularioValido()) return;
        const nuevoJugador = await datosAEnviar(e);
        await conexionAPI.crearJugador(nuevoJugador);
        alert(`Bienvenido a la familia Culé  ${nuevoJugador.nombre}`)
        
        // try {
        //     form.reset();
        //     campos.forEach(({ input }) => {
        //         input.nextElementSibling.textContent = "";
        //     });
        //     modal.hide();
        // } catch (error) {
        //     Swal.fire({
        //         icon: 'error',
        //         title: 'Oops! Ocurrió un error',
        //         text: 'Hubo un problema al procesar los datos. Intenta nuevamente.',
        //         timer: 5000,
        //         confirmButtonText: 'Aceptar'
        //     });

        //     console.log(error)
        // } 
    });
