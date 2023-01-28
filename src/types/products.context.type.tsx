import { GenericStructure } from "./generic.type.ts";

export type ProductsContextStructure = {
    item: GenericStructure;
    items: Array<GenericStructure>;
    handleFilter: (item: GenericStructure) => void;
};
