$(document).ready(function(){

    $('.zoom-container').zoom({
        url: $('.zoom-container img').attr('src'),
        magnify: 1.5
    });


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

        carousel.to(index);
    };

    // Inicializar el carousel con configuración personalizada
    var carousel = new bootstrap.Carousel(document.querySelector('#productCarousel'), {
        interval: false, 
        ride: false,    
        wrap: true,     
        touch: true,    
        pause: 'hover', 
        keyboard: true  
    });


    $('<style>')
        .prop('type', 'text/css')
        .html(`
            .carousel-item {
                transition: transform 0.6s ease-in-out !important;
            }
        `)
        .appendTo('head');


    document.querySelector('#productCarousel').addEventListener('slide.bs.carousel', function(e) {
        var index = e.to;
        document.querySelectorAll('.thumbnail').forEach(function(thumb) {
            thumb.classList.remove('active');
        });
        document.querySelectorAll('.thumbnail')[index].classList.add('active');
    });


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