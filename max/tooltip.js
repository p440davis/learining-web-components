class Tooltip extends HTMLElement {
  constructor() {
    super();
    this._tooltipVisible = false;
    this._icon;
    this._tooltipText = "text";
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          position: relative;
          padding: 0.1em;
        }

        div {
          position: absolute;
          bottom: -1.5rem;
          right: 0;
          z-index: 10;
          padding: 0.2rem;
          border-radius: 0.3rem;
          font-size: 1rem;
          font-weight: normal;
          color: white;
          background-color: navy;
          box-shadow: 1px 1px 5px rgba(0,0,0,0.5);
        }

        sup {
          font-size: 1rem;
          font-weight: bold;
          background: var(--primary, lightgray);
          border: 2px solid navy;
          border-radius: 50%;
          padding: 0 0.3rem;
        }
      </style>
      <slot>Slot text</slot>
      <sup>?</sup>
    `;
  }

  connectedCallback() {
    this._icon = this.shadowRoot.querySelector("sup");

    if (this.hasAttribute("text")) {
      this._tooltipText = this.getAttribute("text");
    }
    this._icon.addEventListener("mouseenter", this._showTooltip.bind(this));
    this._icon.addEventListener("mouseleave", this._hideTooltip.bind(this));
    this._render();
  };

  disconnectedCallback() {
    this._icon.removeEventListener("mouseenter", this._showTooltip);
    this._icon.removeEventListener("mouseleave", this._hideTooltip);
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal === newVal) {
      return;
    }

    if (name === 'text') {
      this._tooltipText = newVal;
    }
  }

  static get observedAttributes() {
    return ['text'];
  }

  _render() {
    let tooltipContainer = this.shadowRoot.querySelector('div');

    if (this._tooltipVisible) {
      tooltipContainer = document.createElement("div")
      tooltipContainer.textContent = this._tooltipText;
      this.shadowRoot.appendChild(tooltipContainer);
    } else if (tooltipContainer) {
      this.shadowRoot.removeChild(tooltipContainer);
    }
  }

  _showTooltip() {
    this._tooltipVisible = true;
    this._render();
  }

  _hideTooltip() {
    this._tooltipVisible = false;
    this._render();
  }
}

customElements.define("pd-tooltip", Tooltip);