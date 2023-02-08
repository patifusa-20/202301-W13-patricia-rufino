import { getAuth } from "firebase/auth";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductsContext } from "../../context/products.context";
import { Drawer } from "../drawer/drawer";
import "./header.scss";
export function Header() {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    const { showModal, handleModal } = useContext(ProductsContext);

    const handleClickModal = () => {
        handleModal();
    };

    return (
        <header aria-label="title">
            <Link to={"./"}>
                <h1>
                    <span>MIY</span> - Menu it yourself
                </h1>
            </Link>
            {currentUser !== null ? (
                <button
                    type="button"
                    className="icon-btn"
                    onClick={handleClickModal}
                >
                    <img src="./assets/icons/icon-user.svg"></img>
                </button>
            ) : (
                ""
            )}
            {showModal ? <Drawer></Drawer> : ""}
        </header>
    );
}
