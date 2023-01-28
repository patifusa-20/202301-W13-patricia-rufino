import { render, screen } from "@testing-library/react";
import { GenericModel } from "../../model/generic.model";
import { Filter } from "./filter";

describe('Given "Filter" component', () => {
    const mockCategory = new GenericModel("Test Category", "Test icon");
    mockCategory.id = "30";
    describe("When data are provided in the component", () => {
        test("Then Category data is rendered on screen", async () => {
            render(<Filter category={mockCategory}></Filter>);

            const elements = screen.getByText(/category/i);
            expect(elements).toBeInTheDocument();
        });
    });
    describe("When a category is selected", () => {
        test("Then className active exist", async () => {
            mockCategory.isSelected = true;
            render(<Filter category={mockCategory}></Filter>);
            const categorySelected = screen.getByRole("button");
            expect(categorySelected).toHaveClass("active");
        });
        test("Then it should change boolean", () => {
            expect(mockCategory).toHaveProperty("isSelected", true);
        });
    });
});
