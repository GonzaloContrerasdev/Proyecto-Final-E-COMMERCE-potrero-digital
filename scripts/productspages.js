$(document).ready(function(){
    // Configuración del zoom
    $('.zoom-container').zoom({
        url: $('.zoom-container img').attr('src'),
        magnify: 1.5
    });

    // Actualizar zoom cuando cambie el carousel
    $('#productCarousel').on('slid.bs.carousel', function () {
        $('.zoom-container').trigger('zoom.destroy');
        $('.zoom-container').zoom({
            url: $('.carousel-item.active .zoom-container img').attr('src'),
            magnify: 1.5
        });
    });

    // Función para cambiar imagen
    window.changeImage = function(index) {
        // Obtener el carousel
        var carousel = bootstrap.Carousel.getInstance(document.querySelector('#productCarousel'));
        // Ir a la diapositiva seleccionada con transición más lenta
        carousel.to(index);
    };

    // Inicializar el carousel con configuración personalizada
    var carousel = new bootstrap.Carousel(document.querySelector('#productCarousel'), {
        interval: false, // Desactivar autoplay
        ride: false,    // Desactivar inicio automático
        wrap: true,     // Permitir ciclo infinito
        touch: true,    // Permitir control táctil
        pause: 'hover', // Pausar en hover
        keyboard: true  // Permitir control por teclado
    });

    // Agregar CSS dinámicamente para transiciones más suaves
    $('<style>')
        .prop('type', 'text/css')
        .html(`
            .carousel-item {
                transition: transform 0.6s ease-in-out !important;
            }
        `)
        .appendTo('head');

    // Sincronizar miniaturas cuando el carousel cambia
    document.querySelector('#productCarousel').addEventListener('slide.bs.carousel', function(e) {
        var index = e.to;
        document.querySelectorAll('.thumbnail').forEach(function(thumb) {
            thumb.classList.remove('active');
        });
        document.querySelectorAll('.thumbnail')[index].classList.add('active');
    });

    // Agregar al archivo productspages.js
    $('#productCarousel').on('slide.bs.carousel', function (e) {
        const isVideo = $(e.relatedTarget).hasClass('video-item');
        const controls = $('.carousel-control-prev, .carousel-control-next');
        
        if (isVideo) {
            controls.fadeOut();
        } else {
            controls.fadeIn();
        }
    });
});