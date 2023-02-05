import { GenericStructure } from "../types/generic.type";
import { ProductStructure } from "../types/product.type";

export class ProductModel implements ProductStructure {
    id: string;
    constructor(
        public productName: string,
        public image: string,
        public price: string,
        public category: string,
        public allergens: Array<GenericStructure>,
        public isExtImage: boolean
    ) {
        this.id = "temporal-id";
    }
}
