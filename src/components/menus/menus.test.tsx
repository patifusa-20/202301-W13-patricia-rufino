import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ProductsContext } from "../../context/products.context";
import { ProductsContextStructure } from "../../types/products.context.type";
import { Menus } from "./menus";

describe('Given "Menus" component', () => {
    const mockUser1 = {
        id: "Id user 1",
        userName: "Name user 1",
        token: "Token user 1",
        menu: [],
    };
    const mockUsers = [mockUser1];
    const handleUsersMenu = jest.fn().mockImplementation(() => {
        return ["Mock handleUserMenu"];
    });
    describe("When it load the data from useContext and the data is undefined", () => {
        const mockContext = {
            users: mockUsers,
            handleUsersMenu,
        } as unknown as ProductsContextStructure;
        beforeEach(() => {
            render(
                <ProductsContext.Provider value={mockContext}>
                    <MemoryRouter>
                        <Menus></Menus>
                    </MemoryRouter>
                </ProductsContext.Provider>
            );
        });
        test(`Then it should be render the data`, async () => {
            const elementList = await screen.findByRole("list"); // <ul />
            expect(elementList).toBeInTheDocument();

            const elementItem = await screen.findByText("N.u");
            expect(elementItem).toBeInTheDocument();
        });
    });
});
