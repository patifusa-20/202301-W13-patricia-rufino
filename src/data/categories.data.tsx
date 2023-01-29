import { GenericModel } from "../model/generic.model";

const snackCategory = new GenericModel(
    "Tapas",
    "./assets/icons/icon-snack.svg"
);
const mealCategory = new GenericModel(
    "Comidas",
    "./assets/icons/icon-meal.svg"
);
const dessertCategory = new GenericModel(
    "Postres",
    "./assets/icons/icon-dessert.svg"
);
const beverageCategory = new GenericModel(
    "Bebidas",
    "./assets/icons/icon-beverage.svg"
);

export const categoriesData = [
    snackCategory,
    mealCategory,
    dessertCategory,
    beverageCategory,
];
