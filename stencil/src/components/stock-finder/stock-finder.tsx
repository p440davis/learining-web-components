import { Component, State, Event, EventEmitter } from "@stencil/core";
import { AV_API_KEY } from "../../global/global";

@Component({
  tag: "pd-stock-finder",
  styleUrl: "./stock-finder.css",
  shadow: true
})
export class StockFinder {
  searchInput: HTMLInputElement
  apiUrl = 'https://www.alphavantage.co/query?function=SYMBOL_SEARCH' //&keywords=BA&apikey=demo

  @State() results: { symbol: string, name: string }[] = []

  @Event({ bubbles: true, composed: true }) pdStockSelected: EventEmitter<string>;

  onSearchSubmit(e: Event) {
    e.preventDefault()
    fetch(`${this.apiUrl}&keywords=${this.searchInput.value}&apikey=${AV_API_KEY}`)
      .then(res => res.json())
      .then(resObj => {
        this.results = resObj['bestMatches'].map(item => {
          return { symbol: item["1. symbol"], name: item["2. name"] }
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  onSelectSymbol(symbol: string) {
    this.pdStockSelected.emit(symbol)
  }

  render() {
    return [
      <form onSubmit={this.onSearchSubmit.bind(this)}>
        <input
          name="stock-symbol"
          ref={el => (this.searchInput = el)}
        />
        <button type="submit">Search</button>
      </form>,
      this.results.map(item => <p onClick={this.onSelectSymbol.bind(this, item.symbol)}>{item.symbol}: {item.name}</p>)
    ]
  }
}