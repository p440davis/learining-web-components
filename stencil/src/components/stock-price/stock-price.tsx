import { Component, State, Prop } from "@stencil/core";
import { AV_API_KEY } from "../../global/global";

@Component({
  tag: "pd-stock-price",
  styleUrl: "./stock-price.css",
  shadow: true
})
export class StockPrice {
  @Prop() stockSymbol: string

  @State() fetchedPrice: number
  @State() stockInput: string
  @State() validInput = false
  @State() error: string

  initialStockSymbol: string
  apiUrl = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE"

  onStockInput(e: Event) {
    this.stockInput = (e.target as HTMLInputElement).value.trim()
    this.validInput = Boolean(this.stockInput)
  }

  onFetchStockPrice(e: Event) {
    e.preventDefault()
    this.fetchStockPrice(this.stockInput)
  }

  componentWillLoad() {
    if (this.stockSymbol) {
      this.stockInput = this.stockSymbol
      this.validInput = true
    }
  }

  componentDidLoad() {
    if (this.stockSymbol) {
      this.fetchStockPrice(this.stockSymbol)
      this.initialStockSymbol = this.stockSymbol;
    }
  }

  componentDidUpdate() {
    if (this.stockSymbol !== this.initialStockSymbol) {
      this.fetchStockPrice(this.stockSymbol)
      this.initialStockSymbol = this.stockSymbol
      this.stockInput = this.stockSymbol
      this.validInput = true
    }
  }

  fetchStockPrice(stockSymbol: string) {
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
        this.error = null
        this.fetchedPrice = +responseObj["Global Quote"]["05. price"]
      })
      .catch(err => {
        this.error = err.message;
      })
  }

  render() {
    let dataContent = <p>&nbsp;</p>
    if (this.error) {
      dataContent = <p>{this.error}</p>
    } else if (this.fetchedPrice) {
      dataContent = <p>Price: ${this.fetchedPrice}</p>
    }
    return [
      <form onSubmit={this.onFetchStockPrice.bind(this)}>
        <input
          name="stock-symbol"
          value={this.stockInput}
          onInput={this.onStockInput.bind(this)}
        />
        <button type="submit" disabled={!this.validInput}>Fetch price</button>
      </form>,
      dataContent
    ]
  }
}