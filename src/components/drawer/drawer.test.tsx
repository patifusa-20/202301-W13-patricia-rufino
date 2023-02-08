import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProductsContext } from "../../context/products.context";
import { ProductsContextStructure } from "../../types/products.context.type";
import { Drawer } from "./drawer";

const userLogged = {};
const handleModal = jest.fn();
const logout = jest.fn();
describe("Given Drawer component", () => {
    describe("When it has been render", () => {
        const mockContext = {
            userLogged,
            handleModal,
            logout,
        } as unknown as ProductsContextStructure;
        beforeEach(() => {
            render(
                <ProductsContext.Provider value={mockContext}>
                    <Drawer></Drawer>
                </ProductsContext.Provider>
            );
        });
        let elementButtons: Array<HTMLButtonElement>;
        test("Then the title should be in the screen", () => {
            const elementHeader = screen.getByRole("heading", {
                name: "Perfil de usuario",
            });
            expect(elementHeader).toBeInTheDocument();
        });
        test("Then close drawer button could be used for send the function received in context", () => {
            elementButtons = screen.getAllByRole("button");
            userEvent.click(elementButtons[0]);
            expect(handleModal).toHaveBeenCalled();
        });
        test("Then logout button could be used for send the function received in context", () => {
            elementButtons = screen.getAllByRole("button");
            userEvent.click(elementButtons[1]);
            expect(logout).toHaveBeenCalled();
        });
    });
});
