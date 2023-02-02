import { render, screen } from "@testing-library/react";
import { Edit } from "../../components/product.edit/edit";
import { GenericModel } from "../../model/generic.model";
import { ProductModel } from "../../model/product.model";
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

describe("Given EditPage component", () => {
    describe("When it has been render", () => {
        beforeEach(() => {
            (Edit as jest.Mock).mockImplementation(() => {
                return <p>Mock Edit</p>;
            });
        });
        test("Then the heading should be in the screen", () => {
            render(<EditPage />);
            const element = screen.getByRole("heading", {
                name: "Editar producto",
            });
            expect(element).toBeInTheDocument();
        });
    });
});
