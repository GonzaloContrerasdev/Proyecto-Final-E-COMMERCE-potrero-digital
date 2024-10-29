document.addEventListener('DOMContentLoaded', () => {
  const themeDropdownItems = document.querySelectorAll('.dropdown-item[data-theme]');
  const currentTheme = localStorage.getItem('theme') || 'light';

  // Establecer el tema inicial
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
});