import { getAuth } from "firebase/auth";
import { useCallback, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { MenuRepo } from "../repository/menus.repo";
import { ProductRepo } from "../repository/products.repo";
import { UserRepo } from "../repository/users.repo";
import { MenuStructure } from "../types/menu.type";
import { ProductStructure } from "../types/product.type";
import { UseProductStructure } from "../types/use.product.type";
import { UserStructure } from "../types/user.type";
import * as actionCreator from "../reducers/products/action.creators";
import { productReducer } from "../reducers/products/product.reducer";

export function useProduct(): UseProductStructure {
    const repoUser = new UserRepo();
    const repoMenu = new MenuRepo();
    const repo = new ProductRepo();
    const initialProductState: Array<ProductStructure> = [];

    const navigate = useNavigate();

    const [products, dispatch] = useReducer(
        productReducer,
        initialProductState
    );

    const handleLoadMenuNotLoggedUser = async (idMenu: string) => {
        const menusLoad = await repoMenu.load();
        const menuPath = menusLoad.find(
            (menu) => menu.id === idMenu
        ) as MenuStructure;
        dispatch(actionCreator.productLoadActionCreator(menuPath.products));
    };

    const getLoggedUser = async () => {
        const usersLoad = await repoUser.load();
        const auth = getAuth();
        const currentUser = auth.currentUser;

        if (currentUser !== null) {
            const dataLoggedUser = usersLoad.find(
                (user) => user.id === currentUser.uid
            ) as UserStructure;
            return dataLoggedUser;
        }
    };

    const handleMenu = async () => {
        const dataLoggedUser = await getLoggedUser();
        if (dataLoggedUser !== undefined) {
            const idMenuUser = dataLoggedUser.menu.id;
            const menus = repoMenu.load();
            const menuUser = (await menus).find(
                (menu) => menu.id === idMenuUser
            ) as MenuStructure;
            return menuUser;
        }
    };

    const handleMenuAddProduct = async (newProduct: ProductStructure) => {
        const menuUser = await handleMenu();
        if (menuUser !== undefined) {
            const updatedMenu =
                menuUser.products !== undefined ? menuUser.products : [];
            updatedMenu.push(newProduct);
            menuUser.products = updatedMenu;
            await repoMenu.update(menuUser as Partial<MenuStructure>);
            dispatch(actionCreator.productLoadActionCreator(updatedMenu));
        }
    };

    const handleMenuUpdateProduct = async (
        product: Partial<ProductStructure>
    ) => {
        const menuUser = await handleMenu();
        const productsUser = menuUser?.products;
        const updateProductsUser = productsUser?.map((item) =>
            item.id === product.id ? { ...item, ...product } : item
        );
        (menuUser as MenuStructure).products =
            updateProductsUser as ProductStructure[];
        await repoMenu.update(menuUser as Partial<MenuStructure>);
        dispatch(
            actionCreator.productLoadActionCreator(
                updateProductsUser as ProductStructure[]
            )
        );
    };

    const handleMenuDeleteProduct = async (id: ProductStructure["id"]) => {
        const menuUser = await handleMenu();
        const productsUser = menuUser?.products;
        const updateProductsUser = productsUser?.filter(
            (item) => item.id !== id
        );
        (menuUser as MenuStructure).products =
            updateProductsUser as ProductStructure[];
        await repoMenu.update(menuUser as Partial<MenuStructure>);
        dispatch(
            actionCreator.productLoadActionCreator(
                updateProductsUser as ProductStructure[]
            )
        );
    };

    const handleLoad = useCallback(async () => {
        const menuUser = await handleMenu();
        if (menuUser !== undefined) {
            const productsUser =
                menuUser.products !== undefined ? menuUser.products : [];
            dispatch(actionCreator.productLoadActionCreator(productsUser));
        }
    }, []);

    const handleAdd = async function (product: ProductStructure) {
        dispatch(actionCreator.productAddActionCreator(product));
        const newIdProduct = await repo.create(product);
        product.id = Object.values(newIdProduct)[0] as unknown as string;
        handleMenuAddProduct({ ...product });

        navigate("products");
        handleLoad();
    };

    const handleUpdate = async function (product: Partial<ProductStructure>) {
        const updatedProduct = await repo.update(product);
        dispatch(actionCreator.productUpdateActionCreator(updatedProduct));

        handleMenuUpdateProduct(product);
        navigate("products");
        handleLoad();
    };

    const handleDelete = async function (id: ProductStructure["id"]) {
        const finalId = await repo.delete(id);
        dispatch(actionCreator.productDeleteActionCreator(finalId));
        handleMenuDeleteProduct(id);
        navigate("products");
        handleLoad();
    };

    useEffect(() => {
        handleLoad();
    }, []);

    return {
        products,
        handleLoad,
        handleAdd,
        handleUpdate,
        handleDelete,
        handleMenu,
        handleLoadMenuNotLoggedUser,
    };
}
