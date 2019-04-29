export class tooltip {
    render() {
        return [
            h("slot", null),
            h("span", null, this.tip)
        ];
    }
    static get is() { return "rcn-tooltip"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "tip": {
            "type": String,
            "attr": "tip"
        }
    }; }
    static get style() { return "/**style-placeholder:rcn-tooltip:**/"; }
}
