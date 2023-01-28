import { ProductsContext } from "../../context/products.context";
import { useContext } from "react";
import { Product } from "../product/product";
import "./products.scss";

export function Products() {
    const { products } = useContext(ProductsContext);
    return (
        <>
            <ul className="cards">
                {products.map((item) => {
                    return <Product product={item} key={item.id}></Product>;
                })}
            </ul>
        </>
    );
}
