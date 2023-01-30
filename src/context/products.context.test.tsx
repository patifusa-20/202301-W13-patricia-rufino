import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useContext } from "react";
import { GenericStructure } from "../types/generic.type";
import { initialContext, ProductsContext } from "./products.context";

const mockCategory: GenericStructure = {
    id: "1",
    name: "Test category",
    icon: "Test icon",
    isSelected: true,
};
const mockCategory2: GenericStructure = {
    id: "2",
    name: "Test category 2",
    icon: "Test icon 2",
    isSelected: false,
};

const mockCategory3: GenericStructure = {
    id: "5",
    name: "Test category 3",
    icon: "Test icon 3",
    isSelected: false,
};

const mockAllergen: GenericStructure = {
    id: "3",
    name: "Test allergen",
    icon: "Test icon",
    isSelected: true,
};
const mockAllergen2: GenericStructure = {
    id: "4",
    name: "Test allergen 2",
    icon: "Test icon 2",
    isSelected: false,
};

initialContext.categories = [mockCategory, mockCategory2, mockCategory3];
initialContext.allergens = [mockAllergen, mockAllergen2];

describe("Given the context ProductsContext", () => {
    let TestComponent: () => JSX.Element;
    describe("When a Test Component is wrapper with this context", () => {
        beforeEach(() => {
            TestComponent = () => {
                const {
                    allergens,
                    categories,
                    handleFilter,
                    handleAllergen,
                    handleCategory,
                    handleModal,
                } = useContext(ProductsContext);
                handleFilter(mockCategory);
                handleAllergen(mockCategory);
                handleCategory(mockCategory);
                handleModal();
                return (
                    <>
                        <p>{categories[0].name}</p>
                        <p>{allergens[0].name}</p>
                        <button onClick={() => handleModal()}>
                            Show modal
                        </button>
                        <button onClick={() => handleCategory(mockCategory2)}>
                            {categories[1].name}
                        </button>
                        <button onClick={() => handleAllergen(mockAllergen)}>
                            {allergens[1].name}
                        </button>
                        <button onClick={() => handleFilter(mockCategory3)}>
                            {categories[2].name}
                        </button>
                    </>
                );
            };
        });
        test("Context values should be used in the component", async () => {
            render(
                <ProductsContext.Provider value={initialContext}>
                    <TestComponent></TestComponent>
                </ProductsContext.Provider>
            );
            const element = screen.getByText(initialContext.categories[0].name);
            expect(element).toBeInTheDocument();

            const buttons = screen.getAllByRole("button");
            userEvent.click(buttons[0]);
            expect(await screen.findByText("Show modal")).toBeInTheDocument();

            userEvent.click(buttons[1]);
            expect(
                await screen.findByText(initialContext.categories[1].name)
            ).toBeInTheDocument();

            userEvent.click(buttons[2]);
            expect(
                await screen.findByText(initialContext.allergens[1].name)
            ).toBeInTheDocument();

            userEvent.click(buttons[3]);
            expect(
                await screen.findByText(initialContext.categories[2].name)
            ).toBeInTheDocument();
        });
    });
});
