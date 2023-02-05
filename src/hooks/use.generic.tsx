import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../context/products.context";
import { allergensData } from "../data/allergens.data";
import { GenericStructure } from "../types/generic.type";
import { UseGenericStructure } from "../types/use.generic.type";

export function useGeneric(): UseGenericStructure {
    const { categories } = useContext(ProductsContext);

    const allergens = allergensData;
    const initialAllergenState = allergens[0];
    const [allergen, setAllergen] = useState(initialAllergenState);

    const defaultCategory = categories[1];
    const [category, setCategory] = useState(defaultCategory);

    const initialStateModal = false;
    const [showModal, setModal] = useState(initialStateModal);

    const handleFilter = (filter: GenericStructure) => {
        categories.forEach((item) => (item.isFiltered = false));
        filter.isFiltered = true;
        setCategory({ ...filter });
    };
    const handleAllergen = (allergen: GenericStructure) => {
        setAllergen({ ...allergen });
    };
    const handleCategory = (category: GenericStructure) => {
        categories.forEach((item) => (item.isSelected = false));
        category.isSelected = true;
        setCategory({ ...category });
    };

    const handleModal = () => {
        setModal(!showModal);
    };

    useEffect(() => {
        category.isFiltered = true;
        category.isSelected = true;
    }, []);

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
