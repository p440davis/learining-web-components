class Tooltip extends HTMLElement {
  constructor() {
    super();
    this._tooltipContainer;
    this._tooltipText = "text";
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        div {
          position: absolute;
          z-index: 10;
          color: white;
          background-color: navy;
        }
      </style>
      <slot>Slot text</slot>
      <sup> (?)</sup>
    `;
  }

  connectedCallback() {
    const icon = this.shadowRoot.querySelector("sup");

    if (this.hasAttribute("text")) {
      this._tooltipText = this.getAttribute("text");
    }
    this.addEventListener("mouseenter", this._showTooltip.bind(this));
    this.addEventListener("mouseleave", this._hideTooltip.bind(this));
    this.shadowRoot.appendChild(icon);
  };

  _showTooltip() {
    this._tooltipContainer = document.createElement("div");
    this._tooltipContainer.textContent = this._tooltipText;
    this.shadowRoot.appendChild(this._tooltipContainer);
  }

  _hideTooltip() {
    this.shadowRoot.removeChild(this._tooltipContainer);
  }
}

customElements.define("pd-tooltip", Tooltip);