import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ExtImages } from "../ext.images/ext.images";
import { Modal } from "./modal";

jest.mock("..//ext.images/ext.images");

describe("Given Modal component", () => {
    const mockhandleClickModal = jest.fn();
    const mockhandleFileInput = jest.fn();
    const mockhandleSelectExtImage = jest.fn();
    describe("When it is render in the screen", () => {
        let buttonElements: Array<HTMLElement>;
        beforeEach(() => {
            (ExtImages as jest.Mock).mockImplementation(() => {
                return <p>Mock External images</p>;
            });
            render(
                <Modal
                    handleClickModal={mockhandleClickModal}
                    handleFileInput={mockhandleFileInput}
                    handleSelectExtImage={mockhandleSelectExtImage}
                />
            );
            buttonElements = screen.getAllByRole("button");
        });

        test("Then the title should be displayed", () => {
            const title = screen.getByRole("heading", { level: 3 });
            expect(title).toBeInTheDocument();
        });

        test("Then button could be used for send the function received in props", () => {
            userEvent.click(buttonElements[0]);
            act(() => {
                expect(mockhandleClickModal).toHaveBeenCalled();
            });
        });
        test("Then button could be used to fire event on click", async () => {
            userEvent.click(buttonElements[1]);
            const element = await screen.findByText("Mock External images");
            expect(element).toBeInTheDocument();
        });
    });
});
