import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProductsContext } from "../../context/products.context";
import { GenericModel } from "../../model/generic.model";
import { ProductsContextStructure } from "../../types/products.context.type";
import { Filter } from "./filter";

describe('Given "Filter" component', () => {
    const handleFilter = jest.fn();
    const mockCategory = new GenericModel("Test Category", "Test icon");
    mockCategory.id = "30";
    const categories = [mockCategory];
    const mockContext = {
        categories,
        handleFilter,
    } as unknown as ProductsContextStructure;
    describe("When data are provided in the component", () => {
        test("Then Category data is rendered on screen", async () => {
            render(<Filter category={mockCategory}></Filter>);

            const elements = screen.getByText(/category/i);
            expect(elements).toBeInTheDocument();
        });
    });
    describe("When a category is selected", () => {
        test("Then className active exist", async () => {
            mockCategory.isFiltered = true;
            render(<Filter category={mockCategory}></Filter>);
            const categorySelected = screen.getByRole("button");
            expect(categorySelected).toHaveClass("active");
        });
        test("Then it should change boolean", () => {
            expect(mockCategory).toHaveProperty("isFiltered", true);
        });
    });
    describe("When data are provided in the component", () => {
        test("Then user could interact with them", async () => {
            render(
                <ProductsContext.Provider value={mockContext}>
                    <Filter category={mockCategory}></Filter>
                </ProductsContext.Provider>
            );

            const element = screen.getByRole("button");
            userEvent.click(element);
            expect(handleFilter).toHaveBeenCalled;
        });
    });
});
