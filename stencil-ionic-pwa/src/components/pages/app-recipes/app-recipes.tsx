import { Component } from "@stencil/core";
import { Recipe } from "../../../data/recipe.model";
import { data } from "../../../data/recipes.data";

@Component({
  tag: "app-recipes",
  styleUrl: "./app-recipes.css",
  shadow: true
})
export class AppRecipes {
  dataService = new data();
  recipes: Recipe[] = this.dataService.getAllRecipes();

  render() {
    let content = this.recipes.map(item => {
      return (
        <app-recipe
          id={item.id}
          recipe-title={item.title}
          image={item.imageUrl}
          ingredients={item.ingredients}
        />
      );
    });
    return [
      <app-header page-title="Recipes" />,
      <ion-content>
        <ion-list>{content}</ion-list>
      </ion-content>
    ];
  }
}
