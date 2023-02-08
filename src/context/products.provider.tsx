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
        handleLoadNotUserMenu,
    } = useProduct();

    const { userLogged, login, logout, handleLoadUser } = useUser();

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
            logout,
            handleLoadUser,
            handleMenu,
            handleLoadNotUserMenu,
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
            logout,
            handleLoadUser,
            handleMenu,
            handleLoadNotUserMenu,
        ]
    );

    return (
        <ProductsContext.Provider value={context}>
            {children}
        </ProductsContext.Provider>
    );
}
