import { ProductsContext } from "../../context/products.context";
import { useContext, useEffect } from "react";
import { Product } from "../product/product";
import "./products.scss";
import { NewProduct } from "../new.product/new.product";
import { useLocation } from "react-router-dom";

export function Products() {
    const { category, products, handleLoad, handleLoadMenuNotLoggedUser } =
        useContext(ProductsContext);

    const location = useLocation();

    const productsCategorySelected = products?.filter(
        (item) => item.category === category.name
    );

    useEffect(() => {
        if (location.pathname !== "/products") {
            const idMenu = location.pathname.split("/")[2];
            handleLoadMenuNotLoggedUser(idMenu);
        } else {
            handleLoad();
        }
    }, []);

    return (
        <>
            <ul className="cards">
                {location.pathname === "/products" ? (
                    <NewProduct></NewProduct>
                ) : (
                    ""
                )}
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
