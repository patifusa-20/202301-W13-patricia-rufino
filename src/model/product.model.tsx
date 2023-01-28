import { GenericStructure } from "../types/generic.type";
import { ProductStructure } from "../types/product.type";

export class ProductModel implements ProductStructure {
    constructor(
        public id: string,
        public name: string,
        public price: string,
        public image: string,
        public category: GenericStructure,
        public allergens: Array<GenericStructure>
    ) {}
}
