import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ProductsContext } from "../context/products.context";
import { GenericStructure } from "../types/generic.type";
import { UseGenericStructure } from "../types/use.generic.type";

export function useGeneric(): UseGenericStructure {
    const {
        category: categorySelected,
        categories: categoriesContext,
        allergens,
    } = useContext(ProductsContext);

    const location = useLocation();

    const defaultCategory =
        location.pathname === "/add-product"
            ? categoriesContext[0]
            : categorySelected;

    const initialAllergenState = allergens[0];
    const [allergen, setAllergen] = useState(initialAllergenState);

    const [category, setCategory] = useState(defaultCategory);

    const [categories, setCategoriesUpdated] = useState(categoriesContext);

    const initialStateModal = false;
    const [showModal, setModal] = useState(initialStateModal);

    const initialStateDrawer = false;
    const [showDrawer, setDrawer] = useState(initialStateDrawer);

    const handleFilter = (filter: GenericStructure) => {
        setCategory({ ...filter, isFiltered: true });

        setCategoriesUpdated(
            categories.map((item) =>
                item.id === filter.id
                    ? { ...item, isFiltered: true }
                    : { ...item, isFiltered: false }
            )
        );
    };
    const handleAllergen = (allergen: GenericStructure) => {
        allergen.isSelected = !allergen.isSelected;
        setAllergen({ ...allergen });
    };
    const handleCategory = (category: GenericStructure) => {
        categories.forEach((item) => (item.isSelected = false));
        setCategory({ ...category, isSelected: true });
    };

    const handleModal = () => {
        setModal(!showModal);
    };

    const handleDrawer = () => {
        setDrawer(!showDrawer);
    };

    const handleError = (error: Error) => {
        return `${error} Ups, algo no ha ido bien. Por favor, inténtalo de nuevo`;
    };

    useEffect(() => {
        setCategory({ ...category, isFiltered: true });
        handleFilter(category);
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
        handleError,
    };
}
