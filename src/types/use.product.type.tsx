import { MenuStructure } from "./menu.type";
import { ProductStructure } from "./product.type";

export type UseProductStructure = {
    products: Array<ProductStructure>;
    handleLoad: () => void;
    handleAdd: (product: ProductStructure) => void;
    handleUpdate: (product: Partial<ProductStructure>) => void;
    handleDelete: (id: ProductStructure["id"]) => void;
    handleMenu: () => void;
};
