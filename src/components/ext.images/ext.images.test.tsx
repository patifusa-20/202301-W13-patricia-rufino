import { render, screen, act } from "@testing-library/react";
import { ExtImages } from "./ext.images";

describe('Given "External Images" component', () => {
    const mockHandleSelectExtImage = jest.fn();

    describe("When data are provided in the component", () => {
        beforeEach(async () => {
            await act(async () => {
                render(
                    <ExtImages
                        handleSelectExtImage={mockHandleSelectExtImage}
                    ></ExtImages>
                );
            });
        });
        test("Then images should be render", async () => {
            const elementList = await screen.findByRole("list"); // <ul />
            expect(elementList).toBeInTheDocument();
        });
    });
});
