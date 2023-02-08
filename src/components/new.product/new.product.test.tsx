import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { NewProduct } from "./new.product";
describe("Given New product component", () => {
    describe("When it has been render", () => {
        beforeEach(() => {
            render(
                <MemoryRouter>
                    <NewProduct></NewProduct>
                </MemoryRouter>
            );
        });
        test("Then the text in card should be in the screen", () => {
            const elementBtn: HTMLButtonElement =
                screen.getByText("Nuevo producto");
            expect(elementBtn).toBeInTheDocument();
        });
    });
});
