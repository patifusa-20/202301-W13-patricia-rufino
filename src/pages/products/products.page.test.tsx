import { render, screen } from "@testing-library/react";
import { getAuth } from "firebase/auth";
import { Filters } from "../../components/filters/filters";
import { Products } from "../../components/products/products";
import ProductsPage from "./products.page";
jest.mock("../../components/filters/filters");
jest.mock("../../components/products/products");
jest.mock("firebase/auth");

describe("Given ProductsPage component", () => {
    describe("When it has been render and user is logged", () => {
        beforeEach(() => {
            (Filters as jest.Mock).mockImplementation(() => {
                return <p>Mock Filters</p>;
            });
            (Products as jest.Mock).mockImplementation(() => {
                return <p>Mock Products</p>;
            });
            (getAuth as jest.Mock).mockImplementation(() => {
                return { currentUser: { displayName: "Mock auth" } };
            });
        });
        test("Then the label should be in the screen", () => {
            render(<ProductsPage />);
            const element = screen.getByRole("heading", {
                name: "Hola Mock auth",
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
            (getAuth as jest.Mock).mockImplementation(() => {
                return { currentUser: null };
            });
        });
        test("Then the label should be in the screen", () => {
            render(<ProductsPage />);
            const element = screen.getByRole("heading", {
                name: "Bienvenido",
            });
            expect(element).toBeInTheDocument();
        });
    });
});
