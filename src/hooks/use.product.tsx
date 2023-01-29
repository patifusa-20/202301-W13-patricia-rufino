import { useCallback, useEffect, useState } from "react";
import { ProductRepo } from "../repository/products.repo";
import { ProductStructure } from "../types/product.type";
import { UseProductStructure } from "../types/use.product.type";
export function useProduct(): UseProductStructure {
    const repo = new ProductRepo();
    const initialProductState: Array<ProductStructure> = [];

    const [products, setProducts] = useState(initialProductState);

    const handleLoad = useCallback(async () => {
        const productsLoad = await repo.load();
        setProducts(productsLoad);
    }, []);

    const handleAdd = async function (product: ProductStructure) {
        setProducts([...products, product]);
        await repo.create(product);
    };

    useEffect(() => {
        handleLoad();
    }, [handleLoad]);

    return { products, handleLoad, handleAdd };
}
