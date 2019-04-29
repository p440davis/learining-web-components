import { h } from '../pdstenciltutorial.core.js';

class Spinner {
    render() {
        return [h("div", null)];
    }
    static get is() { return "pd-spinner"; }
    static get encapsulation() { return "shadow"; }
    static get style() { return "div.sc-pd-spinner{display:inline-block;width:64px;height:64px}div.sc-pd-spinner:after{content:\" \";display:block;width:46px;height:46px;margin:1px;border-radius:50%;border-color:#fff transparent;border-style:solid;border-width:5px;-webkit-animation:lds-dual-ring 1.2s linear infinite;animation:lds-dual-ring 1.2s linear infinite}\@-webkit-keyframes lds-dual-ring{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}\@keyframes lds-dual-ring{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}"; }
}

export { Spinner as PdSpinner };
