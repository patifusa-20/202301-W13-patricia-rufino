import { GenericStructure } from "./generic.type";
import { ProductStructure } from "./product.type";

export type ProductsContextStructure = {
    products: Array<ProductStructure>;
    allergen: GenericStructure;
    allergens: Array<GenericStructure>;
    category: GenericStructure;
    categories: Array<GenericStructure>;
    handleFilter: (category: GenericStructure) => void;
    handleAllergen: (allergen: GenericStructure) => void;
    handleLoad: () => void;
};
