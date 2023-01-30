import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProductsContext } from "../../context/products.context";
import { GenericModel } from "../../model/generic.model";
import { ProductsContextStructure } from "../../types/products.context.type";
import { Category } from "./category";

describe('Given "Category" component', () => {
    const handleCategory = jest.fn();
    const mockContext = {
        handleCategory,
    } as unknown as ProductsContextStructure;
    const mockCategory = new GenericModel("Test category", "Test icon");
    mockCategory.id = "30";
    describe("When data are provided in the component", () => {
        test("Then Category data is rendered on screen", async () => {
            render(<Category category={mockCategory}></Category>);

            const element = screen.getByText(/category/i);
            expect(element).toBeInTheDocument();
        });
    });
    describe("When a Category is selected", () => {
        test("Then className active exist", async () => {
            mockCategory.isSelected = true;
            render(<Category category={mockCategory}></Category>);
            const CategorySelected = screen.getByRole("button");
            expect(CategorySelected).toHaveClass("active");
        });
        test("Then it should change boolean", () => {
            expect(mockCategory).toHaveProperty("isSelected", true);
        });
    });
    describe("When data are provided in the component", () => {
        test("Then user could interact with them", async () => {
            render(
                <ProductsContext.Provider value={mockContext}>
                    <Category category={mockCategory}></Category>
                </ProductsContext.Provider>
            );

            const element = screen.getByRole("button");
            userEvent.click(element);
            expect(handleCategory).toHaveBeenCalledTimes(1);
        });
    });
});