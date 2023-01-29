import { act, render, screen } from "@testing-library/react";
import { ProductsContext } from "../../context/products.context";
import { GenericModel } from "../../model/generic.model";
import { ProductModel } from "../../model/product.model";
import { ProductsContextStructure } from "../../types/products.context.type";
import { Products } from "./products";

const mockCategory = [new GenericModel("Test category", "Test category icon")];
const mockAllergen = [new GenericModel("Test allergen", "Test allergen icon")];
const mockData = [
    new ProductModel(
        "Test name 1",
        "Test image 1",
        "Test price 1",
        mockCategory,
        mockAllergen
    ),
];

describe('Given "Products" component', () => {
    let mockContext: ProductsContextStructure;

    describe("When it load the data from useContext", () => {
        beforeEach(async () => {
            mockContext = {
                products: mockData,
            } as unknown as ProductsContextStructure;
            await act(async () => {
                render(
                    <ProductsContext.Provider value={mockContext}>
                        <Products></Products>
                    </ProductsContext.Provider>
                );
            });
        });
        test(`Then it should be render the data`, async () => {
            const elementList = await screen.findByRole("list"); // <ul />
            expect(elementList).toBeInTheDocument();
            const elementItem = await screen.findByText(/Test price/i);
            expect(elementItem).toBeInTheDocument();
        });
    });
});
