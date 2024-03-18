const formulario = document.getElementById("tarjetaregistro");

formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const fechaNacimiento = new Date(document.getElementById("fechanac").value);
    const respuesta = document.getElementById("respuesta");
    const datosError = document.getElementById("datos-error");

    // Calcular la edad
    const hoy = new Date();
    const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();

    if (hoy.getMonth() < fechaNacimiento.getMonth() || (hoy.getMonth() === fechaNacimiento.getMonth() && hoy.getDate() < fechaNacimiento.getDate())) {edad--;
    }

    // Si tiene 18 años SI y si no no puede
    if (edad >= 18) {
        datosError.textContent = "";
        respuesta.textContent = `Bienvenido/a ${nombre} ${apellido}. Gracias por registrarte.`;
        formulario.reset();
    } else {
        respuesta.textContent = "";
        datosError.textContent = "Eres menor de 18 años, no puedes registrarte.";
    }
});