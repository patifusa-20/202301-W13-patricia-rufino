import { useMemo } from "react";
import { useProducts } from "../hooks/use.products";
import { ProductsContext } from "./products.context";

export function ProductsContextProvider({
    children,
}: {
    children: JSX.Element;
}) {
    const { item, items, handleFilter } = useProducts();

    const context = useMemo(
        () => ({ item, items, handleFilter }),
        [item, handleFilter]
    );

    return (
        <ProductsContext.Provider value={context}>
            {children}
        </ProductsContext.Provider>
    );
}
