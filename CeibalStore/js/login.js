const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const loginSection = document.getElementById("loginSection");
const registerSection = document.getElementById("registerSection");
const API_URL = "https://japceibal.github.io/emercado-api/user_cart/25801.json";


// AddEventListeners Para mostrar el LoginSection/RegisterSection 

//login de forma predeterminada
window.addEventListener("load", () => {
  loginSection.style.display = "block";
  registerSection.style.display = "none";
});

loginBtn.addEventListener("click", () => {
  loginSection.style.display = "block";
  registerSection.style.display = "none";
});

registerBtn.addEventListener("click", () => {
  registerSection.style.display = "block";
  loginSection.style.display = "none";
});

// Función para validar el formato del correo electrónico
function validateEmail(EmailRegistrado) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(EmailRegistrado);
}

//Validaciones para loguearse 
document.addEventListener("DOMContentLoaded", async function () {
  const loginForm = document.getElementById("loginSubmit");

  loginForm.addEventListener("click", async function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const EmailRegistrado = document.getElementById("emailUsuario").value;

    if (username && password && validateEmail(EmailRegistrado)) {
      //Almacenar datos iniciales de carrito del usuario
      await loadCarrito()
      // Almacenar la sesión como iniciada en localStorage
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem("username", username);
      localStorage.setItem("emailRegistrado", EmailRegistrado);
      alert("¡Te damos la bienvenida nuevamente " + username + "! :D")
      // Redireccionar a la página de portada.
      window.location.href = 'index.html';
    } else {
      alert('Campos incompletos o correo electrónico no válido. Por favor inténtalo de nuevo.');
    }
  });

})

//Validaciones para Registrarse 
document.addEventListener("DOMContentLoaded", function () {
  const registerForm = document.getElementById("registerSubmit");

  registerForm.addEventListener("click", async function (event) {
    event.preventDefault();

    const newUsername = document.getElementById('newUsername').value;
    const newPassword = document.getElementById('newPassword').value;
    const newEmail = document.getElementById('emailUsuarioRegistro').value;

    if (newUsername && newPassword && newEmail) {
      localStorage.setItem('newUsername', newUsername);
      localStorage.setItem('newPassword', newPassword);
      localStorage.setItem('EmaildeRegistro', newEmail);

      alert("¡Registro exitoso para " + newUsername + "! :D");


      window.location.href = 'index.html';
    } else {
      alert('Campos incompletos. Por favor inténtalo de nuevo.');
    }
  });
});

//Se carga el carrito desde que nos logueamos/registramos
async function loadCarrito() {
  try {
    const carritoActual = JSON.parse(localStorage.getItem('carrito')) || [];

    const response = await fetch(API_URL);
    const data = await response.json();

    // Filtrar productos duplicados
    const productosNuevos = data.articles.filter(nuevoProducto => {
      return !carritoActual.some(productoExistente => productoExistente.id === nuevoProducto.id);
    });

    // Agregar los productos filtrados al carrito existente
    const nuevoCarrito = [...carritoActual, ...productosNuevos];

    // Almacenar el nuevo carrito en el localStorage
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
  } catch (error) {
    console.error('Error al cargar el carrito:', error);
  }
}
