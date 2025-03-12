document.addEventListener('DOMContentLoaded', function () {
  const burgerMenu = document.getElementById('burger-menu');
  const menuToggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('nav');
  const closeMenu = document.getElementById('close-menu');
  const navLinks = document.querySelectorAll('.nav__list a');
  const orderBtnMobileMenu = document.querySelector('.order-btn-mobile-menu');

  function openMenu() {
    nav.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeNavMenu() {
    nav.classList.remove('active');
    document.body.style.overflow = '';
  }

  function toggleMenu() {
    if (nav.classList.contains('active')) {
      closeNavMenu();
    } else {
      openMenu();
    }
  }

  burgerMenu.addEventListener('click', toggleMenu);
  menuToggle.addEventListener('click', toggleMenu);
  closeMenu.addEventListener('click', closeNavMenu);
  orderBtnMobileMenu.addEventListener('click', closeNavMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', closeNavMenu);
  });

  document.addEventListener('click', function (event) {
    if (
      !nav.contains(event.target) &&
      !burgerMenu.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      closeNavMenu();
    }
  });
});
