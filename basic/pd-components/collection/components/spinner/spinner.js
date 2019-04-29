export class Spinner {
    render() {
        return [h("div", null)];
    }
    static get is() { return "pd-spinner"; }
    static get encapsulation() { return "shadow"; }
    static get style() { return "/**style-placeholder:pd-spinner:**/"; }
}
