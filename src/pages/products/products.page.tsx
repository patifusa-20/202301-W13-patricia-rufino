import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { Filters } from "../../components/filters/filters";
import { Products } from "../../components/products/products";
import { ProductsContext } from "../../context/products.context";

export default function ProductsPage() {
    const { userLogged } = useContext(ProductsContext);
    const location = useLocation();

    return (
        <>
            <section>
                {location.pathname !== "/products" ? (
                    <h1>Bienvenido</h1>
                ) : (
                    <h1>Hola {userLogged.userName}</h1>
                )}
                <Filters></Filters>
                <Products></Products>
            </section>
        </>
    );
}
