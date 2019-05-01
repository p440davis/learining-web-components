import { Recipe } from "./recipe.model";

export class data {
  private recipes: Recipe[] = [
    {
      id: "r1",
      title: "Pizza",
      imageUrl:
        "https://lh3.googleusercontent.com/-aEDW077jjuc/WjGSPYQOplI/AAAAAAAAFXU/focIxFN55TU9tfRIoAfAPeRAJMuOLFhnACEwYBhgL/w140-h139-p/IMG_20160704_182636.jpg",
      ingredients: ["flour", "yeast", "tomato", "cheese"]
    },
    {
      id: "r2",
      title: "Garlic pizza",
      imageUrl:
        "https://lh3.googleusercontent.com/-aEDW077jjuc/WjGSPYQOplI/AAAAAAAAFXU/focIxFN55TU9tfRIoAfAPeRAJMuOLFhnACEwYBhgL/w140-h139-p/IMG_20160704_182636.jpg",
      ingredients: ["flour", "yeast", "tomato", "cheese", "garlic"]
    }
  ];

  constructor() {}

  getAllRecipes() {
    return [...this.recipes];
  }

  getRecipe(recipeId: string) {
    return {
      ...this.recipes.find(recipe => {
        return recipe.id === recipeId;
      })
    };
  }

  deleteRecipe(recipeId: string) {
    console.log(recipeId);
    this.recipes = this.recipes.filter(item => {
      return item.id !== recipeId;
    });
  }
}
