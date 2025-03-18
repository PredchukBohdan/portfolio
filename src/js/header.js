document.addEventListener('DOMContentLoaded', function () {
  const header = document.querySelector('.page-header');
  const burgerMenu = document.getElementById('burger-menu');
  const menuToggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('nav');
  const closeMenu = document.getElementById('close-menu');
  const navLinks = document.querySelectorAll('.nav__list a');
  const orderBtnMobileMenu = document.querySelector('.order-btn-mobile-menu');

  header?.classList.toggle('sticky', window.scrollY >= 50);

  function openMenu() {
    nav.classList.add('active');
    if (window.innerWidth < 768) {
      document.body.style.overflow = 'hidden';
    } else {
      header.style.paddingBottom = '75px';
    }
  }

  function closeNavMenu() {
    nav.classList.remove('active');
    document.body.style.overflow = '';
    if (window.innerWidth >= 768) {
      header.style.paddingBottom = '8px';
    }
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
  window.addEventListener('scroll', () => {
    header?.classList.toggle('sticky', window.scrollY >= 50);
  });
});
