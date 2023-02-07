import { getAuth } from "firebase/auth";
import { Filters } from "../../components/filters/filters";
import { Products } from "../../components/products/products";

export default function ProductsPage() {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    const userName = currentUser?.displayName;

    return (
        <>
            <section>
                <h1>Hola {userName}</h1>
                <Filters></Filters>
                <Products></Products>
            </section>
        </>
    );
}
