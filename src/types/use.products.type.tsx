import { GenericStructure } from "./generic.type.ts";

export type UseProductsStructure = {
    item: GenericStructure;
    items: Array<GenericStructure>;
    handleFilter: (item: GenericStructure) => void;
};
