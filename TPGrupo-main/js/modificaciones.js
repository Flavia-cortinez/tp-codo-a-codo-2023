const URL = "https://dumdev89.pythonanywhere.com/"

const app = Vue.createApp({
    data() {
        return {
            codigo: '',
            titulo: '',
            duracion: '',
            anio: '',
            director: '',
            imagen_url: '',
            imagenUrlTemp: null,
            mostrarDatosPelicula: false,
        };
    },

    methods: {
        obtenerPelicula() {
            fetch(URL + 'peliculas/' + this.codigo)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        throw new Error('Error al obtener los datos de la película.')
                    }
                })
                .then(data => {
                        this.titulo = data.titulo;
                        this.duracion = data.duracion;
                        this.anio = data.anio;
                        this.director = data.director;
                        this.imagen_url = data.imagen_url;
                        this.mostrarDatosPelicula = true;
                })
                .catch(error => {
                    console.log(error);
                    alert('Código no encontrado.');
                })
        },

        seleccionarImagen(event) {
            const file = event.target.files[0];
            this.imagenSeleccionada = file;
            this.imagenUrlTemp = URL.createObjectURL(file); // Crea una URL temporal para la vista previa },

        },

        guardarCambios() {
            const formData = new FormData();
            formData.append('codigo', this.codigo);
            formData.append('titulo', this.titulo);
            formData.append('duracion', this.duracion);
            formData.append('director', this.director);
            formData.append('anio', this.anio);

            if (this.imagenSeleccionada) {
                formData.append('imagen',
                    this.imagenSeleccionada,
                    this.imagenSeleccionada.name);
            }

            fetch(URL + 'peliculas/' + this.codigo, {
                method: 'PUT',
                body: formData,
            })

            .then(response => {


                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('Error al guardar los cambios de la película.')
                    }
            })

            .then(data => {
                alert('Película actualizada correctamente.');
                this.limpiarFormulario();
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error al actualizar la película.');
            });
        },
        limpiarFormulario() {
            this.codigo = '';
            this.titulo = '';
            this.duracion = '';
            this.anio = '';
            this.imagen_url = '';
            this.imagenSeleccionada = null;
            this.imagenUrlTemp = null;
            this.mostrarDatosPelicula = false;
        }
    }
});

app.mount('#app');