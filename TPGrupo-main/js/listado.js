const URL = "https://dumdev89.pythonanywhere.com/"

fetch(URL + 'peliculas') // Solicitud GET para obtener peliculas
    .then(function (response) {
        if (response.ok) {
            return response.json();
    } else {
            // Si hubo un error, lanzar explícitamente una excepción // para ser "catcheada" más adelante
            throw new Error('Error al obtener las peliculas.');
        }
    })

    .then(function (data) {
        let contenedorPeliculas = document.getElementById('contenedorPeliculas');

        // Iteramos sobre las peliculas y agregamos las cards
        for (let pelicula of data) {
            let card = document.createElement("div"); // Para cada pelicula crea un div nuevo dentro de la tabla
            //contenedor = borde negro
            card.innerHTML = `
            <div class="contenedor">
                    <div class="imagen"><img src=https://www.pythonanywhere.com/user/dumdev89/files/home/dumdev89/mysite/static/img/${pelicula.imagen_url} alt="imagen_para_mostrar"></div>
                    <div class="titulo"><h3>${pelicula.titulo}</h3></div>
                    <div class="grupo">
                        <div class="duracion">Duración: ${pelicula.duracion} m</div>
                        <div class="anio">${pelicula.anio}</div>
                </div>
            </div>`
            contenedorPeliculas.appendChild(card);
        }
    })
    .catch(function (error) {
        // En caso de error
        alert('Error al agregar la PELICULA.');
        console.error('Error:', error);
    })

    