import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "../firebase.config";
import { UserRepo } from "../repository/users.repo";
import { UserStructure } from "../types/user.type";
import { MenuRepo } from "../repository/menus.repo";
import { useCallback, useState } from "react";
import { ProductStructure } from "../types/product.type";
import { useNavigate } from "react-router-dom";
import { UseUserStructure } from "../types/use.user.type";
import { MenuStructure } from "../types/menu.type";
export function useUser(): UseUserStructure {
    const repoMenu = new MenuRepo();
    const repoUser = new UserRepo();

    const navigate = useNavigate();

    const initialStateUsers: Array<UserStructure> = [];
    const [users, setUsers] = useState(initialStateUsers);

    const handleUsersMenu = useCallback(async () => {
        const usersLoad = await repoUser.load();
        setUsers(usersLoad);
        return usersLoad;
    }, []);

    const menuUser: MenuStructure = {
        id: "",
        name: "",
        products: [] as Array<ProductStructure>,
    };

    const initialStateUser: UserStructure = {
        userName: "",
        id: "",
        token: "",
        menu: menuUser,
    };

    const [userLogged, setUser] = useState(initialStateUser);

    const login = async () => {
        const provider = new GoogleAuthProvider();
        const userCredentials = await signInWithPopup(auth, provider);

        // Actualizamos los datos en el estado para indicar que se acaba de logar tal usuario
        userLogged.id = userCredentials.user.uid;
        userLogged.userName = userCredentials.user.displayName as string;
        userLogged.token = await userCredentials.user.getIdToken();
        const currentUser = userLogged;
        setUser(currentUser);
        handleLoadUser(currentUser);
    };

    const handleAddUser = async (user: UserStructure) => {
        const userMenu = await repoMenu.create(user.menu);
        user.menu.id = userMenu.name;
        await repoUser.create(user);
        navigate("/products");
    };

    const getUsers = async (
        usersLoad: Array<UserStructure>,
        currentUser: UserStructure
    ) => {
        const userWithAccount = usersLoad.find(
            (user: UserStructure) => user.id === currentUser.id
        );
        if (userWithAccount) {
            navigate("/products");
        } else {
            handleAddUser(currentUser);
        }
    };

    const handleLoadUser = useCallback(async (currentUser: UserStructure) => {
        const usersLoad: Array<UserStructure> = await repoUser.load();
        usersLoad
            ? getUsers(usersLoad, currentUser)
            : handleAddUser(currentUser);
    }, []);

    const logout = () => {
        signOut(auth);
        console.log("El usuario ha cerrado la sesión con logout");
    };

    return {
        userLogged,
        users,
        handleUsersMenu,
        handleLoadUser,
        login,
        logout,
    };
}
