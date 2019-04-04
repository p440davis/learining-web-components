class Tooltip extends HTMLElement {
  constructor() {
    super();
    this._tooltipContainer;
  }

  connectedCallback() {
    this._tooltipText = this.getAttribute("text") || "For real!";

    const icon = document.createElement("span");
    icon.textContent = " (?)";
    this.style.textDecoration = "underline";
    this.addEventListener("mouseenter", this._showTooltip.bind(this));
    this.addEventListener("mouseleave", this._hideTooltip.bind(this));
    this.appendChild(icon);
  };

  _showTooltip() {
    this._tooltipContainer = document.createElement("div");
    this._tooltipContainer.textContent = this._tooltipText;
    this._tooltipContainer.style = "position:absolute";
    this.appendChild(this._tooltipContainer);
  }

  _hideTooltip() {
    this.removeChild(this._tooltipContainer);
  }
}

customElements.define("pd-tooltip", Tooltip);