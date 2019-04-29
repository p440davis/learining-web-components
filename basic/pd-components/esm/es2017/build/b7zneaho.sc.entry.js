import { h } from '../pdstenciltutorial.core.js';

class ShowHide {
    showHideElement() {
        const element = document.getElementById(this.for);
        element.hidden = !element.hidden;
    }
    render() {
        return (h("button", { onClick: this.showHideElement.bind(this) },
            h("slot", null)));
    }
    static get is() { return "rcn-show-hide"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "for": {
            "type": String,
            "attr": "for"
        }
    }; }
    static get style() { return ".close.sc-rcn-show-hide-h{position:absolute;top:0;right:0}.close.sc-rcn-show-hide-h   button.sc-rcn-show-hide{border:none;background:none;font-size:2rem;padding:.5rem 1rem}.backdrop.sc-rcn-show-hide-h{position:fixed;top:0;left:0;right:0;height:100vh;width:100%;z-index:0;background:#000;opacity:.5}.backdrop.sc-rcn-show-hide-h   button.sc-rcn-show-hide{height:100%;width:100%;opacity:0}"; }
}

class SideDrawer {
    render() {
        return [
            h("rcn-show-hide", { for: this.id }, "Menu"),
            h("rcn-show-hide", { class: "backdrop", for: this.id }),
            h("aside", null,
                h("rcn-show-hide", { class: "close", for: this.id }, "\u00D7"),
                h("slot", null))
        ];
    }
    static get is() { return "rcn-side-drawer"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "id": {
            "type": String,
            "attr": "id"
        }
    }; }
    static get style() { return "aside.sc-rcn-side-drawer{-webkit-box-sizing:border-box;box-sizing:border-box;position:fixed;top:0;left:0;width:30rem;max-width:80%;height:100vh;background:#555;-webkit-box-shadow:0 0 1em rgba(0,0,0,.7);box-shadow:0 0 1em rgba(0,0,0,.7);padding:1em;z-index:10;-webkit-transition:all .4s;transition:all .4s}[hidden].sc-rcn-side-drawer-h, aside.sc-rcn-side-drawer{display:block}[hidden].sc-rcn-side-drawer-h   aside.sc-rcn-side-drawer{left:-31rem;pointer-events:none}.backdrop.sc-rcn-side-drawer{-webkit-transition:all .4s ease-in;transition:all .4s ease-in}[hidden].sc-rcn-side-drawer-h   .backdrop.sc-rcn-side-drawer{opacity:0;pointer-events:none}"; }
}

export { ShowHide as RcnShowHide, SideDrawer as RcnSideDrawer };
