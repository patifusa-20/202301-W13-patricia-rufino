import { useMemo } from "react";
import { useGeneric } from "../hooks/use.generic";
import { useProduct } from "../hooks/use.product";
import { ProductsContext } from "./products.context";

export function ProductsContextProvider({
    children,
}: {
    children: JSX.Element;
}) {
    const {
        allergen,
        allergens,
        category,
        categories,
        showModal,
        handleFilter,
        handleAllergen,
        handleCategory,
        handleModal,
    } = useGeneric();

    const { products, handleLoad, handleAdd } = useProduct();

    const context = useMemo(
        () => ({
            products,
            allergen,
            allergens,
            category,
            categories,
            showModal,
            handleFilter,
            handleAllergen,
            handleCategory,
            handleLoad,
            handleAdd,
            handleModal,
        }),
        [
            products,
            allergen,
            allergens,
            category,
            categories,
            showModal,
            handleFilter,
            handleAllergen,
            handleCategory,
            handleLoad,
            handleAdd,
            handleModal,
        ]
    );

    return (
        <ProductsContext.Provider value={context}>
            {children}
        </ProductsContext.Provider>
    );
}
