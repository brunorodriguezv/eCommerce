document.addEventListener("DOMContentLoaded", function () {
    // Obtén los elementos de los campos de entrada
    const primerNombreInput = document.getElementById("primerNombre");
    const segundoNombreInput = document.getElementById("segundoNombre");
    const primerApellidoInput = document.getElementById("primerApellido");
    const segundoApellidoInput = document.getElementById("segundoApellido");
    const emailInput = document.getElementById("emailContacto");
    const contactoInput = document.getElementById("contacto");
    const imagenPerfil = document.getElementById("imagen")
    const imagenArea = document.getElementById("imagearea");
    const miniImagenPerfil = document.getElementById('miniImagenPerfil');
    const botonBorrarImagen = document.getElementById("botonBorrarImagen")


    // Recupera los valores guardados en el Local Storage
    const emailRegistrado = localStorage.getItem("emailRegistrado");
    const storedPrimerNombre = localStorage.getItem("primerNombre");
    const storedSegundoNombre = localStorage.getItem("segundoNombre");
    const storedPrimerApellido = localStorage.getItem("primerApellido");
    const storedSegundoApellido = localStorage.getItem("segundoApellido");
    const storedContacto = localStorage.getItem("contacto");

    // Verifica si los valores existen en el Local Storage y establece los valores en los campos de entrada
    if (emailRegistrado) {
        emailInput.value = emailRegistrado;
    }
    if (storedPrimerNombre) {
        primerNombreInput.value = storedPrimerNombre;
    }
    if (storedSegundoNombre) {
        segundoNombreInput.value = storedSegundoNombre;
    }
    if (storedPrimerApellido) {
        primerApellidoInput.value = storedPrimerApellido;
    }
    if (storedSegundoApellido) {
        segundoApellidoInput.value = storedSegundoApellido;
    }
    if (storedContacto) {
        contactoInput.value = storedContacto;
    }


    const btnPerfil = document.getElementById("btnPerfil");

    btnPerfil.addEventListener("click", () => {
        const primerNombre = primerNombreInput.value.trim();
        const primerApellido = primerApellidoInput.value.trim();
        const segundoNombre = segundoNombreInput.value.trim();
        const segundoApellido = segundoApellidoInput.value.trim();
        const email = emailInput.value.trim();

        const feedbackElements = document.querySelectorAll(".invalid-feedback, .valid-feedback");
        feedbackElements.forEach((element) => element.remove());

        if (primerNombre === "") {
            showError(primerNombreInput, "Este campo es obligatorio.");
            localStorage.removeItem("primerNombre"); // Elimina el valor del localStorage
        } else {
            showSuccess(primerNombreInput);
            localStorage.setItem("primerNombre", primerNombreInput.value); // Solo guarda si hay un valor válido
        }

        if (primerApellido === "") {
            showError(primerApellidoInput, "Este campo es obligatorio.");
            localStorage.removeItem("primerApellido"); // Elimina el valor del localStorage
        } else {
            showSuccess(primerApellidoInput);
            localStorage.setItem("primerApellido", primerApellidoInput.value); // Solo guarda si hay un valor válido
        }

        if (segundoNombre === "") {
            removeSuccess(segundoNombreInput);
            localStorage.removeItem("segundoNombre"); // Elimina el valor del localStorage
        } else {
            showSuccess(segundoNombreInput);
            localStorage.setItem("segundoNombre", segundoNombreInput.value); // Solo guarda si hay un valor válido
        }



        if (segundoApellido === "") {
            removeSuccess(segundoApellidoInput);
            localStorage.removeItem("segundoApellido"); // Elimina el valor del localStorage
        } else {
            showSuccess(segundoApellidoInput);
            localStorage.setItem("segundoApellido", segundoApellidoInput.value); // Solo guarda si hay un valor válido
        }


        if (email === "") {
            showError(emailInput, "El correo electrónico es obligatorio.");
        } else if (!validateEmail(email)) {
            showError(emailInput, "El correo electrónico no es válido.");
        } else {
            showSuccess(emailInput);
        }

        if (contactoInput.value.trim() !== "") {
            if (isNaN(contactoInput.value)) {
                showError(contactoInput, "Debe ingresar un número válido.");
                removeSuccess(contactoInput); // Remueve el éxito en caso de error
            } else {
                showSuccess(contactoInput);
                removeError(contactoInput); // Remueve el error si es un número válido
                localStorage.setItem("contacto", contactoInput.value); // Solo guarda si hay un valor válido
            }
        } else {
            removeSuccess(contactoInput); // Remueve el éxito si el campo está vacío
            removeError(contactoInput); // Remueve el error si el campo está vacío
            localStorage.removeItem("contacto"); // Elimina el valor del localStorage
            guardarImagen();
        }


        // Función para validar el correo electrónico
        function validateEmail(email) {
            const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
            return emailRegex.test(email);
        }

        // Función para mostrar el error
        function showError(input, message) {
            input.classList.add("is-invalid"); // Agrega clase de Bootstrap para resaltar el campo
            const alertDiv = document.createElement("div");
            alertDiv.className = "invalid-feedback";
            alertDiv.textContent = message;
            input.parentNode.appendChild(alertDiv);
        }

        // Función para mostrar el éxito
        function showSuccess(input) {
            input.classList.remove("is-invalid"); // Elimina la clase de Bootstrap para resaltar el campo
            input.classList.add("is-valid"); // Agrega clase de Bootstrap para indicar éxito
            const successDiv = document.createElement("div");
            successDiv.className = "valid-feedback";
            input.parentNode.appendChild(successDiv);
        }

        // Función para eliminar el éxito
        function removeSuccess(input) {
            input.classList.remove("is-valid"); // Elimina la clase de Bootstrap para indicar éxito
            const successDiv = input.parentNode.querySelector(".valid-feedback");
            if (successDiv) {
                successDiv.remove();
            }
        }
        // Función para eliminar el error
        function removeError(input) {
            input.classList.remove("is-invalid"); // Elimina la clase de Bootstrap para resaltar el campo
            const errorDiv = input.parentNode.querySelector(".invalid-feedback");
            if (errorDiv) {
                errorDiv.remove();
            }
        }
    });

    imagenPerfil.addEventListener("change", function () {
        if (imagenPerfil.files && imagenPerfil.files[0]) {
            const reader = new FileReader();

            reader.onload = function (e) {
                // Muestra la imagen en la página (opcional)
                imagenArea.innerHTML = `<img src="${e.target.result}" alt="Imagen de perfil" class="profileImage rounded">`;
                miniImagenPerfil.innerHTML = `<img src="${e.target.result}" alt="Miniatura de perfil" class="miniProfileImage">`;


                // Guarda la imagen en localStorage
                localStorage.setItem('imagenPerfil', e.target.result);
            };

            // Lee el contenido de la imagen como una URL de datos
            reader.readAsDataURL(imagenPerfil.files[0]);
        }
    });

    function mostrarImagen() {
        // Obtener la imagen almacenada en localStorage
        const imagenGuardada = localStorage.getItem('imagenPerfil');

        // Verificar si hay una imagen almacenada
        if (imagenGuardada) {
            // Utiliza imagenGuardada en lugar de e.target.result
            imagenArea.innerHTML = `<img src="${imagenGuardada}" alt="Imagen de perfil" class="profileImage rounded">`;
            miniImagenPerfil.innerHTML = `<img src="${imagenGuardada}" alt="Miniatura de perfil" class="miniProfileImage">`;
        }

        else {
            imagenArea.innerHTML = `<img src="img/imagenPredetPerfil.jpg" alt="Imagen de perfil" class="profileImage rounded">`;
            miniImagenPerfil.innerHTML = `<img src="img/imagenPredetPerfil.jpg" alt="Miniatura de perfil" class="miniProfileImage">`;
        }

    }

    botonBorrarImagen.addEventListener("click", function () {
        const imagenPredeterminadaHTML = `<img src="img/imagenPredetPerfil.jpg" alt="Imagen de perfil" class="profileImage rounded">`;

        if (imagenArea.innerHTML === imagenPredeterminadaHTML) {
            alert("No tiene ninguna imagen cargada en su perfil");
        } else {
            const confirmacion = window.confirm("¿Estás seguro de que deseas borrar la imagen de perfil?");

            if (confirmacion) {
                localStorage.removeItem(`imagenPerfil`);
                imagenPerfil.value = "";

                // Mostrar la imagen predeterminada
                mostrarImagen();
            } else {
                console.log("Borrado cancelado por el usuario");
            }
        }
    });



    mostrarImagen();
});





const imageContainer = document.getElementById("imageContainer");
const imageButtons = document.getElementById("imageButtons");

imageContainer.addEventListener("mouseover", function () {
    imageButtons.style.opacity = 1;
});

imageContainer.addEventListener("mouseout", function () {
    imageButtons.style.opacity = 0;
});
























