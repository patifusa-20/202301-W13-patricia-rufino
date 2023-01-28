import { render, screen } from "@testing-library/react";
import { useContext } from "react";
import { GenericStructure } from "../types/generic.type.ts";
import { initialContext, ProductsContext } from "./products.context";

const mockItem: GenericStructure = {
    id: "1",
    name: "Test category",
    icon: "Test icon",
    isSelected: true,
};

initialContext.items = [mockItem];

describe("Given the context ProductsContext", () => {
    let TestComponent: () => JSX.Element;
    describe("When a Test Component is wrapper with this context", () => {
        beforeEach(() => {
            TestComponent = () => {
                const { items, handleFilter } = useContext(ProductsContext);
                handleFilter(mockItem);
                return <>{items[0].name}</>;
            };
        });
        test("Context values should be used in the component", () => {
            render(
                <ProductsContext.Provider value={initialContext}>
                    <TestComponent></TestComponent>
                </ProductsContext.Provider>
            );
            const element = screen.getByText(initialContext.items[0].name);
            expect(element).toBeInTheDocument();
        });
    });
});
