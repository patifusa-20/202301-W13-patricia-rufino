import { render, screen } from "@testing-library/react";
import { Edit } from "../../components/product.edit/edit";
import EditPage from "./edit.page";
jest.mock("../../components/product.Edit/Edit");

describe("Given EditPage component", () => {
    describe("When it has been render", () => {
        beforeEach(() => {
            (Edit as jest.Mock).mockImplementation(() => {
                return <p>Mock Edit</p>;
            });
        });
        test("Then the label should be in the screen", () => {
            render(<EditPage />);
            const element = screen.getByRole("heading", {
                name: "Edit product",
            });
            expect(element).toBeInTheDocument();
        });
    });
});
