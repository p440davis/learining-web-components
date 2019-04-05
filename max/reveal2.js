class Reveal extends HTMLElement {
  _root = this.attachShadow({ mode: "open" });
  _template = this._root.innerHTML = `
    <p style="display: none">
      <slot></slot>
    </p>
    <button>Show</button>
  `;
  _button = this._root.querySelector("button");
  _info = this._root.querySelector("p");
  _isVisible = false;

  connectedCallback() {
    this._listen();

    if (this.getAttribute("is-revealed") === "true") {
      this._toggle();
    }
  }

  _listen = () => this._button.addEventListener(
    "click",
    this._toggle.bind(this)
  );

  _toggle = () => {
    let show = !this._isVisible;
    this._info.style.display = show ? "block" : "none";
    this._button.textContent = show ? "Hide" : "Show";
    this._isVisible = show;
  }
}

customElements.define("pd-reveal", Reveal);