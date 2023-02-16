import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { MenuRepo } from "../repository/menus.repo";
import { ProductRepo } from "../repository/products.repo";
import { useProduct } from "./use.product";
import { getAuth } from "firebase/auth";
import { UserRepo } from "../repository/users.repo";
import * as mocks from "./mocks.use.products";
jest.mock("firebase/auth");

jest.mock("../repository/products.repo");
ProductRepo.prototype.load = jest.fn();
ProductRepo.prototype.create = jest.fn();
ProductRepo.prototype.update = jest.fn();
ProductRepo.prototype.delete = jest.fn();

jest.mock("../repository/menus.repo");
MenuRepo.prototype.load = jest.fn();
MenuRepo.prototype.update = jest.fn();

jest.mock("../repository/users.repo");
UserRepo.prototype.load = jest.fn();

describe(`Given useProduct (custom hook)
            render with a virtual component with case 1`, () => {
    let TestComponentCase1: () => JSX.Element;
    let buttons: Array<HTMLElement>;
    beforeEach(async () => {
        (getAuth as jest.Mock).mockImplementation(() => {
            return {
                currentUser: {
                    uid: "0158",
                    id: "0158",
                    displayName: "Mock name user logged",
                },
            };
        });
        TestComponentCase1 = () => {
            const {
                handleLoad,
                handleAdd,
                handleUpdate,
                handleDelete,
                handleMenu,
                handleLoadMenuNotLoggedUser,
            } = useProduct();
            return (
                <>
                    <button onClick={handleLoad}>Load</button>
                    <button onClick={() => handleAdd(mocks.mockAddProduct)}>
                        Add
                    </button>
                    <button
                        onClick={() => handleUpdate(mocks.mockUpdateProduct)}
                    >
                        Update
                    </button>
                    <button onClick={() => handleDelete(mocks.mockProduct1.id)}>
                        Delete
                    </button>

                    <button
                        onClick={() =>
                            handleLoadMenuNotLoggedUser(mocks.mockMenu1.id)
                        }
                    >
                        Load Menus
                    </button>
                    <button onClick={handleMenu}>Get logged User</button>

                    <div>
                        <p>Loaded</p>
                        <ul>
                            {mocks.mockProducts.map((product) => (
                                <li key={product.id}>{product.productName}</li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <p>Menus</p>
                        <ul>
                            {mocks.mockMenus.map((menu) => (
                                <li key={menu.id}>{menu.name}</li>
                            ))}
                        </ul>
                    </div>
                </>
            );
        };
        mocks.mockRepoResponse();

        await act(() =>
            render(
                <MemoryRouter>
                    <TestComponentCase1 />
                </MemoryRouter>
            )
        );

        buttons = screen.getAllByRole("button");
    });
    describe(`When the repo is working OK`, () => {
        test("Then its function handleLoad should be load Products to the state", async () => {
            userEvent.click(buttons[0]);
            act(() => {
                expect(MenuRepo.prototype.load).toHaveBeenCalled();
            });
        });
        test("Then its function handleAdd should be used", () => {
            userEvent.click(buttons[1]);
            act(() => {
                expect(ProductRepo.prototype.create).toHaveBeenCalled();
            });
        });
        test("If product id is equal to items id, then its function handleUpdate should be used", async () => {
            userEvent.click(buttons[2]);
            waitFor(async () => {
                expect(ProductRepo.prototype.update).toHaveBeenCalled();
                expect(
                    await screen.findByText(mocks.mockUpdateProduct.productName)
                ).toBeInTheDocument();
            });
        });

        test("If product id is not equal to items id, then its function handleUpdate should be used", async () => {
            mocks.mockUpdateProduct.id = "0035";
            userEvent.click(buttons[2]);
            waitFor(async () => {
                expect(ProductRepo.prototype.update).toHaveBeenCalled();
                expect(
                    await screen.findByText(mocks.mockUpdateProduct.productName)
                ).toBeInTheDocument();
            });
        });

        test("Then its function handleDelete should be used", async () => {
            userEvent.click(buttons[3]);
            act(() => {
                expect(ProductRepo.prototype.delete).toHaveBeenCalled();
            });
        });

        test("Then its function handleLoadMenuNotLoggedUser should be update products list in state", async () => {
            userEvent.click(buttons[4]);
            await act(async () => {
                expect(MenuRepo.prototype.load).toHaveBeenCalled();
                expect(
                    await screen.findByText(mocks.mockMenu1.name)
                ).toBeInTheDocument();
            });
        });
        test("Then its function handleLoadMenu should be render user menu", async () => {
            userEvent.click(buttons[5]);
            waitFor(async () => {
                expect(MenuRepo.prototype.load).toHaveBeenCalled();
                expect(UserRepo.prototype.load).toHaveBeenCalled();
            });
        });
    });
});

describe(`Given useProduct (custom hook)
            render with a virtual component with case 2`, () => {
    let TestComponentCase2: () => JSX.Element;
    let buttons: Array<HTMLElement>;
    beforeEach(async () => {
        (getAuth as jest.Mock).mockImplementation(() => {
            return {
                currentUser: null,
            };
        });
        TestComponentCase2 = () => {
            const { handleLoad, handleAdd } = useProduct();
            return (
                <>
                    <button onClick={handleLoad}>Load</button>
                    <button onClick={() => handleAdd(mocks.mockAddProduct)}>
                        Add
                    </button>
                </>
            );
        };
        mocks.mockRepoResponse();

        await act(() =>
            render(
                <MemoryRouter>
                    <TestComponentCase2 />
                </MemoryRouter>
            )
        );
        buttons = screen.getAllByRole("button");
    });
    describe(`When the repo is working OK`, () => {
        test("Then its function handleAdd should be used", () => {
            userEvent.click(buttons[1]);
            act(() => {
                expect(ProductRepo.prototype.create).toHaveBeenCalled();
            });
        });
    });
});

describe(`Given useProduct (custom hook)
            render with a virtual component with case 3`, () => {
    let TestComponentCase3: () => JSX.Element;
    let buttons: Array<HTMLElement>;
    beforeEach(async () => {
        (getAuth as jest.Mock).mockImplementation(() => {
            return {
                currentUser: {
                    uid: "0158",
                    id: "0158",
                    displayName: "Mock name user logged",
                },
            };
        });
        TestComponentCase3 = () => {
            const { handleLoad, handleAdd } = useProduct();
            return (
                <>
                    <button onClick={handleLoad}>Load</button>
                    <button onClick={() => handleAdd(mocks.mockAddProduct)}>
                        Add
                    </button>
                </>
            );
        };
        mocks.mockRepoResponseCase3();

        await act(() =>
            render(
                <MemoryRouter>
                    <TestComponentCase3 />
                </MemoryRouter>
            )
        );
        buttons = screen.getAllByRole("button");
    });
    describe(`When the repo is working OK`, () => {
        test("Then its function handleAdd should be used", () => {
            userEvent.click(buttons[1]);
            act(() => {
                expect(ProductRepo.prototype.create).toHaveBeenCalled();
            });
        });
    });
});

describe(`Given useProduct (custom hook)
            render with a virtual component with case 4`, () => {
    let TestComponentCase4: () => JSX.Element;
    let buttons: Array<HTMLElement>;
    beforeEach(async () => {
        (getAuth as jest.Mock).mockImplementation(() => {
            return {
                currentUser: {
                    uid: "0158",
                    id: "0158",
                    displayName: "Mock name user logged",
                },
            };
        });
        TestComponentCase4 = () => {
            const { handleLoad, handleAdd } = useProduct();

            return (
                <>
                    <button onClick={handleLoad}>Load</button>
                    <button onClick={() => handleAdd(mocks.mockAddProduct)}>
                        Add
                    </button>
                    <ul>
                        {mocks.mockProducts1.length > 0
                            ? mocks.mockProducts1.map((product) => (
                                  <li key={product.id}>
                                      {product.productName}
                                  </li>
                              ))
                            : "User without products added"}
                    </ul>
                </>
            );
        };
        mocks.mockRepoResponseCase4();

        await act(() =>
            render(
                <MemoryRouter>
                    <TestComponentCase4 />
                </MemoryRouter>
            )
        );
        buttons = screen.getAllByRole("button");
    });
    describe(`When the user is new, product list is empty`, () => {
        test("Then its function handleLoad should be used", () => {
            userEvent.click(buttons[0]);
            expect(
                screen.queryByText(mocks.mockProduct1.productName)
            ).not.toBeInTheDocument();
        });
        test("Then its function handleAdd should be used", () => {
            userEvent.click(buttons[1]);
            waitFor(() => {
                expect(
                    screen.findByText(mocks.mockAddProduct.productName)
                ).toBeInTheDocument();
            });
        });
    });
});
