import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProductsContext } from "../../context/products.context";
import { GenericModel } from "../../model/generic.model";
import { ProductsContextStructure } from "../../types/products.context.type";
import { Allergen } from "./allergen";

describe('Given "Allergen" component', () => {
    const handleAllergen = jest.fn();
    const mockContext = {
        handleAllergen,
    } as unknown as ProductsContextStructure;
    const mockAllergen = new GenericModel("Test Allergen", "Test icon");
    mockAllergen.id = "30";
    describe("When data are provided in the component", () => {
        test("Then Allergen data is rendered on screen", async () => {
            render(<Allergen allergen={mockAllergen}></Allergen>);

            const element = screen.getByAltText(/allergen/i);
            expect(element).toBeInTheDocument();
        });
    });
    describe("When a allergen is selected", () => {
        test("Then className active exist", async () => {
            mockAllergen.isSelected = true;
            render(<Allergen allergen={mockAllergen}></Allergen>);
            const AllergenSelected = screen.getByRole("button");
            expect(AllergenSelected).toHaveClass("active");
        });
        test("Then it should change boolean", () => {
            expect(mockAllergen).toHaveProperty("isSelected", true);
        });
    });
    describe("When data are provided in the component", () => {
        test("Then user could interact with them", async () => {
            render(
                <ProductsContext.Provider value={mockContext}>
                    <Allergen allergen={mockAllergen}></Allergen>
                </ProductsContext.Provider>
            );

            const element = screen.getByRole("button");
            userEvent.click(element);
            expect(handleAllergen).toHaveBeenCalledTimes(1);
        });
    });
});
