document.addEventListener('DOMContentLoaded', () => {
    var myModal = new bootstrap.Modal(document.getElementById('cartModal'), {
        keyboard: false
    });

    // Obtener todos los elementos que cierran el modal
    // biome-ignore lint/style/noVar: <explanation>
        var closeButtons = document.querySelectorAll('[data-bs-dismiss="modal"]');

    // Agregar evento de clic a cada botón de cierre
    closeButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            myModal.hide();
        });
    });

    // Opcional: Si tienes un botón para abrir el modal, puedes usar esto:
    var openModalBtn = document.getElementById('openCartModal');
    if (openModalBtn) {
        openModalBtn.addEventListener('click', function() {
            myModal.show();
        });
    }
});

let cart = [];

function addToCart(id, name, price) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity++;
    } else {
        cart.push({id, name, price, quantity: 1});
    }
    updateCartCount();
}

function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = count;
}

document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', (event) => {
        if (event.target.classList.contains('add-to-cart')) {
            const button = event.target;
            const id = button.getAttribute('data-id');
            const name = button.getAttribute('data-name');
            const price = parseFloat(button.getAttribute('data-price'));
            addToCart(id, name, price);
        }
    });
});

function showCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    let total = 0;
    for (const item of cart) {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        cartItems.innerHTML += `
            <div class="cart-item">
                <span>${item.name}</span>
                <span>${item.quantity} x $${item.price.toFixed(2)} = $${itemTotal.toFixed(2)}</span>
            </div>
        `;
    }
    cartItems.innerHTML += `<hr><strong>Total: $${total.toFixed(2)}</strong>`;
}

document.addEventListener('DOMContentLoaded', () => {
    // ... código anterior ...

    document.getElementById('cart-button').addEventListener('click', () => {
        showCart();
        new bootstrap.Modal(document.getElementById('cartModal')).show();
    });

    document.getElementById('checkout-button').addEventListener('click', () => {
        alert('¡Gracias por tu compra!');
        cart = [];
        updateCartCount();
        new bootstrap.Modal(document.getElementById('cartModal')).hide();
    });
});