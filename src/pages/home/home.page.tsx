import { getAuth } from "firebase/auth";
import { Link } from "react-router-dom";
import { Login } from "../../components/login/login";
import { Menus } from "../../components/menus/menus";

export default function HomePage() {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    const userName = currentUser?.displayName;
    console.log(currentUser);
    console.log("El usuario " + userName + " está logado");
    return (
        <>
            <section>
                <h1>Crea el menú de tu restaurante</h1>
                <h2>
                    Diseña y actualiza fácilmente la carta digital de tu
                    restaurante
                </h2>
                {currentUser === null ? (
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
