import { ProductsContextStructure } from "../../types/products.context.type";
import { GenericModel } from "../../model/generic.model";
import { act, render, screen } from "@testing-library/react";
import { ProductsContext } from "../../context/products.context";
import { Categories } from "./categories";

const mockCategories = [
    new GenericModel("Test Category", "Test Category icon"),
];

describe('Given "Categories" component', () => {
    let mockContext: ProductsContextStructure;

    describe("When it load the data from useContext", () => {
        beforeEach(async () => {
            mockContext = {
                categories: mockCategories,
            } as unknown as ProductsContextStructure;
            await act(async () => {
                render(
                    <ProductsContext.Provider value={mockContext}>
                        <Categories></Categories>
                    </ProductsContext.Provider>
                );
            });
        });
        test(`Then it should be render the data`, async () => {
            const elementList = await screen.findByRole("list"); // <ul />
            expect(elementList).toBeInTheDocument();
        });
    });
});
