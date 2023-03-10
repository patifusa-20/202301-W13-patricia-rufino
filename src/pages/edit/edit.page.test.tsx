import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Edit } from "../../components/product.edit/edit";
import { ProductsContext } from "../../context/products.context";
import { GenericModel } from "../../model/generic.model";
import { ProductModel } from "../../model/product.model";
import { ProductStructure } from "../../types/product.type";
import { ProductsContextStructure } from "../../types/products.context.type";
import EditPage from "./edit.page";
jest.mock("../../components/product.edit/edit");

const mockCategory = "Test Category";
const mockAllergens = [new GenericModel("Test allergen", "Test allergen icon")];
const mockProduct = new ProductModel(
    "Test name 1",
    "Test image 1",
    "Test price 1",
    mockCategory,
    mockAllergens,
    false
);
mockProduct.id = "16";

describe("Given EditPage component", () => {
    describe("When it has been render and product to edit exist", () => {
        const products = [mockProduct];
        const mockContext = {
            products,
        } as unknown as ProductsContextStructure;
        beforeEach(() => {
            (Edit as jest.Mock).mockImplementation(() => {
                return <p>Mock Edit</p>;
            });
            render(
                <MemoryRouter initialEntries={["/edit/16"]} initialIndex={0}>
                    <ProductsContext.Provider value={mockContext}>
                        <Routes>
                            <Route
                                path={"/edit/:id"}
                                element={<EditPage />}
                            ></Route>
                        </Routes>
                    </ProductsContext.Provider>
                </MemoryRouter>
            );
        });
        test("Then the heading should be in the screen", () => {
            const element = screen.getByRole("heading", {
                name: "Editar producto",
            });
            expect(element).toBeInTheDocument();
        });
        test("Then the text in edit component should be in the screen", () => {
            const elementEdit = screen.getByText(/Mock Edit/i);
            expect(elementEdit).toBeInTheDocument();
        });
    });
    describe("When it has been render and product to edit has been removed", () => {
        const products: Array<ProductStructure> = [];
        const mockContext = {
            products,
        } as unknown as ProductsContextStructure;
        beforeEach(() => {
            (Edit as jest.Mock).mockImplementation(() => {
                return <p>Mock Edit</p>;
            });
            render(
                <MemoryRouter initialEntries={["/edit/16"]} initialIndex={0}>
                    <ProductsContext.Provider value={mockContext}>
                        <Routes>
                            <Route
                                path={"/edit/:id"}
                                element={<EditPage />}
                            ></Route>
                        </Routes>
                    </ProductsContext.Provider>
                </MemoryRouter>
            );
        });
        test("Then the text in edit page component should be in the screen", () => {
            const elementEdit = screen.getByText(/Producto eliminado/i);
            expect(elementEdit).toBeInTheDocument();
        });
    });
});
