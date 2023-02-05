import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { ProductsContext } from "../../context/products.context";
import { GenericModel } from "../../model/generic.model";
import { ProductsContextStructure } from "../../types/products.context.type";
import { Allergens } from "../allergens/allergens";
import { Categories } from "../categories/categories";
import { ProductForm } from "./form";

jest.mock("../categories/categories");
jest.mock("../allergens/allergens");
jest.mock("../modal/modal");
jest.mock("firebase/storage");

describe("Given Form component", () => {
    const mockCategory = "Test Category";
    const mockAllergens = [
        new GenericModel("Test allergen", "Test allergen icon"),
    ];
    const handleAdd = jest.fn();
    const handleModal = jest.fn();
    const handleUpdate = jest.fn();
    const handleDelete = jest.fn();
    const category = mockCategory;
    const allergens = mockAllergens;
    const showModal = false;

    const mockContext = {
        category,
        allergens,
        handleAdd,
        handleUpdate,
        showModal,
        handleDelete,
        handleModal,
    } as unknown as ProductsContextStructure;

    const mockFormData = {
        productName: "",
        image: "",
        price: "",
        isExtImage: false,
        category: category,
    };

    beforeEach(() => {
        (Categories as jest.Mock).mockImplementation(() => {
            return <p>Mock Categories</p>;
        });
        (Allergens as jest.Mock).mockImplementation(() => {
            return <p>Mock Allergens</p>;
        });
        render(
            <BrowserRouter>
                <ProductsContext.Provider value={mockContext}>
                    <ProductForm formData={mockFormData}></ProductForm>
                </ProductsContext.Provider>
            </BrowserRouter>
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
    describe("When data are provided in the form", () => {
        let buttonElements: Array<HTMLElement>;
        beforeEach(() => {
            buttonElements = screen.getAllByRole("button");
        });
        test("Then button could be used for send the function received in context", () => {
            userEvent.click(buttonElements[0]);
            act(() => {
                expect(handleModal).toHaveBeenCalled();
            });
        });
        test("Then button could be used for send the function received in context", () => {
            userEvent.click(buttonElements[1]);
            act(() => {
                expect(handleUpdate).toHaveBeenCalled();
            });
        });
        // Test pendiente de validar
        // test("Then button could be used for send the function received in context", () => {
        //     location.pathname = "/add-product";
        //     userEvent.click(buttonElements[1]);
        //     act(() => {
        //         expect(handleAdd).toHaveBeenCalled();
        //     });
        // });
        test("Then button could be used for send the function received in context", () => {
            userEvent.click(buttonElements[2]);
            act(() => {
                expect(handleDelete).toHaveBeenCalled();
            });
        });
    });
});
