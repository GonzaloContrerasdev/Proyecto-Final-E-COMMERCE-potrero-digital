document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.btn-group button');
    const sortSelect = document.getElementById('sortSelect');
    const productsContainer = document.getElementById('products-container'); // Asegúrate de que tus productos estén dentro de un contenedor con este id

    // Función para filtrar productos
    function filterProducts(category) {
        const products = document.querySelectorAll('.product-card');
        products.forEach(product => {
            if (category === 'all' || product.dataset.category === category) {
                product.style.display = '';
            } else {
                product.style.display = 'none';
            }
        });
    }

    // Función para ordenar productos
    function sortProducts(criteria) {
        const products = Array.from(document.querySelectorAll('.product-card'));
        products.sort((a, b) => {
            if (criteria === 'price-asc') {
                return parseFloat(a.dataset.price) - parseFloat(b.dataset.price);
            } else if (criteria === 'price-desc') {
                return parseFloat(b.dataset.price) - parseFloat(a.dataset.price);
            } else if (criteria === 'rating') {
                return parseFloat(b.dataset.rating) - parseFloat(a.dataset.rating);
            }
        });
        productsContainer.innerHTML = '';
        products.forEach(product => productsContainer.appendChild(product));
    }

    // Event listeners para los botones de filtro
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterProducts(button.dataset.filter);
        });
    });

    // Event listener para el select de ordenamiento
    sortSelect.addEventListener('change', () => {
        sortProducts(sortSelect.value);
    });
});