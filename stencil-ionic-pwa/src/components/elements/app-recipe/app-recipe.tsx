import { Component, Prop } from "@stencil/core";

@Component({
  tag: "app-recipe"
})
export class AppRecipe {
  @Prop() id: string;
  @Prop() recipeTitle: string;
  @Prop() image: string;
  @Prop() ingredients: string[];

  render() {
    return [
      <ion-item href={"recipes/" + this.id}>
        <ion-avatar slot="start">
          <ion-img src={this.image} />
        </ion-avatar>
        <ion-label>{this.recipeTitle}</ion-label>
      </ion-item>
    ];
  }
}
