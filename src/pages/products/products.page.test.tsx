import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Filters } from "../../components/filters/filters";
import { Products } from "../../components/products/products";
import ProductsPage from "./products.page";
import { ProductsContext } from "../../context/products.context";
import { ProductsContextStructure } from "../../types/products.context.type";
jest.mock("../../components/filters/filters");
jest.mock("../../components/products/products");

describe("Given ProductsPage component", () => {
    describe("When it has been render and user is logged", () => {
        const userLogged = { userName: "Mock user" };
        const mockContext = {
            userLogged,
        } as unknown as ProductsContextStructure;
        beforeEach(() => {
            (Filters as jest.Mock).mockImplementation(() => {
                return <p>Mock Filters</p>;
            });
            (Products as jest.Mock).mockImplementation(() => {
                return <p>Mock Products</p>;
            });
        });
        test("Then the label should be in the screen", () => {
            render(
                <MemoryRouter initialEntries={["/products"]} initialIndex={0}>
                    <ProductsContext.Provider value={mockContext}>
                        <Routes>
                            <Route
                                path={"/products"}
                                element={<ProductsPage />}
                            ></Route>
                        </Routes>
                    </ProductsContext.Provider>
                </MemoryRouter>
            );
            const element = screen.getByRole("heading", {
                name: "Hola Mock user",
            });
            expect(element).toBeInTheDocument();
        });
    });
    describe("When it has been render and user is not logged", () => {
        beforeEach(() => {
            (Filters as jest.Mock).mockImplementation(() => {
                return <p>Mock Filters</p>;
            });
            (Products as jest.Mock).mockImplementation(() => {
                return <p>Mock Products</p>;
            });
        });
        test("Then the label should be in the screen", () => {
            render(
                <MemoryRouter>
                    <ProductsPage />
                </MemoryRouter>
            );
            const element = screen.getByRole("heading", {
                name: "Bienvenido",
            });
            expect(element).toBeInTheDocument();
        });
    });
});
