import { ProductStructure } from "./product.type";

export type UseProductStructure = {
    products: Array<ProductStructure>;
    handleLoad: () => void;
    handleAdd: (product: ProductStructure) => void;
};
