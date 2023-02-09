import { MenuStructure } from "./menu.type";

export type UserStructure = {
    id: string;
    userName: string;
    token: string;
    menu: MenuStructure;
};
