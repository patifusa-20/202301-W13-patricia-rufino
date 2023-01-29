import { useState } from "react";
import { allergensData } from "../data/allergens.data";
import { categoriesData } from "../data/categories.data";
import { GenericStructure } from "../types/generic.type";
import { UseGenericStructure } from "../types/use.generic.type";

export function useGeneric(): UseGenericStructure {
    const categories = categoriesData;
    const initialCategoryState = categories[0];
    const [category, setCategory] = useState(initialCategoryState);

    const allergens = allergensData;
    const initialAllergenState = allergens[0];
    const [allergen, setAllergen] = useState(initialAllergenState);

    const handleFilter = (category: GenericStructure) => {
        setCategory({ ...category });
    };
    const handleAllergen = (allergen: GenericStructure) => {
        setAllergen({ ...allergen });
    };

    return {
        allergen,
        allergens,
        category,
        categories,
        handleFilter,
        handleAllergen,
    };
}