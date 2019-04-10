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
        background: rgba(0,0,0,0.8);
        z-index: 10;
        opacity: 1;
        transition: all 0.5s ease-out;
      }

      :host([hidden]) {
        display: block;
        pointer-events: none;
        opacity: 0;
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
        transition: all 0.5s ease-out;
      }

      :host([hidden]) main {
        top: -100vh;
      }

      header, section, footer {
        padding: 1rem 2rem;
      }

      footer {
        text-align: center;
        border-top: 1px solid silver;
      }
    </style>

    <main>
      <header>
        <slot name="title">Please confirm</slot>
      </header>
      <section>
        <slot></slot>
      </section>
      <footer>
        <button class="cancel">Nope</button>
        <button class="confirm">Yup</button>
      </footer>
    </main>
  `
  // _slots = this._root.querySelectorAll('slot')
  // _slot1Change = this._slots[0].addEventListener('slotchange', e => console.dir(this._slots[0].assignedNodes()))

  _click = this.addEventListener('click', e => this._onClick(this._target(e)))

  _target = e => e.composedPath()[0]

  _onClick = target => {
    let eventNames = ['confirm', 'cancel']
    eventNames.forEach(eventName => {
      if (target.classList.contains(eventName)) {
        this.hide()
        this._event(eventName)
      }
    })
  }

  hide = () => this.hidden = true
  show = () => this.hidden = false

  _event = eventName => {
    const event = new Event(eventName)
    this.dispatchEvent(event)
  }
}

customElements.define('pd-modal', Modal)