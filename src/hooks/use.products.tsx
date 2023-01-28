import { useState } from "react";
import { categoriesData } from "../data/categories.data";
import { GenericStructure } from "../types/generic.type.ts";
import { UseProductsStructure } from "../types/use.products.type";

export function useProducts(): UseProductsStructure {
    const items = categoriesData;
    const initialCategoryState = items[0];
    const [item, setItem] = useState(initialCategoryState);

    const handleFilter = (item: GenericStructure) => {
        setItem({ ...item });
    };
    return { item, items, handleFilter };
}
