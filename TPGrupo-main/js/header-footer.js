let footer = `

  <div class="cont-no-resp">
                <div class="cont-enl">
                    <h3>Enlaces</h3>
                    <ul class="li-enl">
                        <li><a href="index.html">Inicio</a></li>
                        <li><a href="nosotros.html">Acerca de</a></li>
                        <li><a href="registro.html">Registro</a></li>
                        <li><a href="contacto.html">Contacto</a></li>
                        <li><a href="menu.html">Menú</a></li>
                        <li><a href="Terminos.html">Terminos</a></li>
                    </ul>
                </div>
                <div class="cont-red">
                    <h3>Redes Sociales</h3>
                    <ul class="li-red">
                        <li><a href="#">Facebook</a></li>
                        <li><a href="#">Twitter</a></li>
                        <li><a href="#">LinkedIn</a></li>
                        <li><a href="#">Instagram</a></li>
                    </ul>
                </div>
                <div class="derechos-reservados">
                    <p>&copy; 2023 PELICULAS. Todos los derechos reservados.</p>
                </div>
</div>
<div class="cont-resp">
                <details id="resp-list">
                    <summary> Enlaces</summary>
                    <ul class="li-enl">
                        <li><a href="index.html">Inicio</a></li>
                        <li><a href="nosotros.html">Acerca de</a></li>
                        <li><a href="registro.html">Registro</a></li>
                        <li><a href="contacto.html">Contacto</a></li>
                        <li><a href="menu.html">Menú</a></li>
                    </ul>
                </details>
                <details id="resp-list">
                    <summary> Redes Sociales</summary>
                    <ul class="li-red">
                        <li><a href="#">Facebook</a></li>
                        <li><a href="#">Twitter</a></li>
                        <li><a href="#">LinkedIn</a></li>
                        <li><a href="#">Instagram</a></li>
                    </ul>
                </details>
                <div class="derechos-reservados">
                    <p>&copy; 2023 PELICULAS. Todos los derechos reservados.</p>
                </div>
</div>
`

document.getElementById("footer").innerHTML = footer

let header = `

<nav class="topnav">
<a href="#" class="logo">
  <img height="50" width="50" src="img/logo.png" alt="logo">
</a>
<button class="open-menu" aria-label="Abrir Menú">
  menu
</button>
<ul class="menu">

  <li><a href="index.html" class="selected">Inicio</a></li>
  <li><a href="nosotros.html">¿Quiénes Somos?</a></li>
  <li><a href="registro.html">Registrate</a></li>
  <li><a href="contacto.html">Contacto</a></li>
  <li><a href="menu.html">Menú</a></li>
  <li class="buscador"><input type="text" class="src" name="search" placeholder="Buscar ..." autocomplete="off"></li>
</ul>
</nav>

`

document.getElementById("header").innerHTML = header

const menu = document.querySelector(".menu")
const openMenuBTN = document.querySelector(".open-menu")
const closeMenuBTN = document.querySelector(".close-menu")


/*esta funcion asigna/quita la clase menu_opened a la clase menu*/
function toggleMenu() {
    menu.classList.toggle("menu_opened");
}

/*cdo se produce el evento click en el open-menu, ejecuta la funcion*/
openMenuBTN.addEventListener("click", toggleMenu);
/*cdo se produce el evento click en el close-menu, ejecuta la funcion*/
closeMenuBTN.addEventListener("click", toggleMenu);
