import { render, screen } from "@testing-library/react";
import { GenericModel } from "../../model/generic.model";
import { ProductModel } from "../../model/product.model";
import { Product } from "./product";

describe('Given "Product" component', () => {
    const mockCategory = new GenericModel(
        "Test category",
        "Test category icon"
    );
    const mockAllergen = [
        new GenericModel("Test allergen", "Test allergen icon"),
    ];
    const mockData = new ProductModel(
        "0001",
        "Test name 1",
        "Test price 1",
        "Test image 1",
        mockCategory,
        mockAllergen
    );
    mockData.id = "0030";
    describe("When data are provided in the component", () => {
        test("Then product data is rendered on screen", async () => {
            render(<Product product={mockData}></Product>);

            const elements = screen.getByText(/price/i);
            expect(elements).toBeInTheDocument();
        });
    });
});
