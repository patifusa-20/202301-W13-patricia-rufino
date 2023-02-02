import { act, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ProductsContext } from "../../context/products.context";
import { GenericModel } from "../../model/generic.model";
import { ProductModel } from "../../model/product.model";
import { ProductsContextStructure } from "../../types/products.context.type";
import { Products } from "./products";

const mockCategory = "Test category";
const mockAllergen = [new GenericModel("Test allergen", "Test allergen icon")];
const mockData = [
    new ProductModel(
        "Test name 1",
        "Test image 1",
        "Test price 1",
        mockCategory,
        mockAllergen,
        false
    ),
];

describe('Given "Products" component', () => {
    let mockContext: ProductsContextStructure;

    describe("When it load the data from useContext", () => {
        beforeEach(async () => {
            mockContext = {
                category: mockCategory,
                products: mockData,
            } as unknown as ProductsContextStructure;
            await act(async () => {
                render(
                    <BrowserRouter>
                        <ProductsContext.Provider value={mockContext}>
                            <Products></Products>
                        </ProductsContext.Provider>
                    </BrowserRouter>
                );
            });
        });
        test(`Then it should be render the data`, async () => {
            const elementList = await screen.findByRole("list"); // <ul />
            expect(elementList).toBeInTheDocument();
            const elementItem = await screen.findByText(/No hay productos/i);
            expect(elementItem).toBeInTheDocument();
        });
        test(`When category is selected, the list is rendered`, async () => {
            //const elementItem = await screen.findByText(/Test/i);
            // expect(elementItem).toBeInTheDocument();
        });
    });
});
