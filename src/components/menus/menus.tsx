import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { ProductsContext } from "../../context/products.context";
import "./menus.scss";

export function Menus() {
    const { users, handleUsersMenu } = useContext(ProductsContext);

    const getSiglas = (userName: string) => {
        const divideName = userName.split(" ");
        const firstWord = divideName[0].split("");
        const secondWord = divideName[1].split("");
        return firstWord[0] + "." + secondWord[0];
    };

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
                                    <p>{getSiglas(user.userName)}</p>
                                </div>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </>
    );
}
