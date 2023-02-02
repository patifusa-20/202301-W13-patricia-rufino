import { useState } from "react";
import { allergensData } from "../data/allergens.data";
import { categoriesData } from "../data/categories.data";
import { GenericStructure } from "../types/generic.type";
import { UseGenericStructure } from "../types/use.generic.type";

export function useGeneric(): UseGenericStructure {
    const categories = categoriesData;
    const defaultFilter = categories[1];
    const [category, setCategory] = useState(defaultFilter);

    const allergens = allergensData;
    const initialAllergenState = allergens[0];
    const [allergen, setAllergen] = useState(initialAllergenState);

    const initialStateModal = false;
    const [showModal, setModal] = useState(initialStateModal);

    const handleFilter = (category: GenericStructure) => {
        setCategory({ ...category });
    };
    const handleAllergen = (allergen: GenericStructure) => {
        setAllergen({ ...allergen });
    };
    const handleCategory = (category: GenericStructure) => {
        setCategory({ ...category });
    };

    const handleModal = () => {
        setModal(!showModal);
    };

    return {
        allergen,
        allergens,
        category,
        categories,
        showModal,
        handleFilter,
        handleAllergen,
        handleCategory,
        handleModal,
    };
}
