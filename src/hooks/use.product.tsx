import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductsContext } from "../context/products.context";
import { ProductRepo } from "../repository/products.repo";
import { ProductStructure } from "../types/product.type";
import { UseProductStructure } from "../types/use.product.type";
export function useProduct(): UseProductStructure {
    const { user } = useContext(ProductsContext);

    const repo = new ProductRepo();
    const initialProductState: Array<ProductStructure> = [];

    const navigate = useNavigate();

    const [products, setProducts] = useState(initialProductState);

    const handleLoad = useCallback(async () => {
        const productsLoad = await repo.load();
        setProducts(productsLoad);
        console.log(user);
    }, []);

    const handleAdd = async function (product: ProductStructure) {
        setProducts([...products, product]);
        const newProduct = await repo.create(product);
        user.menu.products.push(newProduct);
        console.log(user);
        //const idFirebase = newProduct.name;
        await repo.update({ ...product });
        navigate("products");
    };

    const handleUpdate = async function (product: Partial<ProductStructure>) {
        setProducts(
            products.map((item) =>
                item.id === product.id ? { ...item, ...product } : item
            )
        );
        await repo.update(product);
        navigate("products");
    };

    const handleDelete = async function (id: ProductStructure["id"]) {
        setProducts(products.filter((item) => item.id !== id));
        await repo.delete(id);
        navigate("products");
    };

    useEffect(() => {
        handleLoad();
    }, [handleLoad]);

    return { products, handleLoad, handleAdd, handleUpdate, handleDelete };
}
