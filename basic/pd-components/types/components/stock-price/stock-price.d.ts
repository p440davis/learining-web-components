import '../../stencil.core';
export declare class StockPrice {
    stockSymbol: string;
    stockSymbolChanged(newVal: string, oldVal: string): void;
    fetchedPrice: number;
    stockInput: string;
    validInput: boolean;
    error: string;
    loading: boolean;
    apiUrl: string;
    onStockInput(e: Event): void;
    onFetchStockPrice(e: Event): void;
    componentWillLoad(): void;
    componentDidLoad(): void;
    onStockSymbolSelected(e: CustomEvent): void;
    fetchStockPrice(stockSymbol: string): void;
    hostData(): {
        class: string;
    };
    render(): JSX.Element[];
}
