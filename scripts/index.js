console.log('DOM Cargado');
console.log('Bootstrap disponible:', typeof bootstrap !== 'undefined');
console.log('Elemento toast:', document.getElementById('welcomeToast'));

document.addEventListener('DOMContentLoaded', () => {
  const themeDropdownItems = document.querySelectorAll('.dropdown-item[data-theme]');
  const currentTheme = localStorage.getItem('theme') || 'light';

  document.documentElement.setAttribute('data-bs-theme', currentTheme);

  function switchTheme(e) {
    e.preventDefault();
    const selectedTheme = e.target.getAttribute('data-theme');
    document.documentElement.setAttribute('data-bs-theme', selectedTheme);
    localStorage.setItem('theme', selectedTheme);
  }

  themeDropdownItems.forEach(item => {
    item.addEventListener('click', switchTheme);
  });

  initializeSearch();
  
  try {
    const welcomeToastElement = document.getElementById('welcomeToast');
    
    if (!welcomeToastElement) {
      console.error('No se encontró el elemento del toast');
      return;
    }

    const welcomeToast = new bootstrap.Toast(welcomeToastElement, {
      animation: true,
      autohide: true,
      delay: 3500
    });

    setTimeout(() => {
      welcomeToast.show();
    }, 1000);

  } catch (error) {
    console.error('Error al inicializar el toast:', error);
  }

  const productImages = document.querySelectorAll('.image-zoom');
  
  productImages.forEach(img => {
    img.classList.add('zoom-image');
    img.setAttribute('data-zoomable', '');
    img.style.cursor = 'zoom-in';
  });

  mediumZoom('[data-zoomable]', {
    margin: 24,
    background: 'rgba(0,0,0,0.9)',
    scrollOffset: 0,
    container: {
      top: 80
    }
  });

  const backToTopButton = document.getElementById('backToTop');
  
  if (!backToTopButton) {
    console.error('No se encontró el botón de volver arriba');
    return;
  }

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopButton.style.display = 'block';
    } else {
      backToTopButton.style.display = 'none';
    }
  });

  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});

function initializeSearch() {
  const searchInput = document.querySelector('#searchInput');
  const products = document.querySelectorAll('.product-card');

  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    
    products.forEach(product => {
      const title = product.querySelector('.card-title').textContent.toLowerCase();
      const description = product.querySelector('.card-text').textContent.toLowerCase();
      
      const matches = title.includes(searchTerm) || description.includes(searchTerm);
      const productCard = product.closest('.col');
      
      productCard.style.display = matches || searchTerm === '' ? '' : 'none';
      
      product.classList.remove('highlight-search');
      
      if (matches && searchTerm !== '') {
        product.classList.add('highlight-search');
        if (productCard.style.display !== 'none') {
          product.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    });
  });
}