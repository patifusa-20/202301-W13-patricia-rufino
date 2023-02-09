import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
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
mockProduct.id = "000020";
const mockProduct2 = new ProductModel(
    "Test name 2",
    "Test image 2",
    "Test price 2",
    "Test category 2",
    mockAllergen,
    false
);
mockProduct2.id = "000040";
const mockProducts = [mockProduct, mockProduct2];

const handleLoad = jest.fn();
const handleLoadMenuNotLoggedUser = jest.fn();

describe('Given "Products" component', () => {
    describe("When it load the data from useContext and the data is undefined", () => {
        const mockContext = {
            category: mockCategory,
            products: undefined,
            handleLoad,
            handleLoadMenuNotLoggedUser,
        } as unknown as ProductsContextStructure;
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
    describe("When it load the data from useContext and the data is OK", () => {
        const mockContext = {
            category: { name: mockCategory },
            products: mockProducts,
            handleLoad,
            handleLoadMenuNotLoggedUser,
        } as unknown as ProductsContextStructure;
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
            const elementItem = await screen.findByText(/Mock Product/i);
            expect(elementItem).toBeInTheDocument();
        });
    });
    describe("When pathname is /products, then the data should be load from useContext", () => {
        const mockContext = {
            category: mockCategory,
            products: mockProducts,
            handleLoad,
            handleLoadMenuNotLoggedUser,
        } as unknown as ProductsContextStructure;
        beforeEach(() => {
            (Product as jest.Mock).mockImplementation(() => {
                return <p>Mock Product</p>;
            });
            render(
                <MemoryRouter initialEntries={["/products"]} initialIndex={0}>
                    <ProductsContext.Provider value={mockContext}>
                        <Routes>
                            <Route
                                path={"/products"}
                                element={<Products />}
                            ></Route>
                        </Routes>
                    </ProductsContext.Provider>
                </MemoryRouter>
            );
        });
        test(`Then it should be render the data`, async () => {
            expect(handleLoad).toHaveBeenCalled();
        });
    });
});
