export class ShowHide {
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
    static get style() { return "/**style-placeholder:rcn-show-hide:**/"; }
}
