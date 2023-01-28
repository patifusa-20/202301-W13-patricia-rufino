import { ProductsContext } from "../../context/products.context";
import { useContext } from "react";
import { Filter } from "../filter/filter";
import "./filter.scss";

export function Filters() {
    const { categories } = useContext(ProductsContext);
    return (
        <>
            <ul className="filters">
                {categories.map((item) => {
                    return <Filter category={item} key={item.id}></Filter>;
                })}
            </ul>
        </>
    );
}
