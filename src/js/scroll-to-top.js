(() => {
  window.addEventListener('DOMContentLoaded', () => {
    const scrollWrapper = document.querySelector('.scroll-to-top');
    if (!scrollWrapper) return;

    const toggleVisibility = () => {
      scrollWrapper.classList.toggle('active', window.scrollY >= 700);
    };

    window.addEventListener('scroll', toggleVisibility);
    scrollWrapper.addEventListener('click', () =>
      window.scrollTo({ top: 0, behavior: 'smooth' })
    );
  });
})();
