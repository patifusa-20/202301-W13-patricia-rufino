import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProductsContext } from "../../context/products.context";
import { ProductsContextStructure } from "../../types/products.context.type";
import { ExtImages } from "../ext.images/ext.images";
import { Modal } from "./modal";

jest.mock("../ext.images/ext.images");

describe("Given Modal component", () => {
    const handleModal = jest.fn();
    const handleSelectExtImage = jest.fn();
    const handleFileInput = jest.fn();
    const mockQuery = "test";

    const mockContext = {
        handleModal,
    } as unknown as ProductsContextStructure;

    describe("When it is render in the screen", () => {
        let buttonElements: Array<HTMLElement>;
        let inputElement: HTMLInputElement;
        beforeEach(() => {
            (ExtImages as jest.Mock).mockImplementation(() => {
                return (
                    <ul>
                        <li onClick={handleSelectExtImage}>
                            Mock external image
                        </li>
                    </ul>
                );
            });
            render(
                <ProductsContext.Provider value={mockContext}>
                    <Modal
                        queryImage={mockQuery}
                        handleSelectExtImage={handleSelectExtImage}
                        handleFileInput={handleFileInput}
                    />
                </ProductsContext.Provider>
            );

            buttonElements = screen.getAllByRole("button");
            inputElement = screen.getByTestId("inputFile");
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
            const element = await screen.findByText("Mock external image");
            expect(element).toBeInTheDocument();
        });
        test("Then input file could be used to attach a image", async () => {
            const mockImageFile = new File(["hello"], "hello.jpg", {
                type: "image/jpg",
            });
            const fileInput = inputElement;
            expect(fileInput.files?.length).toBe(0);
            userEvent.upload(fileInput, mockImageFile);
            expect(fileInput.files?.length).toBe(1);
            waitFor(() => expect(handleModal).toHaveBeenCalled());
        });
    });
});
