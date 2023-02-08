import { GenericStructure } from "./generic.type";

export type UseGenericStructure = {
    id?: string;
    allergen: GenericStructure;
    allergens: Array<GenericStructure>;
    category: GenericStructure;
    categories: Array<GenericStructure>;
    showModal: boolean;
    showDrawer: boolean;
    handleFilter: (category: GenericStructure) => void;
    handleAllergen: (allergen: GenericStructure) => void;
    handleCategory: (category: GenericStructure) => void;
    handleModal: () => void;
    handleDrawer: () => void;
};
