import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProductsContext } from "../../context/products.context";
import { GenericModel } from "../../model/generic.model";
import { ProductsContextStructure } from "../../types/products.context.type";
import { Allergens } from "../allergens/allergens";
import { Categories } from "../categories/categories";
import { Add } from "./add";
jest.mock("../categories/categories");
jest.mock("..//allergens/allergens");
jest.mock("..//modal/modal");

describe("Given add product component", () => {
    const mockCategories = [
        new GenericModel("Test Category", "Test Category icon"),
    ];
    const mockAllergens = [
        new GenericModel("Test allergen", "Test allergen icon"),
    ];
    const handleAdd = jest.fn();
    const handleModal = jest.fn();
    const categories = mockCategories;
    const allergens = mockAllergens;
    const showModal = false;

    const mockContext = {
        categories,
        allergens,
        handleAdd,
        showModal,
        handleModal,
    } as unknown as ProductsContextStructure;

    beforeEach(() => {
        (Categories as jest.Mock).mockImplementation(() => {
            return <p>Mock Categories</p>;
        });
        (Allergens as jest.Mock).mockImplementation(() => {
            return <p>Mock Allergens</p>;
        });
        render(
            <ProductsContext.Provider value={mockContext}>
                <Add></Add>
            </ProductsContext.Provider>
        );
    });

    describe("When component is call with a DOM implementation", () => {
        test(`Then it should be render with a labels`, () => {
            const element = screen.getByLabelText("Nombre del producto*"); // <h1>
            expect(element).toBeInTheDocument();
        });
    });

    describe("When data are provided in the form", () => {
        const mockProductName = "Test ProductName";
        const mockPrice = "Test price";
        let inputElements: Array<HTMLElement>;
        let buttonElements: Array<HTMLElement>;
        beforeEach(() => {
            inputElements = screen.getAllByRole("textbox"); // <input>
            buttonElements = screen.getAllByRole("button");
        });
        test("Then form could be used for type content", () => {
            expect(inputElements[0]).toBeInTheDocument();
            expect(inputElements[1]).toBeInTheDocument();
            userEvent.type(inputElements[0], mockPrice);
            userEvent.type(inputElements[1], mockProductName);
            expect(inputElements[0]).toHaveValue(mockPrice);
            expect(inputElements[1]).toHaveValue(mockProductName);
        });
        test("Then form could be used for send the function received in context", () => {
            userEvent.type(inputElements[0], mockPrice);
            userEvent.type(inputElements[1], mockProductName);
            userEvent.click(buttonElements[1]);
            act(() => {
                expect(handleAdd).toHaveBeenCalled();
            });
        });
        test("Then form could be used also without value for responsible", () => {
            userEvent.type(inputElements[0], mockPrice);
            userEvent.click(buttonElements[1]);
            expect(handleAdd).toHaveBeenCalled();
        });
        test("Then button could be used for send the function received in context", () => {
            userEvent.click(buttonElements[0]);
            act(() => {
                expect(handleModal).toHaveBeenCalled();
            });
        });
    });
});
