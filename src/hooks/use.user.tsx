import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "../firebase.config";
import { UserRepo } from "../repository/users.repo";
import { UserStructure } from "../types/user.type";
import { MenuRepo } from "../repository/menus.repo";
import { useCallback, useEffect, useState } from "react";
import { ProductStructure } from "../types/product.type";
import { useNavigate } from "react-router-dom";
import { MenuStructure } from "../types/menu.type";
import { UseUserStructure } from "../types/use.user.type";
export function useUser(): UseUserStructure {
    const repoMenu = new MenuRepo();
    const repoUser = new UserRepo();

    const navigate = useNavigate();

    const state = {
        user: {
            userName: "",
            id: "",
            token: "",
            menu: { id: "", products: [] as Array<ProductStructure> },
        },
    };

    const initialStateUser = state.user;

    const [user, setUser] = useState(initialStateUser);

    const login = async () => {
        const provider = new GoogleAuthProvider();
        const userCredentials = await signInWithPopup(auth, provider);

        // Actualizamos los datos en el estado para indicar que se acaba de logar tal usuario
        state.user.id = userCredentials.user.uid;
        state.user.userName = userCredentials.user.displayName as string;
        state.user.token = await userCredentials.user.getIdToken();

        await handleLoadUser();
    };

    const handleAddUser = async (user: UserStructure) => {
        const userMenu = await repoMenu.create(user.menu);
        state.user.menu = userMenu;
        await repoUser.create(user);
        navigate("/products");
    };

    //const userWithAccount = usersLoad.find((user:UserStructure) => user.id === state.user.id);
    const getUsers = async (usersLoad: Array<UserStructure>) => {
        if (
            usersLoad.find((user: UserStructure) => user.id === state.user.id)
        ) {
            setUser(
                usersLoad.find(
                    (user: UserStructure) => user.id === state.user.id
                ) as UserStructure
            );
            navigate("/products");
        } else {
            handleAddUser(state.user);
            setUser(state.user as UserStructure);
        }
    };

    const handleLoadUser = useCallback(async () => {
        let usersLoad: Array<UserStructure>;
        try {
            usersLoad = await repoUser.load();
            getUsers(usersLoad);
        } catch {
            handleAddUser(state.user);
        }
    }, []);

    const logout = () => {
        signOut(auth);
        //Limpiamos del estado los datos del usuario cuando se desloguea
        state.user.userName = "";
        state.user.id = "";
        state.user.token = "";
        console.log("user logout");
    };

    return { user, login, logout };
}
