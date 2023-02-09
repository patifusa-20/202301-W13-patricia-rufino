import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter as Router } from "react-router";
import { ProductsContext } from "../../context/products.context";
import { ProductsContextStructure } from "../../types/products.context.type";
import { Drawer } from "../drawer/drawer";
import { Header } from "./header";
jest.mock("../drawer/drawer");

const handleDrawer = jest.fn();
describe("Given Header component", () => {
    describe("When it has been render and user is logged", () => {
        const userLogged = { id: "Mock user" };
        const showDrawer = true;
        const mockContext = {
            userLogged,
            showDrawer,
            handleDrawer,
        } as unknown as ProductsContextStructure;
        beforeEach(() => {
            (Drawer as jest.Mock).mockImplementation(() => {
                return <p>Mock drawer</p>;
            });
            render(
                <Router>
                    <ProductsContext.Provider value={mockContext}>
                        <Header></Header>
                    </ProductsContext.Provider>
                </Router>
            );
        });
        test("Then the title should be in the screen", () => {
            const elementHeader = screen.getByRole("heading", {
                name: "MIY - Menu it yourself",
            });
            expect(elementHeader).toBeInTheDocument();
        });
        test("If user is logged, then user button could be used for send the function received in context", () => {
            const elementBtn: HTMLButtonElement = screen.getByRole("button");
            userEvent.click(elementBtn);
            expect(handleDrawer).toHaveBeenCalled();
        });
        test("Then drawer component should be in the screen", () => {
            const elementText = screen.getByText("Mock drawer");
            expect(elementText).toBeInTheDocument();
        });
    });
    describe("When it has been render and user is NOT logged", () => {
        const userLogged = { id: "" };
        const showDrawer = false;
        const mockContext = {
            userLogged,
            showDrawer,
            handleDrawer,
        } as unknown as ProductsContextStructure;
        beforeEach(() => {
            (Drawer as jest.Mock).mockImplementation(() => {
                return <p>Mock drawer</p>;
            });
            render(
                <Router>
                    <ProductsContext.Provider value={mockContext}>
                        <Header></Header>
                    </ProductsContext.Provider>
                </Router>
            );
        });
        test("If user is NOT logged, then user shouldn't be render in the screen", () => {
            const elementBtn = screen.findByRole("button");
            expect(elementBtn).rejects.toThrowError();
        });
        test("If drawer is NOT showed, then the text mock drawer shouldn't be render in the screen", () => {
            const element = screen.findByText("Mock drawer");
            expect(element).rejects.toThrowError();
        });
    });
});
