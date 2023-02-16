import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { MenuRepo } from "../repository/menus.repo";
import { signOut, signInWithRedirect } from "firebase/auth";
import { UserRepo } from "../repository/users.repo";
import { useUser } from "./use.user";
import * as mocksUsers from "./mocks.use.users";

jest.mock("firebase/auth");
jest.mock("../firebase.config");

jest.mock("../repository/users.repo");
UserRepo.prototype.load = jest.fn();
UserRepo.prototype.create = jest.fn();

jest.mock("../repository/menus.repo");
MenuRepo.prototype.load = jest.fn();
MenuRepo.prototype.create = jest.fn();

describe(`Given useUser (custom hook)
            render with a virtual component`, () => {
    let TestComponent: () => JSX.Element;
    let buttons: Array<HTMLElement>;

    beforeEach(async () => {
        TestComponent = () => {
            const { handleUsersMenu, handleLoadUser, login, logout } =
                useUser();
            return (
                <>
                    <button onClick={handleUsersMenu}>Load</button>
                    <button
                        onClick={() =>
                            handleLoadUser(mocksUsers.mockCurrentUser)
                        }
                    >
                        Load users
                    </button>
                    <button onClick={login}>Login</button>

                    <button onClick={logout}>Logout</button>
                </>
            );
        };
        mocksUsers.mockRepoResponse();

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
                expect(signInWithRedirect).toHaveBeenCalled();
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

describe(`Given useUser (custom hook)
            render with a virtual component`, () => {
    let TestComponentCase2: () => JSX.Element;
    let buttons: Array<HTMLElement>;

    beforeEach(async () => {
        TestComponentCase2 = () => {
            const { handleUsersMenu, handleLoadUser } = useUser();
            return (
                <>
                    <button onClick={handleUsersMenu}>Load</button>
                    <button
                        onClick={() =>
                            handleLoadUser(mocksUsers.mockCurrentUser)
                        }
                    >
                        Load users
                    </button>
                </>
            );
        };
        mocksUsers.mockRepoResponse1();

        await act(() =>
            render(
                <MemoryRouter>
                    <TestComponentCase2 />
                </MemoryRouter>
            )
        );
        buttons = screen.getAllByRole("button");
    });
    describe(`When it's loaded user repository and it's falsy`, () => {
        test("Then a menu should be created in menu repository", async () => {
            userEvent.click(buttons[0]);
            userEvent.click(buttons[1]);
            await act(async () => {
                expect(MenuRepo.prototype.create).toHaveBeenCalled();
            });
        });
    });
});
