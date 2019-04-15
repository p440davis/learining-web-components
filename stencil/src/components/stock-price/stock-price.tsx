import { Component, State } from "@stencil/core";
import { AV_API_KEY } from "../../global/global";

@Component({
  tag: "pd-stock-price",
  styleUrl: "./stock-price.css",
  shadow: true
})
export class StockPrice {
  @State() fetchedPrice: number
  @State() stockInput: string
  @State() validInput = false

  apiUrl = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE"

  onStockInput(e: Event) {
    this.stockInput = (e.target as HTMLInputElement).value.trim()
    this.validInput = Boolean(this.stockInput)
  }

  onFetchStockPrice(e: Event) {
    e.preventDefault()
    const stockSymbol = this.stockInput
    fetch(`${this.apiUrl}&symbol=${stockSymbol}&apikey=${AV_API_KEY}`)
      .then(response => {
        if (response.status !== 200) {
          throw new Error('Invalid!');
        }
        return response.json()
      })
      .then(responseObj => {
        if (!responseObj["Global Quote"]["05. price"]) {
          throw new Error('Invalid symbol!')
        }
        this.fetchedPrice = +responseObj["Global Quote"]["05. price"]
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    return [
      <form onSubmit={this.onFetchStockPrice.bind(this)}>
        <input
          name="stock-symbol"
          value={this.stockInput}
          onInput={this.onStockInput.bind(this)}
        />
        <button type="submit" disabled={!this.validInput}>Fetch price</button>
      </form>,
      <p>Price: ${this.fetchedPrice}</p>
    ]
  }
}