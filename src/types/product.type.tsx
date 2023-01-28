import { GenericStructure } from "./generic.type";

export type ProductStructure = {
    id: string;
    name: string;
    image: string;
    price: string;
    category: GenericStructure;
    allergens: Array<GenericStructure>;
};
