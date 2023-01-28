import { render, screen } from "@testing-library/react";
import { useContext } from "react";
import { GenericStructure } from "../types/generic.type";
import { initialContext, ProductsContext } from "./products.context";

const mockCategory: GenericStructure = {
    id: "1",
    name: "Test category",
    icon: "Test icon",
    isSelected: true,
};

const mockAllergen: GenericStructure = {
    id: "1",
    name: "Test allergen",
    icon: "Test icon",
    isSelected: true,
};

initialContext.categories = [mockCategory];
initialContext.allergens = [mockAllergen];

describe("Given the context ProductsContext", () => {
    let TestComponent: () => JSX.Element;
    describe("When a Test Component is wrapper with this context", () => {
        beforeEach(() => {
            TestComponent = () => {
                const { allergens, categories, handleFilter, handleAllergen } =
                    useContext(ProductsContext);
                handleFilter(mockCategory);
                handleAllergen(mockCategory);
                return (
                    <>
                        <p>{categories[0].name}</p>
                        <p>{allergens[0].name}</p>
                    </>
                );
            };
        });
        test("Context values should be used in the component", () => {
            render(
                <ProductsContext.Provider value={initialContext}>
                    <TestComponent></TestComponent>
                </ProductsContext.Provider>
            );
            const element = screen.getByText(initialContext.categories[0].name);
            expect(element).toBeInTheDocument();
        });
    });
});
