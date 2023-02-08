import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "../firebase.config";
import { UserRepo } from "../repository/users.repo";
import { UserStructure } from "../types/user.type";
import { MenuRepo } from "../repository/menus.repo";
import { useCallback, useContext, useState } from "react";
import { ProductStructure } from "../types/product.type";
import { useNavigate } from "react-router-dom";
import { UseUserStructure } from "../types/use.user.type";
import { MenuStructure } from "../types/menu.type";
import { ProductsContext } from "../context/products.context";
export function useUser(): UseUserStructure {
    const repoMenu = new MenuRepo();
    const repoUser = new UserRepo();

    const { handleModal } = useContext(ProductsContext);

    const navigate = useNavigate();

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
        let usersLoad: Array<UserStructure>;
        try {
            usersLoad = await repoUser.load();
            getUsers(usersLoad, currentUser);
        } catch {
            handleAddUser(currentUser);
        }
    }, []);

    const logout = async () => {
        await signOut(auth)
            .then(() => {
                handleModal();
                navigate("/");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return { userLogged, handleLoadUser, login, logout };
}
