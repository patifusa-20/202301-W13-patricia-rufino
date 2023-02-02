import { ProductsContext } from "../../context/products.context";
import { useContext } from "react";
import { Product } from "../product/product";
import "./products.scss";
import { NewProduct } from "../new.product/new.product";

export function Products() {
    const { category, products } = useContext(ProductsContext);

    const productsCategorySelected = products.filter(
        (item) => item.category === category.name
    );

    return (
        <>
            <ul className="cards">
                <NewProduct></NewProduct>
                {productsCategorySelected.length ? (
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
