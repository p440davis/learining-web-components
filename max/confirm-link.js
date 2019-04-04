class ConfirmLink extends HTMLAnchorElement {
  connectedCallback() {
    this.addEventListener('click', e => {
      if (!confirm("Really?")) {
        event.preventDefault();
      }
    });
  }
}

customElements.define("pd-confirm-link", ConfirmLink, { extends: "a" });