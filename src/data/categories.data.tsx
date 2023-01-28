import { GenericModel } from "../model/generic.model";

const snackCategory = new GenericModel(
    "snack",
    "./assets/icons/icon-snack.svg"
);
const mealCategory = new GenericModel("meal", "./assets/icons/icon-meal.svg");
const dessertCategory = new GenericModel(
    "dessert",
    "./assets/icons/icon-dessert.svg"
);
const beverageCategory = new GenericModel(
    "beverage",
    "./assets/icons/icon-beverage.svg"
);

export const categoriesData = [
    snackCategory,
    mealCategory,
    dessertCategory,
    beverageCategory,
];
