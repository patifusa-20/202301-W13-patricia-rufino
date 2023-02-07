import { useContext } from "react";
import { ProductsContext } from "../../context/products.context";
import { useUser } from "../../hooks/use.user";
export function Login() {
    const { login } = useContext(ProductsContext);
    const { logout } = useUser();

    const handleLogin = () => {
        login();
    };

    const handleLogout = () => {
        logout();
    };

    return (
        <>
            <button type="button" className="primary-btn" onClick={handleLogin}>
                Login
            </button>
            <button
                type="button"
                className="primary-btn"
                onClick={handleLogout}
            >
                Logout
            </button>
        </>
    );
}
