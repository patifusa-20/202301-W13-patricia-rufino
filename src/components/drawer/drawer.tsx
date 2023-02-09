import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProductsContext } from "../../context/products.context";
import "./drawer.scss";

export function Drawer() {
    const { userLogged, handleDrawer, logout } = useContext(ProductsContext);
    const navigate = useNavigate();

    const handleClickDrawer = () => {
        handleDrawer();
    };

    const handleLogout = () => {
        logout();
        userLogged.userName = "";
        userLogged.id = "";
        userLogged.token = "";
        handleDrawer();
        navigate("/");
    };

    return (
        <>
            <div className="drawer__back">
                <div className="drawer">
                    <div className="drawer__header">
                        <h3>Perfil de usuario</h3>
                        <button type="button" onClick={handleClickDrawer}>
                            <img
                                src="../../assets/icons/icon-close.svg"
                                alt="Close modal"
                            ></img>
                        </button>
                    </div>
                    <div className="drawer__body">
                        <button
                            type="button"
                            className="primary-btn"
                            onClick={handleLogout}
                        >
                            Cerrar sesión
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
