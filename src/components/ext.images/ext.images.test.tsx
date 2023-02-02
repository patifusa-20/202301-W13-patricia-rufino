import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ImageRepo } from "../../repository/ext.image.repo";
import { ExtImages } from "./ext.images";

jest.mock("../../repository/ext.image.repo");
ImageRepo.prototype.load = jest.fn();

const mockImages = [
    {
        id: "001",
        urls: { thumb: "Test url", small: "Test url", full: "Test url" },
        user: { name: "Test author" },
    },
];

describe('Given "External Images" component', () => {
    const mockHandleSelectExtImage = jest.fn();
    const mockQuery = "test";
    describe("When data are provided in the component", () => {
        beforeEach(async () => {
            await act(async () => {
                (ImageRepo.prototype.load as jest.Mock).mockResolvedValue(
                    mockImages
                );
                render(
                    <ExtImages
                        handleSelectExtImage={mockHandleSelectExtImage}
                        queryImage={mockQuery}
                    ></ExtImages>
                );
            });
        });
        test("Then images should be render", async () => {
            const elementList = await screen.findByRole("list"); // <ul />
            expect(elementList).toBeInTheDocument();
        });
        test("Then images could be used to fire event on click", async () => {
            const elementImg = await screen.findAllByAltText("image");
            userEvent.click(elementImg[0]);
            act(() => {
                expect(mockHandleSelectExtImage).toHaveBeenCalled();
            });
        });
    });
});
