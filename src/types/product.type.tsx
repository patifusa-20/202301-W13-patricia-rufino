import { GenericStructure } from "./generic.type";

export type ProductStructure = {
    id: string;
    productName: string;
    image: string;
    price: string;
    category: Array<GenericStructure>;
    allergens: Array<GenericStructure>;
};
