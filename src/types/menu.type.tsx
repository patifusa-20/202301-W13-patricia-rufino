import { ProductStructure } from "./product.type";

export type MenuStructure = {
    id: string;
    name: string;
    products: Array<ProductStructure>;
};
