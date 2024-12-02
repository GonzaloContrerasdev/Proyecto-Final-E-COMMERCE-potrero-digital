document.addEventListener('DOMContentLoaded', () => {
    // Selectores
    const filterButtons = document.querySelectorAll('[data-filter]');
    const sortSelect = document.getElementById('sortSelect');
    const productsContainer = document.querySelector('.row.row-cols-1');

    let currentFilter = 'all';
    let currentSort = '';


    function filterAndSortProducts() {
        const products = Array.from(document.querySelectorAll('.product-card'));
        

        products.forEach(product => {
            const productCol = product.closest('.col');
            const shouldShow = currentFilter === 'all' || product.dataset.category === currentFilter;
            productCol.style.display = shouldShow ? '' : 'none';
        });

        const visibleProducts = products.filter(product => 
            product.closest('.col').style.display !== 'none'
        );

        if (currentSort) {
            visibleProducts.sort((a, b) => {
                const getPriceValue = elem => parseFloat(elem.querySelector('.fw-bold').textContent.replace('$', ''));
                const getRatingValue = elem => parseFloat(elem.dataset.rating);

                switch (currentSort) {
                    case 'price-asc':
                        return getPriceValue(a) - getPriceValue(b);
                    case 'price-desc':
                        return getPriceValue(b) - getPriceValue(a);
                    case 'rating':
                        return getRatingValue(b) - getRatingValue(a);
                    default:
                        return 0;
                }
            });


            visibleProducts.forEach(product => {
                productsContainer.appendChild(product.closest('.col'));
            });
        }
    }


    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            currentFilter = button.dataset.filter;
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterAndSortProducts();
        });
    });

    sortSelect.addEventListener('change', (e) => {
        currentSort = e.target.value;
        filterAndSortProducts();
    });


    filterAndSortProducts();
});