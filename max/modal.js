class Modal extends HTMLElement {
  _root = this.attachShadow({ mode: 'open' })
  _isOpen = false
  _template = this._root.innerHTML = `
    <style>
      :host {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 100vh;
        background: black;
        opacity: 0.8;
        z-index: 10;
      }

      main {
        position: fixed;
        top: 20vh;
        left: 25%;
        width: 50%;
        right: 25%;
        z-index: 11;
        background: gainsboro;
        border-radius: 3rem;
        box-shadow: 0 0.5rem 2rem rgba(0,0,0,0.8);
      }

      header, section, footer {
        padding: 1rem 2rem 2rem;
      }

      footer {
        text-align: center;
        border-top: 1px solid silver;
      }
    </style>

    <main>
      <header>
        <h1>You sure?</h1>
      </header>
      <section>
        <pd-tooltip text="Yo!">Good news</pd-tooltip>
        <slot></slot>
      </section>
      <footer>
        <button class="close">Nope</button>
        <button>Yup</button>
      </footer>
    </main>
  `
  _cancelButton = this._root.getElementById('cancel')
  _click = this.addEventListener('click', e => this._onClick(this._target(e)))

  _target = (e) => e.composedPath()[0];

  _onClick = target => target.classList.contains("close") && this.hide()

  hide = () => this.hidden = true
}

customElements.define("pd-modal", Modal)