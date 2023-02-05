import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { GenericModel } from "../../model/generic.model";
import { ProductModel } from "../../model/product.model";
import { Product } from "./product";

describe('Given "Product" component', () => {
    const mockCategory = "Test category";
    const mockAllergen = [
        new GenericModel("Test allergen", "Test allergen icon"),
    ];
    const mockData = new ProductModel(
        "Test name 1",
        "Test image 1",
        "Test price 1",
        mockCategory,
        mockAllergen,
        false
    );
    mockData.id = "0030";
    describe("When data are provided in the component", () => {
        test("Then product data is rendered on screen", async () => {
            render(
                <BrowserRouter>
                    <Product product={mockData}></Product>
                </BrowserRouter>
            );

            const elements = screen.getByText(/price/i);
            expect(elements).toBeInTheDocument();
        });
    });
});
