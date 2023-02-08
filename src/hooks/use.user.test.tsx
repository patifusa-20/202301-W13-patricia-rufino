import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { MenuRepo } from "../repository/menus.repo";
import { signOut, signInWithPopup } from "firebase/auth";
import { UserRepo } from "../repository/users.repo";
import { useUser } from "./use.user";

jest.mock("firebase/auth");
jest.mock("../firebase.config");
jest.mock("../repository/users.repo");
jest.mock("../repository/menus.repo");

const mockCurrentUser = {
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

describe(`Given useProduct (custom hook)
            render with a virtual component`, () => {
    let TestComponent: () => JSX.Element;
    let buttons: Array<HTMLElement>;
    const mockRepoResponse = () => {
        (UserRepo.prototype.load as jest.Mock).mockResolvedValue(mockUsers);
        (UserRepo.prototype.create as jest.Mock).mockResolvedValue(mockAddUser);
        (MenuRepo.prototype.load as jest.Mock).mockResolvedValue(mockMenus);
        (MenuRepo.prototype.create as jest.Mock).mockResolvedValue(mockMenus);
        (signInWithPopup as jest.Mock).mockResolvedValue(mockUserCredentials);
        (signOut as jest.Mock).mockResolvedValue(mockUserCredentials);
    };
    UserRepo.prototype.load = jest.fn();
    UserRepo.prototype.create = jest.fn();
    MenuRepo.prototype.load = jest.fn();
    MenuRepo.prototype.create = jest.fn();
    beforeEach(async () => {
        TestComponent = () => {
            const { handleUsersMenu, handleLoadUser, login, logout } =
                useUser();
            return (
                <>
                    <button onClick={handleUsersMenu}>Load</button>
                    <button onClick={() => handleLoadUser(mockCurrentUser)}>
                        Load users
                    </button>
                    <button onClick={login}>Login</button>

                    <button onClick={logout}>Logout</button>
                </>
            );
        };
        mockRepoResponse();

        await act(() =>
            render(
                <MemoryRouter>
                    <TestComponent />
                </MemoryRouter>
            )
        );
        buttons = screen.getAllByRole("button");
    });
    describe(`When the repo is working OK`, () => {
        test("Then its function handleUsersMenu should be add users to the state", async () => {
            userEvent.click(buttons[0]);
            await act(async () => {
                expect(UserRepo.prototype.load).toHaveBeenCalled();
            });
        });
        test("Then its function handleLoadUser should be used", async () => {
            userEvent.click(buttons[0]);
            userEvent.click(buttons[1]);
            await act(async () => {
                expect(UserRepo.prototype.load).toHaveBeenCalled();
            });
        });
        test("Then its function Login should be used", async () => {
            userEvent.click(buttons[0]);
            userEvent.click(buttons[2]);
            await act(async () => {
                expect(signInWithPopup).toHaveBeenCalled();
            });
        });

        test("Then its function Logout should be used", async () => {
            userEvent.click(buttons[0]);
            userEvent.click(buttons[3]);
            await act(async () => {
                expect(signOut).toHaveBeenCalled();
            });
        });
    });
});
