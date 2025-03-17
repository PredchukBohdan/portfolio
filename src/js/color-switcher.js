(() => {
  if (!customElements.get('color-switcher')) {
    class ColorSwitcher extends HTMLElement {
      constructor() {
        super();
        this.colorsWrapper = this.querySelector('.color-switcher__colors');
        this.switcherButton = this.querySelector('.color-switcher__switcher');
      }
      connectedCallback() {
        this.checkColor();
        this.bindEvents();
      }
      toggleColors() {
        this.classList.toggle('active');
      }
      setColor(e) {
        if (e.target.closest('button')) {
          const color = e.target.dataset.color;
          document.documentElement.style.setProperty('--main-color', color);
          this.saveColor(color);
        }
      }
      checkColor() {
        const currentColor = window.localStorage.getItem('main-color');
        if (currentColor) {
          document.documentElement.style.setProperty(
            '--main-color',
            currentColor
          );
        }
      }
      saveColor(color) {
        if (!color) return;
        window.localStorage.setItem('main-color', color);
      }
      bindEvents() {
        this.switcherButton?.addEventListener(
          'click',
          this.toggleColors.bind(this)
        );
        this.colorsWrapper?.addEventListener('click', e => this.setColor(e));
      }
    }
    customElements.define('color-switcher', ColorSwitcher);
  }
})();
