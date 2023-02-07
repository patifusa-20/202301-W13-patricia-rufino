import { UserStructure } from "./user.type";

export type UseUserStructure = {
    userLogged: UserStructure;
    login: () => void;
    logout: () => void;
    handleLoadUser: (user: UserStructure) => void;
};
