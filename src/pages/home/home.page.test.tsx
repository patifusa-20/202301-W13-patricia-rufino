import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Login } from "../../components/login/login";
import { Menus } from "../../components/menus/menus";
import { ProductsContext } from "../../context/products.context";
import { ProductsContextStructure } from "../../types/products.context.type";
import HomePage from "./home.page";

jest.mock("../../components/login/login");
jest.mock("../../components/menus/menus");

describe("Given HomePage component", () => {
    describe("When it has been render with logged user", () => {
        const userLogged = { id: "Mock user" };
        const mockContext = {
            userLogged,
        } as unknown as ProductsContextStructure;
        beforeEach(() => {
            (Login as jest.Mock).mockImplementation(() => {
                return <p>Mock Login</p>;
            });
            (Menus as jest.Mock).mockImplementation(() => {
                return <p>Mock Menus</p>;
            });
            render(
                <MemoryRouter>
                    <ProductsContext.Provider value={mockContext}>
                        <HomePage />
                    </ProductsContext.Provider>
                </MemoryRouter>
            );
        });
        test("Then the heading should be in the screen", () => {
            const element = screen.getByRole("heading", {
                name: "Crea el menú de tu restaurante",
            });
            expect(element).toBeInTheDocument();
        });
        test("Then the text in Link component should be in the screen", () => {
            const elementLink = screen.getByText(/Ver mi carta/i);
            expect(elementLink).toBeInTheDocument();
        });
        test("Then the text in Menus component should be in the screen", () => {
            const elementMenus = screen.getByText(/Mock Menus/i);
            expect(elementMenus).toBeInTheDocument();
        });
    });
    describe("When it has been render with NOT logged user", () => {
        const userLogged = { id: "" };
        const mockContext = {
            userLogged,
        } as unknown as ProductsContextStructure;
        beforeEach(() => {
            (Login as jest.Mock).mockImplementation(() => {
                return <p>Mock Login</p>;
            });
            (Menus as jest.Mock).mockImplementation(() => {
                return <p>Mock Menus</p>;
            });
            render(
                <MemoryRouter>
                    <ProductsContext.Provider value={mockContext}>
                        <HomePage />
                    </ProductsContext.Provider>
                </MemoryRouter>
            );
        });
        test("Then the text in Menus component should be in the screen", () => {
            const elementLogin = screen.getByText(/Mock Login/i);
            expect(elementLogin).toBeInTheDocument();
        });
    });
});
