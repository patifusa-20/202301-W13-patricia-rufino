import { ProductsContextStructure } from "../../types/products.context.type";
import { GenericModel } from "../../model/generic.model";
import { act, render, screen } from "@testing-library/react";
import { ProductsContext } from "../../context/products.context";
import { Allergens } from "./allergens";

const mockAllergens = [new GenericModel("Test allergen", "Test allergen icon")];

describe('Given "Allergens" component', () => {
    let mockContext: ProductsContextStructure;

    describe("When it load the data from useContext", () => {
        beforeEach(async () => {
            mockContext = {
                allergens: mockAllergens,
            } as unknown as ProductsContextStructure;
            await act(async () => {
                render(
                    <ProductsContext.Provider value={mockContext}>
                        <Allergens></Allergens>
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
