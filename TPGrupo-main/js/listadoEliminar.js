const URL = "https://dumdev89.pythonanywhere.com/"
const app = Vue.createApp({
    data() {
        return {
            peliculas: []
        }
    },
    methods: {
        obtenerPeliculas() {

            // Obtenemos el contenido del inventario
            fetch(URL + 'peliculas')
                .then(response => {

                    // Parseamos la respuesta JSON
                    if (response.ok) {
                        return response.json();
                    }
                })
                .then(data => {

                    // El código Vue itera este elemento para generar la tabla
                    this.peliculas = data;
                })
                .catch(error => {
                    console.log('Error:', error);
                    alert('Error al obtener las películas.');
                });
        },
        eliminarPelicula(codigo) {
            if (confirm('¿Estás seguro de que quieres eliminar esta película?')) {
                fetch(URL + `peliculas/${codigo}`, {
                    method: 'DELETE'
                })
                    .then(response => {
                        if (response.ok) {
                            this.peliculas =
                                this.peliculas.filter(pelicula => pelicula.codigo !== codigo);
                            alert('Película eliminada correctamente.');
                        }
                    })
                    .catch(error => {
                        alert(error.message);
                    });
            }
        }
    }, mounted() {

        //Al cargar la página, obtenemos la lista de peliculas
        this.obtenerPeliculas();
    }
});
app.mount('body');