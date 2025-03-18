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
          const type = e.target.dataset.type;
          const hover = e.target.dataset.hover;
          document.documentElement.style.setProperty('--main-color', color);
          document.documentElement.style.setProperty('--main-hover', hover);
          document.body.setAttribute('data-type', type);
          this.saveColor(color, type, hover);
        }
      }
      checkColor() {
        const currentColor = window.localStorage.getItem('main-color');
        const currentThemeType = window.localStorage.getItem('main-theme-type');
        const currentHover = window.localStorage.getItem('main-hover');
        if (currentColor && currentThemeType) {
          document.documentElement.style.setProperty(
            '--main-color',
            currentColor
          );
          document.documentElement.style.setProperty(
            '--main-hover',
            currentHover
          );
          document.body.setAttribute('data-type', currentThemeType);
        } else {
          document.documentElement.style.setProperty('--main-color', '#ed3b44');
          document.documentElement.style.setProperty('--main-hover', '#cc2a32');
          document.body.setAttribute('data-type', 'red');
        }
      }
      saveColor(color, type, hover) {
        if (!color) return;
        window.localStorage.setItem('main-color', color);
        window.localStorage.setItem('main-hover', hover);
        window.localStorage.setItem('color-theme-type', type);
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
