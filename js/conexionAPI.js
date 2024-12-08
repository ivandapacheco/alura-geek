
const url = 'http://localhost:3005/jugadores'; 

async function obtenerJugadores() {
    try {
        // Hacemos la solicitud GET
        const respuesta = await fetch(url);

        // Verificamos si la respuesta fue exitosa (status 200)
        if (!respuesta.ok) {
            throw new Error('Error en la conexión');
        }

        // Parseamos la respuesta como JSON
        const jugadores = await respuesta.json();

        // Aquí puedes hacer lo que quieras con los datos, como mostrarlos en la consola
        console.log(jugadores);

        return jugadores;
    } catch (error) {
        console.error('Error al obtener los jugadores:', error);
    }
}



async function crearJugador(nuevoJugador) {

    console.log("entro a crearJugador... ConexionAPI")
    try {
        // Enviamos los datos del nuevo jugador al servidor con una solicitud POST
        const respuesta = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Indicamos que los datos serán en formato JSON
            },
            body: JSON.stringify(nuevoJugador), // Convertimos el objeto jugador a formato JSON
        });

        // Verificamos si la respuesta fue exitosa
        if (!respuesta.ok) {
            throw new Error('Error al crear el jugador');
        }

        // Si fue exitoso, parseamos la respuesta JSON
        const jugadorCreado = await respuesta.json();

        // Aquí puedes hacer lo que quieras con el jugador creado, como mostrar un mensaje en consola
        console.log('Jugador creado:', jugadorCreado);
        
       

        return jugadorCreado;
    } catch (error) {
        console.error('Error al crear el jugador:', error);
    }
}


// Funcin para eliminar
const eliminarJugador = async (id) => {
    try {
      await fetch(`${url}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(`Producto con id ${id} eliminado exitosamente`);
    } catch (error) {
      console.error("Error en la solicitud DELETE:", error);
    }
  };


export const conexionAPI = {
    obtenerJugadores,
    crearJugador,
    eliminarJugador
}