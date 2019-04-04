class Reveal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <p style="display: none">
        <slot></slot>
      </p>
      <button>Show</button>
    `;
    this._button = this.shadowRoot.querySelector("button");
    this._info = this.shadowRoot.querySelector("p");
    this._isVisible = false;
    this._button.addEventListener(
      "click",
      this._toggle.bind(this)
    );
  }

  connectedCallback() {
    if (this.getAttribute("is-revealed") === "true") {
      this._toggle();
    }
  }

  _toggle() {
    let show = !this._isVisible;
    this._info.style.display = show ? "block" : "none";
    this._button.textContent = show ? "Hide" : "Show";
    this._isVisible = show;
  }
}

customElements.define("pd-reveal", Reveal);