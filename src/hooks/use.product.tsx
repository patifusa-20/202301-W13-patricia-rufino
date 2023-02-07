import { getAuth } from "firebase/auth";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MenuRepo } from "../repository/menus.repo";
import { ProductRepo } from "../repository/products.repo";
import { UserRepo } from "../repository/users.repo";
import { MenuStructure } from "../types/menu.type";
import { ProductStructure } from "../types/product.type";
import { UseProductStructure } from "../types/use.product.type";
import { UserStructure } from "../types/user.type";
export function useProduct(): UseProductStructure {
    const repoUser = new UserRepo();
    const repoMenu = new MenuRepo();
    const repo = new ProductRepo();
    const initialProductState: Array<ProductStructure> = [];

    const navigate = useNavigate();

    const [products, setProducts] = useState(initialProductState);

    const getLoggedUser = async () => {
        const usersLoad = await repoUser.load();
        const auth = getAuth();
        const currentUser = auth.currentUser;

        if (currentUser !== null) {
            const dataUserLogged = usersLoad.find(
                (user) => user.id === currentUser.uid
            ) as UserStructure;
            return dataUserLogged;
        } else {
            console.log("Sesión caducada");
            navigate("/");
        }
    };

    const handleMenu = async () => {
        const dataUserLogged = await getLoggedUser();
        if (dataUserLogged !== undefined) {
            const idMenuUser = dataUserLogged.menu.id;
            const menus = repoMenu.load();
            const menuUser = (await menus).find(
                (menu) => menu.id === idMenuUser
            ) as MenuStructure;
            return await menuUser;
        }
    };

    const handleMenuAddProduct = async (newProduct: ProductStructure) => {
        const menuUser = await handleMenu();
        if (menuUser !== undefined) {
            menuUser.products !== undefined
                ? menuUser.products
                : (menuUser.products = []);
        }
        menuUser?.products.push(newProduct);
        const updatedMenu = menuUser?.products;
        await repoMenu.update(menuUser as Partial<MenuStructure>);
        setProducts(updatedMenu as ProductStructure[]);
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
        setProducts(updateProductsUser as ProductStructure[]);
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
        setProducts(updateProductsUser as ProductStructure[]);
    };

    const handleLoad = useCallback(async () => {
        const productsLoad = await handleMenu();
        const productsUser = productsLoad?.products;
        setProducts(productsUser as ProductStructure[]);
    }, []);

    const handleAdd = async function (product: ProductStructure) {
        setProducts([...products, product]);
        const newIdProduct = await repo.create(product);
        product.id = Object.values(newIdProduct)[0] as unknown as string;
        handleMenuAddProduct({ ...product });

        navigate("products");
    };

    const handleUpdate = async function (product: Partial<ProductStructure>) {
        setProducts(
            products.map((item) =>
                item.id === product.id ? { ...item, ...product } : item
            )
        );
        await repo.update(product);
        handleMenuUpdateProduct(product);
        navigate("products");
    };

    const handleDelete = async function (id: ProductStructure["id"]) {
        setProducts(products.filter((item) => item.id !== id));
        await repo.delete(id);
        handleMenuDeleteProduct(id);
        navigate("products");
    };

    return {
        products,
        handleLoad,
        handleAdd,
        handleUpdate,
        handleDelete,
        handleMenu,
    };
}
