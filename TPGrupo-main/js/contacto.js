function mostrarMensaje() {
    // Formulario y mensaje de Gracias (variables)
    var formulario = document.getElementById("form-consultas");
    var mensGracias = document.getElementById("mensGracias");

    // Se verifica si el formulario es válido
    if (formulario.checkValidity()) {
        
        // Oculta el formulario y muestra el mensaje
        formulario.style.display = "none";

        // Mensaje de Gracias por su contacto
        mensGracias.style.display = "block";
    } else {
        // Mensaje de completar formulario
        alert("Por favor, completa todos los campos obligatorios.");
    }
}

