import { h } from '../pdstenciltutorial.core.js';

import { a as AV_API_KEY } from './chunk-8133c1d5.js';

class StockPrice {
    constructor() {
        this.validInput = false;
        this.loading = false;
        this.apiUrl = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE";
    }
    stockSymbolChanged(newVal, oldVal) {
        if (newVal && newVal !== oldVal) {
            this.fetchStockPrice(newVal);
            this.stockInput = newVal;
            this.validInput = true;
        }
    }
    onStockInput(e) {
        this.stockInput = e.target.value.trim();
        this.validInput = Boolean(this.stockInput);
    }
    onFetchStockPrice(e) {
        e.preventDefault();
        this.stockSymbol = this.stockInput;
    }
    componentWillLoad() {
        if (this.stockSymbol) {
            this.stockInput = this.stockSymbol;
            this.validInput = true;
        }
    }
    componentDidLoad() {
        if (this.stockSymbol) {
            this.fetchStockPrice(this.stockSymbol);
        }
    }
    onStockSymbolSelected(e) {
        console.log("selected");
        if (e.detail && e.detail !== this.stockSymbol) {
            this.stockSymbol = e.detail;
        }
    }
    fetchStockPrice(stockSymbol) {
        this.loading = true;
        fetch(`${this.apiUrl}&symbol=${stockSymbol}&apikey=${AV_API_KEY}`)
            .then(response => {
            if (response.status !== 200) {
                throw new Error('Invalid!');
            }
            return response.json();
        })
            .then(responseObj => {
            if (!responseObj["Global Quote"]["05. price"]) {
                throw new Error('Invalid symbol!');
            }
            this.error = null;
            this.fetchedPrice = +responseObj["Global Quote"]["05. price"];
            this.loading = false;
        })
            .catch(err => {
            this.error = err.message;
            this.fetchedPrice = null;
            this.loading = false;
        });
    }
    hostData() {
        return { class: this.error && "error" };
    }
    render() {
        let dataContent = h("p", null, "\u00A0");
        if (this.loading) {
            dataContent = h("pd-spinner", null);
        }
        else if (this.error) {
            dataContent = h("p", null, this.error);
        }
        else if (this.fetchedPrice) {
            dataContent = h("p", null,
                "Price: $",
                this.fetchedPrice);
        }
        return [
            h("form", { onSubmit: this.onFetchStockPrice.bind(this) },
                h("input", { name: "stock-symbol", value: this.stockInput, onInput: this.onStockInput.bind(this) }),
                h("button", { type: "submit", disabled: !this.validInput || this.loading }, "Fetch price")),
            dataContent
        ];
    }
    static get is() { return "pd-stock-price"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "error": {
            "state": true
        },
        "fetchedPrice": {
            "state": true
        },
        "loading": {
            "state": true
        },
        "stockInput": {
            "state": true
        },
        "stockSymbol": {
            "type": String,
            "attr": "stock-symbol",
            "reflectToAttr": true,
            "mutable": true,
            "watchCallbacks": ["stockSymbolChanged"]
        },
        "validInput": {
            "state": true
        }
    }; }
    static get listeners() { return [{
            "name": "body:pdStockSelected",
            "method": "onStockSymbolSelected"
        }]; }
    static get style() { return ":host{display:inline-block;width:-webkit-max-content;width:-moz-max-content;width:max-content;margin-top:1rem;padding:.5rem;background-color:#2e8b57}:host(.error){background-color:#c71585}"; }
}

export { StockPrice as PdStockPrice };
