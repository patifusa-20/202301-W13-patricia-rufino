import { useMemo } from "react";
import { useProducts } from "../hooks/use.products";
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
        handleFilter,
        handleAllergen,
    } = useProducts();

    const context = useMemo(
        () => ({
            allergen,
            allergens,
            category,
            categories,
            handleFilter,
            handleAllergen,
        }),
        [
            allergen,
            allergens,
            category,
            categories,
            handleFilter,
            handleAllergen,
        ]
    );

    return (
        <ProductsContext.Provider value={context}>
            {children}
        </ProductsContext.Provider>
    );
}
