import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserRepo } from "../../repository/users.repo";
import { UserStructure } from "../../types/user.type";
import "./menus.scss";

export function Menus() {
    const repoUser = new UserRepo();

    const initialStateUsers: Array<UserStructure> = [];

    const [users, setUsers] = useState(initialStateUsers);

    const handleUsersMenu = useCallback(async () => {
        const usersLoad = await repoUser.load();
        setUsers(usersLoad);
        return usersLoad;
    }, []);

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
