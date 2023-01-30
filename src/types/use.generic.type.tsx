import { GenericStructure } from "./generic.type";

export type UseGenericStructure = {
    allergen: GenericStructure;
    allergens: Array<GenericStructure>;
    category: GenericStructure;
    categories: Array<GenericStructure>;
    showModal: boolean;
    handleFilter: (category: GenericStructure) => void;
    handleAllergen: (allergen: GenericStructure) => void;
    handleCategory: (category: GenericStructure) => void;
    handleModal: () => void;
};
