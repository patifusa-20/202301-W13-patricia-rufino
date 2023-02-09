import { UserStructure } from "./user.type";

export type UseUserStructure = {
    userLogged: UserStructure;
    users: Array<UserStructure>;
    handleUsersMenu: () => void;
    login: () => void;
    logout: () => void;
    handleLoadUser: (user: UserStructure) => void;
};
