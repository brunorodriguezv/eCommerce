document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("autos").addEventListener("click", function () {
        localStorage.setItem("catID", 101);
        localStorage.setItem("catName", "Autos");
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function () {
        localStorage.setItem("catID", 102);
        localStorage.setItem("catName", "Juguetes");
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function () {
        localStorage.setItem("catID", 103);
        localStorage.setItem("catName", "Muebles");
        window.location = "products.html"
    });
});

// Comprobar si el usuario está logeado al cargar la página
const isLoggedIn = localStorage.getItem('isLoggedIn');
if (!isLoggedIn) {
    // Redirigir al inicio de sesión
    alert("Hola! No has iniciado sesión, ingrese sus datos por favor")
    window.location.href = 'login.html';
}

/* SECCIÓN MODO OSCURO Y CLARO */

const checkbox = document.getElementById("toggle");
const checkbox2 = document.getElementById("toggle2");
const IMAGEN_CLARO = 'img/cover_back.png';
const IMAGEN_OSCURO = 'img/imagenIndexSinFondo2.png';
const IMAGEN_PANTALLA_CHICA_CLARO = 'img/imagenResponsiveFondoBlanco.png';
const IMAGEN_PANTALLA_CHICA_OSCURO = 'img/imagenResponsiveSinFondo.png';

function cambiarFondo(fondo) {
    const albumDiv = document.getElementsByClassName("album")[0];
    albumDiv.style.backgroundColor = fondo;
    localStorage.setItem("background", fondo);
}

function cambiarImagenModo(modo, imagenGrande, imagenPantallaChica, fondo) {
    const ilustracion = document.getElementById("ilustracion");
    const ilustracionPantallasChicas = document.getElementById("ilustracionPantallasChicas");

    if (ilustracion.offsetParent !== null) {
        ilustracion.src = imagenGrande;
    } else {
        ilustracionPantallasChicas.src = imagenPantallaChica;
    }

    cambiarFondo(fondo);

    guardarInformacionModo(modo, {
        imagenGrande,
        imagenPantallaChica,
        fondo,
    });
}
function guardarInformacionModo(nombreModo, info) {
    localStorage.setItem(nombreModo, JSON.stringify(info));
}

function cambiarBoton(claseAgregar, claseQuitar) {
    const btn = document.querySelector(".btn.btn-lg.btn-block");

    if (btn) {
        btn.classList.remove(claseQuitar);
        btn.classList.add(claseAgregar);
    } else {
        console.error("El botón no se encontró en el DOM.");
    }
}

function cambiarAmodo(modo, checkbox, claseAgregar, claseQuitar, imagenGrande, imagenPantallaChica, fondo) {
    console.log(`Haciendo clic en el botón de ${modo}`);

    if (checkbox.checked) {
        localStorage.setItem("background", fondo);
        cambiarImagenModo(modo, imagenGrande, imagenPantallaChica, fondo);
        cambiarBoton(claseAgregar, claseQuitar);
        setTimeout(() => {
            checkbox.checked = false;
        }, 100);
    }

    console.log('Fin');
}

function cambiarAmodoOscuro() {
    cambiarAmodo('modoOscuro', checkbox, 'btn-dark', 'btn-light', IMAGEN_OSCURO, IMAGEN_PANTALLA_CHICA_OSCURO, '#212529');
    setTimeout(() => {
        checkbox.checked = false;
    }, 100);
}

function cambiarAmodoClaro() {
    cambiarAmodo('modoClaro', checkbox2, 'btn-light', 'btn-dark', IMAGEN_CLARO, IMAGEN_PANTALLA_CHICA_CLARO, '#f8f9fa');
    setTimeout(() => {
        checkbox2.checked = false;
    }, 100);
}

function restaurarEstadoModo(modo, opciones) {
    const modoActivado = localStorage.getItem("background") === opciones.fondo;
    checkbox.checked = modoActivado;

    if (modoActivado) {
        const modoInfo = JSON.parse(localStorage.getItem(modo));
        if (modoInfo) {
            cambiarImagenModo(modo, modoInfo.imagenGrande, modoInfo.imagenPantallaChica, modoInfo.fondo);
            cambiarBoton(opciones.claseAgregar, opciones.claseQuitar);
        }
    }
    setTimeout(() => {
        checkbox.checked = false;
    }, 100);
}

// función para restaurar el estado del modo oscuro cuando la página se carga
window.addEventListener("load", function () {
    restaurarEstadoModo('modoOscuro', { claseAgregar: 'btn-dark', claseQuitar: 'btn-light', fondo: '#212529' });
    restaurarEstadoModo('modoClaro', { claseAgregar: 'btn-light', claseQuitar: 'btn-dark', fondo: '#f8f9fa' });
});

window.addEventListener("resize", function () {
    // Agrega un pequeño retraso para manejar el cambio de tamaño
    setTimeout(() => {
        restaurarEstadoModo('modoOscuro', { claseAgregar: 'btn-dark', claseQuitar: 'btn-light', fondo: '#212529' });
        restaurarEstadoModo('modoClaro', { claseAgregar: 'btn-light', claseQuitar: 'btn-dark', fondo: '#f8f9fa' });
    }, 100);
});

checkbox2.addEventListener("click", cambiarAmodoClaro);
checkbox.addEventListener("click", cambiarAmodoOscuro);

