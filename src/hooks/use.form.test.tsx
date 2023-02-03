import { act, waitFor, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Categories } from "../components/categories/categories";
import { Allergens } from "../components/allergens/allergens";
import { GenericModel } from "../model/generic.model";
import { ProductsContextStructure } from "../types/products.context.type";
import { useForm } from "./use.form";
import { MemoryRouter } from "react-router-dom";

jest.mock("../components/categories/categories");
jest.mock("../components/allergens/allergens");
jest.mock("../components/modal/modal");
jest.mock("firebase/storage");

const mockCategory = "Test Category";
const mockAllergens = [new GenericModel("Test allergen", "Test allergen icon")];
const handleModal = jest.fn();
const handleAddSubmit = jest.fn();
const category = mockCategory;
const allergens = mockAllergens;

const mockContext = {
    category,
    handleModal,
} as unknown as ProductsContextStructure;

const mockInitialFormData = {
    productName: "",
    image: "",
    price: "",
    isExtImage: false,
    category: category,
};

const mockImageFile = new File(["hello"], "hello.jpg", { type: "image/jpg" });

describe("Given useForm custom hook render with a virtual component", () => {
    let TestComponent: () => JSX.Element;
    let inputElements: Array<HTMLElement>;
    let buttons: Array<HTMLElement>;
    beforeEach(() => {
        (Categories as jest.Mock).mockImplementation(() => {
            return <p>Mock Categories</p>;
        });
        (Allergens as jest.Mock).mockImplementation(() => {
            return <p>Mock Allergens</p>;
        });
        TestComponent = () => {
            const {
                formData,
                handleInput,
                handleSelectExtImage,
                handleFileInput,
                handleAddSubmit,
                handleUpdateSubmit,
            } = useForm(mockInitialFormData);
            return (
                <>
                    <form onSubmit={() => handleAddSubmit}>
                        <input type="text" onInput={handleInput} />
                        <button type="submit">Enviar formulario</button>
                    </form>
                    <p>{formData.productName}</p>
                    <button onClick={handleSelectExtImage}>
                        Cargar imagen
                    </button>
                    <input type="file" onChange={handleFileInput} />
                </>
            );
        };
        render(
            <MemoryRouter>
                <TestComponent />
            </MemoryRouter>
        );
        buttons = screen.getAllByRole("button");
    });

    describe("When data are provided in the form", () => {
        const mockProductName = "Test ProductName";

        beforeEach(() => {
            inputElements = screen.getAllByRole("textbox"); // <input>
            buttons = screen.getAllByRole("button");
        });
        test("Then form could be used for type content", () => {
            expect(inputElements[0]).toBeInTheDocument();
            userEvent.type(inputElements[0], mockProductName);
            expect(inputElements[0]).toHaveValue(mockProductName);
        });
        test("Then form could be used for call a function", () => {
            userEvent.click(buttons[1]);
            waitFor(() => expect(handleModal).toHaveBeenCalled());
        });
        // Este test está pendiente
        // test("Then form could be used for call a function", async () => {
        //     const fileInput = inputElements[1];
        //     userEvent.upload(fileInput, mockImageFile);
        //     // waitFor(() => expect(handleModal).toHaveBeenCalled());
        // });
    });
});
