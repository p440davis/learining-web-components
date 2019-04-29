export class SideDrawer {
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
    static get style() { return "/**style-placeholder:rcn-side-drawer:**/"; }
}
