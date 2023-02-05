import { ProductsContextStructure } from "../../types/products.context.type";
import { GenericModel } from "../../model/generic.model";
import { act, render, screen } from "@testing-library/react";
import { ProductsContext } from "../../context/products.context";
import { Categories } from "./categories";

const mockCategory = new GenericModel("Test Category", "Test Category icon");
const mockCategories = [mockCategory];

describe('Given "Categories" component', () => {
    let mockContext: ProductsContextStructure;

    describe("When it load the data from useContext", () => {
        beforeEach(async () => {
            mockContext = {
                category: mockCategory,
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
