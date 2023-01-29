import { GenericModel } from "../model/generic.model";

const noAllergen = new GenericModel(
    "Sin alérgenos",
    "./assets/icons/icon-no-allergen.svg"
);
const glutenAllergen = new GenericModel(
    "gluten",
    "./assets/icons/icon-gluten.svg"
);
const nutAllergen = new GenericModel("nut", "./assets/icons/icon-nut.svg");
const milkAllergen = new GenericModel("milk", "./assets/icons/icon-milk.svg");
export const allergensData = [
    noAllergen,
    glutenAllergen,
    nutAllergen,
    milkAllergen,
];
