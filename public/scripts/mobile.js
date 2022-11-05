const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

function toggleMobileMenu() {
  mobileMenu.classList.toggle('open');
}

mobileMenuButton.addEventListener('click', toggleMobileMenu);
