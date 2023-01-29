import { GenericStructure } from "../types/generic.type";
import { ProductStructure } from "../types/product.type";

export class ProductModel implements ProductStructure {
    id: string;
    constructor(
        public productName: string,
        public image: string,
        public price: string,
        public category: Array<GenericStructure>,
        public allergens: Array<GenericStructure>
    ) {
        this.id = "temporal-id";
    }
}
