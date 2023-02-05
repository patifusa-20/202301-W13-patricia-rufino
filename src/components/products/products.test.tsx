import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ProductsContext } from "../../context/products.context";
import { GenericModel } from "../../model/generic.model";
import { ProductModel } from "../../model/product.model";
import { ProductsContextStructure } from "../../types/products.context.type";
import { Product } from "../product/product";
import { Products } from "./products";
jest.mock("../../components/product/product");

const mockCategory = "Test category";
const mockAllergen = [new GenericModel("Test allergen", "Test allergen icon")];
const mockProduct = new ProductModel(
    "Test name 1",
    "Test image 1",
    "Test price 1",
    mockCategory,
    mockAllergen,
    false
);
const mockProducts = [mockProduct];

const mockContext = {
    category: mockCategory,
    products: mockProducts,
} as unknown as ProductsContextStructure;

describe('Given "Products" component', () => {
    describe("When it load the data from useContext", () => {
        beforeEach(() => {
            (Product as jest.Mock).mockImplementation(() => {
                return <p>Mock Product</p>;
            });
            render(
                <MemoryRouter>
                    <ProductsContext.Provider value={mockContext}>
                        <Products></Products>
                    </ProductsContext.Provider>
                </MemoryRouter>
            );
        });
        test(`Then it should be render the data`, async () => {
            const elementList = await screen.findByRole("list"); // <ul />
            expect(elementList).toBeInTheDocument();
            const elementItem = await screen.findByText(/No hay productos/i);
            expect(elementItem).toBeInTheDocument();
        });
    });
});
