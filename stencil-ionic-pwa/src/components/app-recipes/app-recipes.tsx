import { Component } from "@stencil/core";

@Component({
  tag: "app-recipes",
  styleUrl: "./app-recipes.css",
  shadow: true
})
export class AppRecipes {
  render() {
    return [<a href="https://www.bbcgoodfood.com/">BBC Good Food</a>];
  }
}
