import { render, screen } from "@testing-library/react";
import { ProductsContext } from "../../context/products.context";
import { GenericModel } from "../../model/generic.model";
import { ProductsContextStructure } from "../../types/products.context.type";
import { ProductForm } from "../product.form/form";
import { Add } from "./add";
jest.mock("../product.form/form");
jest.mock("firebase/storage");

describe("Given add product component", () => {
    const mockAllergens = [
        new GenericModel("Test allergen", "Test allergen icon"),
    ];
    const mockCategory = "Test Category";
    const category = mockCategory;
    const allergens = mockAllergens;

    const mockContext = {
        allergens,
        category,
    } as unknown as ProductsContextStructure;

    beforeEach(() => {
        (ProductForm as jest.Mock).mockImplementation(() => {
            return <p>Mock Product Form</p>;
        });
        render(
            <ProductsContext.Provider value={mockContext}>
                <Add></Add>
            </ProductsContext.Provider>
        );
    });

    describe("When component is call with a DOM implementation", () => {
        test(`Then it should be render with a labels`, () => {
            const element = screen.getByText("Mock Product Form"); // <h1>
            expect(element).toBeInTheDocument();
        });
    });
});
