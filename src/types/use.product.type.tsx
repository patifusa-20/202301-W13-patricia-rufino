import { ProductStructure } from "./product.type";

export type UseProductStructure = {
    products: Array<ProductStructure>;
    handleLoad: () => void;
};
