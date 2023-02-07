import { GenericStructure } from "./generic.type";
import { MenuStructure } from "./menu.type";
import { ProductStructure } from "./product.type";
import { UserStructure } from "./user.type";

export type ProductsContextStructure = {
    userLogged: UserStructure;
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
    login: () => void;
    handleLoadUser: (user: UserStructure) => void;
    handleMenu: () => void;
};
