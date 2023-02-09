import { useContext } from "react";
import { ProductsContext } from "../../context/products.context";
export function Login() {
    const { login } = useContext(ProductsContext);

    const handleLogin = () => {
        login();
    };

    return (
        <>
            <button type="button" className="primary-btn" onClick={handleLogin}>
                Iniciar sesión con Google
            </button>
        </>
    );
}
