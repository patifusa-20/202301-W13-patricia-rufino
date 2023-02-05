import { render, screen } from "@testing-library/react";
import { ProductsContext } from "../../context/products.context";
import { GenericModel } from "../../model/generic.model";
import { ProductModel } from "../../model/product.model";
import { ProductsContextStructure } from "../../types/products.context.type";
import { ProductForm } from "../product.form/form";
import { Edit } from "./edit";
jest.mock("../product.form/form");
jest.mock("firebase/storage");

describe("Given edit product component", () => {
    const mockCategory = "Test Category";
    const mockAllergens = [
        new GenericModel("Test allergen", "Test allergen icon"),
    ];
    const mockProduct = new ProductModel(
        "Test name 1",
        "Test image 1",
        "Test price 1",
        mockCategory,
        mockAllergens,
        false
    );
    mockProduct.id = "0030";
    const handleDelete = jest.fn();

    const mockContext = {
        handleDelete,
    } as unknown as ProductsContextStructure;

    beforeEach(() => {
        (ProductForm as jest.Mock).mockImplementation(() => {
            return <p>Mock Product Form</p>;
        });
        render(
            <ProductsContext.Provider value={mockContext}>
                <Edit product={mockProduct}></Edit>
            </ProductsContext.Provider>
        );
    });

    describe("When component is call with a DOM implementation", () => {
        test(`Then it should be render with a labels`, () => {
            const element = screen.getByText("Mock Product Form");
            expect(element).toBeInTheDocument();
        });
    });
});
