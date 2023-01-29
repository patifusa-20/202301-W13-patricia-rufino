import { render, screen } from "@testing-library/react";
import { Filters } from "../../components/filters/filters";
import { Products } from "../../components/products/products";
import ProductsPage from "./products.page";
jest.mock("../../components/filters/filters");
jest.mock("../../components/products/products");

describe("Given ProductsPage component", () => {
    describe("When it has been render", () => {
        beforeEach(() => {
            (Filters as jest.Mock).mockImplementation(() => {
                return <p>Mock Filters</p>;
            });
            (Products as jest.Mock).mockImplementation(() => {
                return <p>Mock Products</p>;
            });
        });
        test("Then the label should be in the screen", () => {
            render(<ProductsPage />);
            const element = screen.getByRole("heading", {
                name: "Products",
            });
            expect(element).toBeInTheDocument();
        });
    });
});
