import { h } from '../pdstenciltutorial.core.js';

import { a as AV_API_KEY } from './chunk-8133c1d5.js';

class StockFinder {
    constructor() {
        this.apiUrl = 'https://www.alphavantage.co/query?function=SYMBOL_SEARCH';
        this.results = [];
        this.loading = false;
    }
    onSearchSubmit(e) {
        e.preventDefault();
        this.loading = true;
        fetch(`${this.apiUrl}&keywords=${this.searchInput.value}&apikey=${AV_API_KEY}`)
            .then(res => res.json())
            .then(resObj => {
            this.results = resObj['bestMatches'].map(item => {
                return { symbol: item["1. symbol"], name: item["2. name"] };
            });
            this.loading = false;
        })
            .catch(err => {
            console.log(err);
            this.loading = false;
        });
    }
    onSelectSymbol(symbol) {
        this.pdStockSelected.emit(symbol);
    }
    render() {
        let content = this.results.map(item => {
            return h("p", { onClick: this.onSelectSymbol.bind(this, item.symbol) },
                item.symbol,
                ": ",
                item.name);
        });
        if (this.loading) {
            content = [h("pd-spinner", null)];
        }
        return [
            h("form", { onSubmit: this.onSearchSubmit.bind(this) },
                h("input", { name: "stock-symbol", ref: el => (this.searchInput = el) }),
                h("button", { type: "submit" }, "Search")),
            content
        ];
    }
    static get is() { return "pd-stock-finder"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "loading": {
            "state": true
        },
        "results": {
            "state": true
        }
    }; }
    static get events() { return [{
            "name": "pdStockSelected",
            "method": "pdStockSelected",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ".sc-pd-stock-finder-h{display:inline-block;width:-webkit-max-content;width:-moz-max-content;width:max-content;margin-top:1rem;padding:.5rem;background-color:#6a5acd}"; }
}

export { StockFinder as PdStockFinder };
