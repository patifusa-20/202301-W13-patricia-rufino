import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProductsContext } from "../../context/products.context";
import { ProductsContextStructure } from "../../types/products.context.type";
import { Login } from "./login";

const login = jest.fn();

describe("Given Login component", () => {
    describe("When it has been render", () => {
        const mockContext = {
            login,
        } as unknown as ProductsContextStructure;

        beforeEach(() => {
            render(
                <ProductsContext.Provider value={mockContext}>
                    <Login></Login>
                </ProductsContext.Provider>
            );
        });

        test("Then the login button should be in the screen", () => {
            const elementBtn: HTMLButtonElement = screen.getByRole("button");
            expect(elementBtn).toBeInTheDocument();
        });
        test("Then login button could be used for send the function received in context", () => {
            const elementBtn: HTMLButtonElement = screen.getByRole("button");
            userEvent.click(elementBtn);
            expect(login).toHaveBeenCalled();
        });
    });
});
