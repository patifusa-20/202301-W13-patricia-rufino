import { ProductStructure } from "./product.type";

export type MenuStructure = {
    id: string;
    products: Array<ProductStructure>;
};
