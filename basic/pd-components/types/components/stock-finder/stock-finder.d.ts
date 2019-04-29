import '../../stencil.core';
import { EventEmitter } from "../../stencil.core";
export declare class StockFinder {
    searchInput: HTMLInputElement;
    apiUrl: string;
    results: {
        symbol: string;
        name: string;
    }[];
    loading: boolean;
    pdStockSelected: EventEmitter<string>;
    onSearchSubmit(e: Event): void;
    onSelectSymbol(symbol: string): void;
    render(): JSX.Element[];
}
