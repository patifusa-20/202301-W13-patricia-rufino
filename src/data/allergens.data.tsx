import { GenericModel } from "../model/generic.model";

const glutenAllergen = new GenericModel(
    "gluten",
    "./assets/icons/icon-gluten.svg"
);
const nutAllergen = new GenericModel("nut", "./assets/icons/icon-nut.svg");
const milkAllergen = new GenericModel("milk", "./assets/icons/icon-milk.svg");
export const allergensData = [glutenAllergen, nutAllergen, milkAllergen];
