import { UserStructure } from "./user.type";

export type UseUserStructure = {
    user: UserStructure;
    login: () => void;
    logout: () => void;
};
