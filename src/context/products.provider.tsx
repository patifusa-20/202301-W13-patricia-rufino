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
        showDrawer,
        handleFilter,
        handleAllergen,
        handleCategory,
        handleModal,
        handleDrawer,
    } = useGeneric();

    const {
        products,
        handleLoad,
        handleAdd,
        handleUpdate,
        handleDelete,
        handleMenu,
        handleLoadMenuNotLoggedUser,
    } = useProduct();

    const {
        userLogged,
        users,
        handleUsersMenu,
        login,
        logout,
        handleLoadUser,
    } = useUser();

    const context = useMemo(
        () => ({
            userLogged,
            users,
            handleUsersMenu,
            products,
            allergen,
            allergens,
            category,
            categories,
            showModal,
            showDrawer,
            handleFilter,
            handleAllergen,
            handleCategory,
            handleLoad,
            handleAdd,
            handleModal,
            handleDrawer,
            handleUpdate,
            handleDelete,
            login,
            logout,
            handleLoadUser,
            handleMenu,
            handleLoadMenuNotLoggedUser,
        }),
        [
            userLogged,
            users,
            handleUsersMenu,
            products,
            allergen,
            allergens,
            category,
            categories,
            showModal,
            showDrawer,
            handleFilter,
            handleAllergen,
            handleCategory,
            handleLoad,
            handleAdd,
            handleModal,
            handleDrawer,
            handleUpdate,
            handleDelete,
            login,
            logout,
            handleLoadUser,
            handleMenu,
            handleLoadMenuNotLoggedUser,
        ]
    );

    return (
        <ProductsContext.Provider value={context}>
            {children}
        </ProductsContext.Provider>
    );
}
