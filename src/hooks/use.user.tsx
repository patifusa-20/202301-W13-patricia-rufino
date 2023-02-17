import {
    signInWithRedirect,
    GoogleAuthProvider,
    signOut,
    getRedirectResult,
    UserCredential,
} from "firebase/auth";
import { auth } from "../firebase.config";
import { UserRepo } from "../repository/users.repo";
import { UserStructure } from "../types/user.type";
import { MenuRepo } from "../repository/menus.repo";
import { useCallback, useEffect, useReducer, useState } from "react";
import { ProductStructure } from "../types/product.type";
import { useNavigate } from "react-router-dom";
import { UseUserStructure } from "../types/use.user.type";
import { MenuStructure } from "../types/menu.type";
import * as actionCreator from "../reducers/users/action.creators";
import { userReducer } from "../reducers/users/user.reducer";
import { useGeneric } from "./use.generic";
export function useUser(): UseUserStructure {
    const repoMenu = new MenuRepo();
    const repoUser = new UserRepo();

    const navigate = useNavigate();
    const { handleError } = useGeneric();

    const initialUsersState: Array<UserStructure> = [];

    const [users, dispatch] = useReducer(userReducer, initialUsersState);

    const handleUsersMenu = useCallback(async () => {
        const usersLoad = await repoUser.load();
        dispatch(actionCreator.userLoadActionCreator(usersLoad));
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
    };

    const handleDataLogin = async () => {
        try {
            const userCredentials = await getRedirectResult(auth);
            userLogged.id = (userCredentials as UserCredential).user.uid;
            userLogged.userName = (userCredentials as UserCredential).user
                .displayName as string;
            userLogged.token = await (
                userCredentials as UserCredential
            ).user.getIdToken();
            const currentUser = userLogged;
            setUser(currentUser);
            handleLoadUser(currentUser);
            navigate("/products");
        } catch (error) {
            handleError(error as Error);
        }
    };

    const login = async () => {
        const provider = new GoogleAuthProvider();
        signInWithRedirect(auth, provider);
    };

    useEffect(() => {
        handleDataLogin();
    }, []);

    return {
        userLogged,
        users,
        handleUsersMenu,
        handleLoadUser,
        login,
        logout,
    };
}
