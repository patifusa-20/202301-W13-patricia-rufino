import { useMemo } from "react";
import { useGeneric } from "../hooks/use.generic";
import { useProduct } from "../hooks/use.product";
import { useUser } from "../hooks/use.user";
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

    const {
        products,
        handleLoad,
        handleAdd,
        handleUpdate,
        handleDelete,
        handleMenu,
    } = useProduct();

    const { userLogged, login, handleLoadUser } = useUser();

    const context = useMemo(
        () => ({
            userLogged,
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
            handleUpdate,
            handleDelete,
            login,
            handleLoadUser,
            handleMenu,
        }),
        [
            userLogged,
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
            handleUpdate,
            handleDelete,
            login,
            handleLoadUser,
            handleMenu,
        ]
    );

    return (
        <ProductsContext.Provider value={context}>
            {children}
        </ProductsContext.Provider>
    );
}
