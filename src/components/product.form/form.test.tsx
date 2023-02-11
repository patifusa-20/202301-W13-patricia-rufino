import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { getDownloadURL } from "firebase/storage";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { ProductsContext } from "../../context/products.context";
import { Allergens } from "../allergens/allergens";
import { Categories } from "../categories/categories";
import { ProductForm } from "./form";
import { mockContext, mockFormData, mockFormDataCase2 } from "./mock";

jest.mock("../categories/categories");
jest.mock("../allergens/allergens");
jest.mock("../modal/modal");
jest.mock("firebase/storage");
jest.mock("../../firebase.config");

describe("Given Form component", () => {
    beforeEach(() => {
        (Categories as jest.Mock).mockImplementation(() => {
            return <p>Mock Categories</p>;
        });
        (Allergens as jest.Mock).mockImplementation(() => {
            return <p>Mock Allergens</p>;
        });
        render(
            <MemoryRouter initialEntries={["/product"]} initialIndex={0}>
                <ProductsContext.Provider value={mockContext}>
                    <Routes>
                        <Route
                            path={"/:id"}
                            element={
                                <ProductForm
                                    formData={mockFormData}
                                ></ProductForm>
                            }
                        ></Route>
                    </Routes>
                </ProductsContext.Provider>
            </MemoryRouter>
        );
    });

    describe("When component is call with a DOM implementation", () => {
        test(`Then it should be render with a labels`, () => {
            const element = screen.getByLabelText("Nombre del producto*");
            expect(element).toBeInTheDocument();
        });
    });
    describe("When data are provided in the form", () => {
        const mockProductName = "Test ProductName";
        const mockPrice = "12";
        let inputElements: Array<HTMLElement>;
        beforeEach(() => {
            inputElements = screen.getAllByRole("textbox"); // <input>
        });
        test("Then form could be used for type content", () => {
            expect(inputElements[0]).toBeInTheDocument();
            expect(inputElements[1]).toBeInTheDocument();
            userEvent.type(inputElements[0], mockProductName);
            userEvent.type(inputElements[1], mockPrice);
            waitFor(() => {
                expect(inputElements[0]).toHaveValue(mockProductName);
                expect(inputElements[1]).toHaveValue(mockPrice);
            });
        });
    });
    describe("When data are provided in the form and test buttons", () => {
        let buttonElements: Array<HTMLElement>;
        beforeEach(() => {
            buttonElements = screen.getAllByRole("button");
        });

        test("Then image button could be used for send the function handleModal received in context", () => {
            userEvent.click(buttonElements[0]);
            expect(mockContext.handleModal).toHaveBeenCalled();
        });
        test("Then GUARDAR CAMBIOS button could be used for send the function handleUpdate received in context", () => {
            userEvent.click(buttonElements[1]);
            act(() => {
                expect(mockContext.handleUpdate).toHaveBeenCalled();
            });
        });
        test("Then ELIMINAR PRODUCTO button could be used for send the function handleDelete received in context", () => {
            userEvent.click(buttonElements[2]);
            act(() => {
                expect(mockContext.handleDelete).toHaveBeenCalled();
            });
        });
    });
});

describe("Given Form component to Test Case 2, external image", () => {
    beforeEach(() => {
        (Categories as jest.Mock).mockImplementation(() => {
            return <p>Mock Categories</p>;
        });
        (Allergens as jest.Mock).mockImplementation(() => {
            return <p>Mock Allergens</p>;
        });
        (getDownloadURL as jest.Mock).mockImplementation(() => {
            return new Promise((resolve, reject) => {
                resolve("mockurlimage");
                reject({ error: "error" });
            });
        });
        render(
            <MemoryRouter initialEntries={["/add-product"]} initialIndex={0}>
                <ProductsContext.Provider value={mockContext}>
                    <Routes>
                        <Route
                            path={"/add-product"}
                            element={
                                <ProductForm
                                    formData={mockFormDataCase2}
                                ></ProductForm>
                            }
                        ></Route>
                    </Routes>
                </ProductsContext.Provider>
            </MemoryRouter>
        );
    });
    describe("When data are provided in the form", () => {
        let buttonElements: Array<HTMLElement>;
        beforeEach(() => {
            buttonElements = screen.getAllByRole("button");
        });
        test("Then button  could be used for send the function received in context", () => {
            userEvent.click(buttonElements[0]);
            // Pendiente de seguir validando
            // act(() => {
            //     expect(mockContext.handleAdd).toHaveBeenCalled();
            // });
        });
    });
});
describe("Given Form component in Test Case 3", () => {
    beforeEach(() => {
        (Categories as jest.Mock).mockImplementation(() => {
            return <p>Mock Categories</p>;
        });
        (Allergens as jest.Mock).mockImplementation(() => {
            return <p>Mock Allergens</p>;
        });
        (getDownloadURL as jest.Mock).mockResolvedValue("Download url");
        act(() => {
            render(
                <MemoryRouter
                    initialEntries={["/add-product"]}
                    initialIndex={0}
                >
                    <ProductsContext.Provider value={mockContext}>
                        <Routes>
                            <Route
                                path={"/add-product"}
                                element={
                                    <ProductForm
                                        formData={mockFormData}
                                    ></ProductForm>
                                }
                            ></Route>
                        </Routes>
                    </ProductsContext.Provider>
                </MemoryRouter>
            );
        });
    });
    describe("When data are provided in the form", () => {
        let buttonElements: Array<HTMLElement>;
        beforeEach(() => {
            buttonElements = screen.getAllByRole("button");
        });
        test("Then button GUARDAR CAMBIOS could be used for send the function received in context", () => {
            userEvent.click(buttonElements[1]);
            // Pendiente de seguir validando
            //expect(mockContext.handleAdd).toHaveBeenCalled();
            //expect(getDownloadURL).rejects.toEqual({ error: "error" });
        });
    });
});
