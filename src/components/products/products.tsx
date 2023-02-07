import { ProductsContext } from "../../context/products.context";
import { useContext, useEffect } from "react";
import { Product } from "../product/product";
import "./products.scss";
import { NewProduct } from "../new.product/new.product";

export function Products() {
    const { category, products, handleLoad } = useContext(ProductsContext);

    const productsCategorySelected = products?.filter(
        (item) => item.category === category.name
    );

    useEffect(() => {
        handleLoad();
    }, [handleLoad]);

    return (
        <>
            <ul className="cards">
                <NewProduct></NewProduct>
                {productsCategorySelected !== undefined ? (
                    productsCategorySelected.map((item) => (
                        <Product product={item} key={item.id}></Product>
                    ))
                ) : (
                    <li>
                        <p>No hay productos para la categoría seleccionada</p>
                    </li>
                )}
            </ul>
        </>
    );
}
