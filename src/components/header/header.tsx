import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { ProductsContext } from "../../context/products.context";
import { Drawer } from "../drawer/drawer";
import "./header.scss";
export function Header() {
    const { userLogged, showDrawer, handleDrawer } =
        useContext(ProductsContext);

    const handleClickDrawer = () => {
        handleDrawer();
    };

    useEffect(() => {
        userLogged;
    }, [userLogged]);

    return (
        <header aria-label="title">
            <Link to={"./"}>
                <h1>
                    <span>MIY</span> - Menu it yourself
                </h1>
            </Link>
            {userLogged.id.length <= 0 ? (
                ""
            ) : (
                <button
                    type="button"
                    className="icon-btn"
                    onClick={handleClickDrawer}
                >
                    <img src="./assets/icons/icon-user.svg"></img>
                </button>
            )}
            {showDrawer ? <Drawer></Drawer> : ""}
        </header>
    );
}
