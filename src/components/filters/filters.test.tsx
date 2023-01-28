import { act, render, screen } from "@testing-library/react";
import { ProductsContext } from "../../context/products.context";
import { GenericModel } from "../../model/generic.model";
import { ProductsContextStructure } from "../../types/products.context.type";
import { Filters } from "./filters";

const mockCategories = [
    new GenericModel("Test category", "Test category icon"),
];

describe('Given "Filters" component', () => {
    let mockContext: ProductsContextStructure;

    describe("When it load the data from useContext", () => {
        beforeEach(async () => {
            mockContext = {
                categories: mockCategories,
            } as unknown as ProductsContextStructure;
            await act(async () => {
                render(
                    <ProductsContext.Provider value={mockContext}>
                        <Filters></Filters>
                    </ProductsContext.Provider>
                );
            });
        });
        test(`Then it should be render the data`, async () => {
            const elementList = await screen.findByRole("list"); // <ul />
            expect(elementList).toBeInTheDocument();
            const elementItem = await screen.findByText(/Test category/i);
            expect(elementItem).toBeInTheDocument();
        });
    });
});
