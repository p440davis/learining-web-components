// <app-navbar></app-navbar>

class AppNavbar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    console.log(this.getAttribute("theme"));

    const template = document.querySelector("template");
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return ["theme"];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    console.table({ name, oldVal, newVal });
  }

  connectedCallback() {
    console.log("element added to the DOM")
  }

  disconnectedCallback() {
    console.log("element removed from the DOM");
  }
}

window.customElements.define("app-navbar", AppNavbar);