import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { GenericModel } from "../model/generic.model";
import { ProductModel } from "../model/product.model";
import { MenuRepo } from "../repository/menus.repo";
import { ProductRepo } from "../repository/products.repo";
import { useProduct } from "./use.product";
import { getAuth } from "firebase/auth";
import { UserRepo } from "../repository/users.repo";
jest.mock("firebase/auth");

jest.mock("../repository/products.repo");
ProductRepo.prototype.load = jest.fn();
ProductRepo.prototype.create = jest.fn();
ProductRepo.prototype.update = jest.fn();
ProductRepo.prototype.delete = jest.fn();

jest.mock("../repository/menus.repo");
MenuRepo.prototype.load = jest.fn();

jest.mock("../repository/users.repo");
UserRepo.prototype.load = jest.fn();

const mockCategory = "Test category";
const mockAllergen = [new GenericModel("Test allergen", "Test allergen icon")];
const mockProduct = new ProductModel(
    "Test name 1",
    "Test image 1",
    "Test price 1",
    mockCategory,
    mockAllergen,
    false
);
mockProduct.id = "0030";
const mockProduct1 = new ProductModel(
    "Test name 1a",
    "Test image 1a",
    "Test price 1a",
    mockCategory,
    mockAllergen,
    false
);
mockProduct1.id = "0035";

const mockNewObj = { name: "0040" };

const mockAddProduct = new ProductModel(
    "Test name added",
    "Test image added",
    "Test price added",
    mockCategory,
    mockAllergen,
    false
);
mockAddProduct.id = "0040";

const mockUpdateProduct = new ProductModel(
    "Test name updated",
    "Test image updated",
    "Test price updated",
    mockCategory,
    mockAllergen,
    false
);
mockUpdateProduct.id = "0050";

const mockProducts = [mockProduct, mockProduct1, mockUpdateProduct];

const mockMenu1 = { id: "0508", name: "NameMenu1" };
const mockMenus = [mockMenu1];

const mockUser = {
    id: "0158",
    name: "Name Logged User",
    token: "Token Logged User",
    menu: { id: "0508" },
};
const mockUser2 = {
    id: "0325",
    name: "Name Logged User2",
    token: "Token Logged User2",
    menu: { id: "0509" },
};
const mockUsers = [mockUser, mockUser2];

const mockRepoResponse = () => {
    (ProductRepo.prototype.load as jest.Mock).mockResolvedValue(mockProducts);
    (ProductRepo.prototype.create as jest.Mock).mockResolvedValue(mockNewObj);
    (ProductRepo.prototype.update as jest.Mock).mockResolvedValue(
        mockUpdateProduct
    );
    (ProductRepo.prototype.delete as jest.Mock).mockResolvedValue(
        mockProduct1.id
    );
    (MenuRepo.prototype.load as jest.Mock).mockResolvedValue(mockMenus);
    (UserRepo.prototype.load as jest.Mock).mockResolvedValue(mockUsers);
};

describe(`Given useProduct (custom hook)
            render with a virtual component`, () => {
    let TestComponent: () => JSX.Element;
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
        TestComponent = () => {
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
                    <button onClick={() => handleAdd(mockAddProduct)}>
                        Add
                    </button>
                    <button onClick={() => handleUpdate(mockUpdateProduct)}>
                        Update
                    </button>
                    <button onClick={() => handleDelete(mockProduct1.id)}>
                        Delete
                    </button>

                    <button
                        onClick={() =>
                            handleLoadMenuNotLoggedUser(mockMenu1.id)
                        }
                    >
                        Load Menus
                    </button>
                    <button onClick={handleMenu}>Get logged User</button>

                    <div>
                        <p>Loaded</p>
                        <ul>
                            {mockProducts.map((product) => (
                                <li key={product.id}>{product.productName}</li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <p>Menus</p>
                        <ul>
                            {mockMenus.map((menu) => (
                                <li key={menu.id}>{menu.name}</li>
                            ))}
                        </ul>
                    </div>
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
        test("Then its function handleLoad should be load Products to the state", async () => {
            userEvent.click(buttons[0]);
            act(() => {
                expect(MenuRepo.prototype.load).toHaveBeenCalled();
                expect(
                    screen.findByText(mockProduct.productName)
                ).toBeInTheDocument();
            });
        });
        test("Then its function handleAdd should be used", () => {
            userEvent.click(buttons[1]);
            act(() => {
                expect(ProductRepo.prototype.create).toHaveBeenCalled();
            });
        });
        test("Then its function handleUpdate should be used", async () => {
            userEvent.click(buttons[2]);
            waitFor(async () => {
                expect(ProductRepo.prototype.update).toHaveBeenCalled();
                expect(
                    await screen.findByText(mockUpdateProduct.productName)
                ).toBeInTheDocument();
            });
        });

        test("Then its function handleDelete should be used", async () => {
            userEvent.click(buttons[3]);
            waitFor(async () => {
                expect(ProductRepo.prototype.delete).toHaveBeenCalled();
                // expect(
                //     async () =>
                //         await screen.findByText(mockProduct1.productName)
                // ).rejects.toThrowError();
            });
        });

        test("Then its function handleLoadMenuNotLoggedUser should be update products list in state", async () => {
            userEvent.click(buttons[4]);
            await act(async () => {
                expect(MenuRepo.prototype.load).toHaveBeenCalled();
                expect(
                    await screen.findByText(mockMenu1.name)
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
