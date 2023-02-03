import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProductsContext } from "../../context/products.context";
import { ProductsContextStructure } from "../../types/products.context.type";
import { ExtImages } from "../ext.images/ext.images";
import { Modal } from "./modal";

jest.mock("../ext.images/ext.images");

describe("Given Modal component", () => {
    const mockCategory = { name: "Test Category" };
    const handleModal = jest.fn();
    const category = mockCategory;
    const mockQuery = "test";
    const mockFormData = {
        productName: "",
        image: "",
        price: "",
        isExtImage: false,
        category: category.name,
    };
    const mockContext = {
        handleModal,
    } as unknown as ProductsContextStructure;

    describe("When it is render in the screen", () => {
        let buttonElements: Array<HTMLElement>;
        beforeEach(() => {
            (ExtImages as jest.Mock).mockImplementation(() => {
                return <p>Mock External images</p>;
            });
            render(
                <ProductsContext.Provider value={mockContext}>
                    <Modal formData={mockFormData} queryImage={mockQuery} />
                </ProductsContext.Provider>
            );
            buttonElements = screen.getAllByRole("button");
            screen.debug();
        });

        test("Then the title should be displayed", () => {
            const title = screen.getByRole("heading", { level: 3 });
            expect(title).toBeInTheDocument();
        });

        test("Then button could be used for send the function received in props", () => {
            userEvent.click(buttonElements[0]);
            act(() => {
                expect(handleModal).toHaveBeenCalled();
            });
        });
        test("Then button could be used to fire event on click", async () => {
            userEvent.click(buttonElements[1]);
            const element = await screen.findByText("Mock External images");
            expect(element).toBeInTheDocument();
        });
    });
});
