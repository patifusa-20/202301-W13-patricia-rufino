import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { ProductsContext } from "../../context/products.context";
import "./menus.scss";

export function Menus() {
    const { users, handleUsersMenu } = useContext(ProductsContext);

    useEffect(() => {
        handleUsersMenu();
    }, [handleUsersMenu]);

    return (
        <>
            <h3>Cartas hechas por nuestros usuarios</h3>
            <ul className="menus">
                {users.map((user) => {
                    return (
                        <li key={user.id}>
                            <Link to={`/menu/${user.menu.id}`}>
                                <div
                                    className="menus__card"
                                    style={{
                                        backgroundImage: `url(./assets/img/bg-menu.jpg)`,
                                    }}
                                >
                                    <p>{user.userName}</p>
                                </div>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </>
    );
}
