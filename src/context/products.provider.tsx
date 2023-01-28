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
        handleFilter,
        handleAllergen,
    } = useGeneric();

    const { products, handleLoad } = useProduct();

    const context = useMemo(
        () => ({
            products,
            allergen,
            allergens,
            category,
            categories,
            handleFilter,
            handleAllergen,
            handleLoad,
        }),
        [
            products,
            allergen,
            allergens,
            category,
            categories,
            handleFilter,
            handleAllergen,
            handleLoad,
        ]
    );

    return (
        <ProductsContext.Provider value={context}>
            {children}
        </ProductsContext.Provider>
    );
}
