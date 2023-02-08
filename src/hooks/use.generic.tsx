import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ProductsContext } from "../context/products.context";
import { allergensData } from "../data/allergens.data";
import { GenericStructure } from "../types/generic.type";
import { UseGenericStructure } from "../types/use.generic.type";

export function useGeneric(): UseGenericStructure {
    const { category: categorySelected, categories } =
        useContext(ProductsContext);

    const location = useLocation();

    const defaultCategory =
        location.pathname === "/add-product" ? categories[1] : categorySelected;

    const allergens = allergensData;
    const initialAllergenState = allergens[0];
    const [allergen, setAllergen] = useState(initialAllergenState);

    const [category, setCategory] = useState(defaultCategory);

    const initialStateModal = false;
    const [showModal, setModal] = useState(initialStateModal);

    const initialStateDrawer = false;
    const [showDrawer, setDrawer] = useState(initialStateDrawer);

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

    const handleDrawer = () => {
        setDrawer(!showDrawer);
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
        showDrawer,
        handleFilter,
        handleAllergen,
        handleCategory,
        handleModal,
        handleDrawer,
    };
}
