import { Component, Listen } from "@stencil/core";
import { Recipe } from "../../../data/recipe.model";
import { data } from "../../../data/recipes.data";

@Component({
  tag: "app-recipe-detail"
})
export class RecipeDetail {
  recipeId = window.location.pathname.split("/").pop();
  dataService = new data();
  recipe: Recipe = this.dataService.getRecipe(this.recipeId);

  @Listen("deleteClick")
  presentAlertConfirm() {
    const alertController = document.querySelector("ion-alert-controller");

    alertController
      .create({
        header: "Are you sure!",
        message: "Message <strong>text</strong>!!!",
        buttons: [
          {
            text: "Cancel",
            role: "cancel",
            cssClass: "secondary",
            handler: () => {
              console.log("Cancelled");
            }
          },
          {
            text: "Yes, Delete this recipe",
            handler: () => {
              this.deleteRecipe();
            }
          }
        ]
      })
      .then(alertElement => {
        alertElement.present();
      });
    return;
  }

  deleteRecipe() {
    this.dataService.deleteRecipe(this.recipeId);
    window.location.href = "/recipes";
  }

  render() {
    let ingredients = this.recipe.ingredients.map(item => {
      return <ion-item>{item}</ion-item>;
    });

    return [
      <app-header pageTitle={this.recipe.title} delete />,
      <ion-content>
        <ion-img src={this.recipe.imageUrl} />
        <ion-list>{ingredients}</ion-list>
      </ion-content>,
      <ion-alert-controller>{}</ion-alert-controller>
    ];
  }
}
