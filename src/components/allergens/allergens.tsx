import { ProductsContext } from "../../context/products.context";
import { useContext } from "react";
import { Allergen } from "../allergen/allergen";
import "./allergens.scss";

export function Allergens() {
    const { allergens } = useContext(ProductsContext);
    return (
        <>
            <ul className="allergens">
                {allergens.map((item) => {
                    return <Allergen allergen={item} key={item.id}></Allergen>;
                })}
            </ul>
        </>
    );
}
