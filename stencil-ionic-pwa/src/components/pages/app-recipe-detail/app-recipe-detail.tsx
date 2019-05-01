import { Component, Listen, Prop } from "@stencil/core";
import { Recipe } from "../../../data/recipe.model";
import { data } from "../../../data/recipes.data";

@Component({
  tag: "app-recipe-detail"
})
export class RecipeDetail {
  @Prop() name: string;

  dataService = new data();
  recipe() {
    if (this.name) {
      return this.dataService.getRecipe(this.name);
    }
    return null;
  }

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
    this.dataService.deleteRecipe(this.name);
    console.log("sky");
    //window.location.href = "/recipes";
  }

  render() {
    let recipe: Recipe = this.recipe();
    let ingredients = recipe.ingredients.map(item => {
      return <ion-item>{item}</ion-item>;
    });

    return [
      <app-header pageTitle={recipe.title} delete />,
      <ion-content>
        <ion-img src={recipe.imageUrl} />
        <ion-list>{ingredients}</ion-list>
      </ion-content>,
      <ion-alert-controller>{}</ion-alert-controller>
    ];
  }
}
