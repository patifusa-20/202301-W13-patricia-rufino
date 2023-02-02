import { GenericStructure } from "./generic.type";
import { ProductStructure } from "./product.type";

export type ProductsContextStructure = {
    products: Array<ProductStructure>;
    allergen: GenericStructure;
    allergens: Array<GenericStructure>;
    category: GenericStructure;
    categories: Array<GenericStructure>;
    showModal: boolean;
    handleFilter: (category: GenericStructure) => void;
    handleAllergen: (allergen: GenericStructure) => void;
    handleCategory: (category: GenericStructure) => void;
    handleLoad: () => void;
    handleAdd: (product: ProductStructure) => void;
    handleModal: () => void;
    handleUpdate: (product: Partial<ProductStructure>) => void;
    handleDelete: (id: ProductStructure["id"]) => void;
};
