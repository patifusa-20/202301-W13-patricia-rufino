import { signInWithRedirect, signOut } from "firebase/auth";
import { MenuRepo } from "../repository/menus.repo";
import { UserRepo } from "../repository/users.repo";

export const mockCurrentUser = {
    id: "Id Current User",
    userName: "Name Current User",
    token: "Token Current User",
    menu: { id: "idMenu", name: "nameMenu", products: [] },
};
const mockAddUser = {
    id: "Id Add User",
    userName: "Name Add User",
    token: "Token Add User",
    menu: { id: "idMenu", name: "nameMenu", products: [] },
};

const mockUsers = [mockCurrentUser, mockAddUser];

const mockUserCredentials = {
    user: {
        uid: "Mock UID user logged",
        displayName: "Mock display name",
        getIdToken: jest.fn(),
    },
};

const mockMenu1 = { id: "IdMenu1", name: "NameMenu1" };
const mockMenus = [mockMenu1];

export const mockRepoResponse = () => {
    (UserRepo.prototype.load as jest.Mock).mockResolvedValue(mockUsers);
    (UserRepo.prototype.create as jest.Mock).mockResolvedValue(mockAddUser);
    (MenuRepo.prototype.load as jest.Mock).mockResolvedValue(mockMenus);
    (MenuRepo.prototype.create as jest.Mock).mockResolvedValue(mockMenus);
    (signInWithRedirect as jest.Mock).mockResolvedValue(mockUserCredentials);
    (signOut as jest.Mock).mockResolvedValue(mockUserCredentials);
};

export const mockRepoResponse1 = () => {
    (UserRepo.prototype.load as jest.Mock).mockResolvedValue(undefined);
    (UserRepo.prototype.create as jest.Mock).mockResolvedValue(mockAddUser);
    (MenuRepo.prototype.create as jest.Mock).mockResolvedValue(mockMenus);
    (signInWithRedirect as jest.Mock).mockResolvedValue(mockUserCredentials);
};
