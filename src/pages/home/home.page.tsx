import { useContext } from "react";
import { Link } from "react-router-dom";
import { Login } from "../../components/login/login";
import { Menus } from "../../components/menus/menus";
import { ProductsContext } from "../../context/products.context";

export default function HomePage() {
    const { userLogged } = useContext(ProductsContext);

    return (
        <>
            <section>
                <h1>Crea el menú de tu restaurante</h1>
                <h2>
                    Diseña y actualiza fácilmente la carta digital de tu
                    restaurante
                </h2>
                {userLogged.id.length <= 0 ? (
                    <Login></Login>
                ) : (
                    <Link to={"./products"}>
                        <div className="primary-btn">Ver mi carta</div>
                    </Link>
                )}

                <Menus></Menus>
            </section>
        </>
    );
}
