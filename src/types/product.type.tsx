import { GenericStructure } from "./generic.type";

export type ProductStructure = {
    id: string;
    productName: string;
    image: string;
    price: string;
    category: string;
    allergens: Array<GenericStructure>;
    isExtImage: boolean;
};
