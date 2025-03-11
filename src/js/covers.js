
window.addEventListener('DOMContentLoaded', () => {
  const coversSection = document.querySelector('#covers');
  if (!coversSection) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        entry.target.classList.toggle(
          'animation',
          entry.intersectionRatio >= 0.5
        );
      });
    },
    { threshold: 0.5 }
  );

  observer.observe(coversSection);
});