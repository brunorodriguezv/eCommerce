document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector("#container-content");
    const asc = document.getElementById("ascendente");
    const desc = document.getElementById("descendente");
    const rel = document.getElementById("relevancia");
    const rangoPrecio = document.getElementById("rangoPrecio");
    const limpiarFiltros = document.getElementById("limpiarFiltros");
    const buscarInput = document.getElementById("buscar");

    const id = localStorage.getItem("catID");
    const url = `https://japceibal.github.io/emercado-api/cats_products/${id}.json`;
    const catName = localStorage.getItem(`catName`)

    document.getElementById("nombreCat").innerHTML = `Verás aquí todos los productos de la categoría: <strong>${catName}</strong>.`

    // fetch a los productos
    async function fetchProducts(url) {
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data.products;
        } catch (error) {
            console.error("Error fetching products:", error);
            return [];
        }
    }

    //funcion para generar un numero random entre dos numeros.
    function generateRandomNumber(min, max, cardIndex) {
        const savedRandomNumbers = JSON.parse(localStorage.getItem('randomNumbers')) || {};

        if (!savedRandomNumbers[cardIndex]) {
            savedRandomNumbers[cardIndex] = Math.floor(Math.random() * (max - min + 1)) + min;
            localStorage.setItem('randomNumbers', JSON.stringify(savedRandomNumbers));
        }

        return savedRandomNumbers[cardIndex];
    }

    //funcion para mostrar productos
    function showProducts(array) {
        let content = "";

        if (array.length > 0) {
            array.forEach((product, index) => {
                const randomPrice = generateRandomNumber(10, 50, product.id); // Cambiado para usar el ID del producto

                content += `
                    <div  onclick="setProductID('${product.id}')" class="w-100 p-3 col-xl-4 col-12 col-md-6 col-lg-3 container-products" id="product-cards">
                        <div class="card col-12 div-products" id="card">
                            <img class="card-image image-products" id="card-img" src="${product.image}">
                            <div id="card-text-content">
                                <h1 class="card-title title-products">${product.name}</h1>
                                <h4 class="card-cost cost-products"><strong>${product.currency} ${product.cost}</strong><p id="descuento">${randomPrice}% OFF</p></h4>
                                <p class="card-description description-products">${product.description}</p>
                                <p class="card-soldcount soldCount-products">Vendidos: ${product.soldCount}</p>
                            </div>
                        </div>
                    </div>
                `;
            });
            container.innerHTML = content;
        } else {
            const noProductsDiv = document.createElement("div");
            noProductsDiv.className = "text-center";
            noProductsDiv.innerHTML = `
                <p class="noProductos">No se encontraron productos</p>
                <img src="img/libreria vacia3.jpg" alt="Imagen de producto no encontrado" class="no-products-image">
            `;
            container.innerHTML = "";
            container.appendChild(noProductsDiv);
        }
    }


    /* FILTROS */

    // filtrar alfabeticamente
    function sortProductsBy(property, order) {
        return function (a, b) {
            return (order === "asc" ? 1 : -1) * (a[property] - b[property]);
        };
    }

    //ordenar por precio
    function filterProductsByPriceRange(products, min, max) {
        return products.filter(product => product.cost >= min && product.cost <= max);
    }

    //limpiar filtros
    function clearFilters(products) {
        showProducts(products);
        document.getElementById("precioMinimo").value = ""
        document.getElementById("precioMaximo").value = ""
    }

    // addEventListeners para cada boton de los filtros
    async function init() {
        const products = await fetchProducts(url);
        showProducts(products);

        asc.addEventListener("click", () => showProducts(products.slice().sort(sortProductsBy("cost", "asc"))));
        desc.addEventListener("click", () => showProducts(products.slice().sort(sortProductsBy("cost", "desc"))));
        rel.addEventListener("click", () => showProducts(products.slice().sort(sortProductsBy("soldCount", "desc"))));
        rangoPrecio.addEventListener("click", () => {
            const precioMin = parseFloat(document.getElementById("precioMinimo").value);
            const precioMax = parseFloat(document.getElementById("precioMaximo").value);
            const filteredProducts = filterProductsByPriceRange(products, precioMin, precioMax);
            showProducts(filteredProducts);
        });
        limpiarFiltros.addEventListener("click", () => clearFilters(products));

        buscarInput.addEventListener("input", buscarProductos);
    }


    //Buscador de productos 
    function buscarProductos() {
        const searchTerm = buscarInput.value.trim().toUpperCase();
        const cards = document.querySelectorAll(".col-xl-4.col-12.col-md-6.col-lg-3.container-products");

        cards.forEach(card => {
            const title = card.querySelector(".card-title.title-products").textContent.toUpperCase();
            const description = card.querySelector(".card-description.description-products").textContent.toUpperCase();

            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    }

    init();
});


function setProductID(id) {
    localStorage.setItem("id", id);
    window.location = "product-info.html";
}

document.addEventListener("DOMContentLoaded", function () {
    var tooltips = document.querySelectorAll('[data-toggle="tooltip"]');
    tooltips.forEach(function (tooltip) {
        new bootstrap.Tooltip(tooltip);
    });
});