import { render, screen } from "@testing-library/react";
import { Add } from "../../components/product.add/add";
import AddPage from "./add.page";
jest.mock("../../components/product.add/add");

describe("Given AddPage component", () => {
    describe("When it has been render", () => {
        beforeEach(() => {
            (Add as jest.Mock).mockImplementation(() => {
                return <p>Mock Add</p>;
            });
        });
        test("Then the label should be in the screen", () => {
            render(<AddPage />);
            const element = screen.getByRole("heading", {
                name: "Añadir nuevo producto",
            });
            expect(element).toBeInTheDocument();
        });
    });
});
