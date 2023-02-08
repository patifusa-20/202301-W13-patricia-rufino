import { useContext } from "react";
import { ProductsContext } from "../../context/products.context";
import "./drawer.scss";

export function Drawer() {
    const { userLogged, handleModal, logout } = useContext(ProductsContext);

    const handleClickModal = () => {
        handleModal();
    };

    const handleLogout = () => {
        logout();
        userLogged.userName = "";
        userLogged.id = "";
        userLogged.token = "";
    };

    return (
        <>
            <div className="drawer__back">
                <div className="drawer">
                    <div className="drawer__header">
                        <h3>Perfil de usuario</h3>
                        <button type="button" onClick={handleClickModal}>
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
