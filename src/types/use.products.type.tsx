import { GenericStructure } from "./generic.type.ts";

export type UseProductsStructure = {
    allergen: GenericStructure;
    allergens: Array<GenericStructure>;
    category: GenericStructure;
    categories: Array<GenericStructure>;
    handleFilter: (category: GenericStructure) => void;
    handleAllergen: (allergen: GenericStructure) => void;
};
