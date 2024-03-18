const URL = "https://dumdev89.pythonanywhere.com/"
//Acá iría la URL de Pythonanywhere

// Capturamos el evento de envío del formulario
document.getElementById('formulario').addEventListener('submit', function (event) {
    event.preventDefault(); // Evitamos que se recargue la página web al enviar el formulario

    var formData = new FormData(); // Creación del objeto FormData, con pares 'clave':valor, similares a un diccionario en otro lenguaje
    formData.append('codigo', document.getElementById('codigo').value);
    formData.append('titulo', document.getElementById('titulo').value);
    formData.append('duracion', document.getElementById('duracion').value);
    formData.append('anio', document.getElementById('anio').value);
    formData.append('imagen', document.getElementById('imagenPelicula').files[0]);
    formData.append('director', document.getElementById('directorPelicula').value);

    // Realizamos la solicitud POST al servidor
    fetch(URL + 'peliculas', {
        method: 'POST', // Método que se usa para enviar y crear nuevos datos en el servidor
        body: formData // Aquí enviamos formData en lugar de JSON porque el formulario puede contener archivos
    })

    //Después de realizar la solicitud POST, se utiliza el método then() para manejar la respuesta del servidor.
    .then(function (response) {
        if (response.ok) {
            return response.json();
        } else {
            // Si hubo un error, lanzar explícitamente una excepción para ser "catcheada" más adelante
            throw new Error('Error al agregar el pelicula.');
        }
    })

    // Respuesta OK
    .then(function () {
        // En caso de éxito
        alert('Película agregada correctamente.');
    })
    .catch(function (error) {
        // En caso de error
        alert('Error al agregar el película.');
        console.error('Error:', error);
    })
    .finally(function () {
        // Limpiar el formulario en ambos casos (éxito o error)
        document.getElementById('codigo').value = "";
        document.getElementById('titulo').value = "";
        document.getElementById('duracion').value = "";
        document.getElementById('anio').value = "";
        document.getElementById('imagenPelicula').value = "";
        document.getElementById('directorPelicula').value = "";
    });
})