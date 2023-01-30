import { useContext } from "react";
import { ProductsContext } from "../../context/products.context";
import { Category } from "../category/category";
import "./categories.scss";

export function Categories() {
    const { categories } = useContext(ProductsContext);
    return (
        <>
            <label className="add-product__label">Categorías*</label>
            <ul className="categories">
                {categories.map((item) => {
                    return <Category category={item} key={item.id}></Category>;
                })}
            </ul>
        </>
    );
}
