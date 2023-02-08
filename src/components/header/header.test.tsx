import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { getAuth } from "firebase/auth";
import { MemoryRouter as Router } from "react-router";
import { ProductsContext } from "../../context/products.context";
import { ProductsContextStructure } from "../../types/products.context.type";
import { Drawer } from "../drawer/drawer";
import { Header } from "./header";
jest.mock("firebase/auth");
jest.mock("../drawer/drawer");

const handleModal = jest.fn();
describe("Given Header component", () => {
    describe("When it has been render and user is logged", () => {
        const showModal = true;
        const mockContext = {
            showModal,
            handleModal,
        } as unknown as ProductsContextStructure;
        beforeEach(() => {
            (getAuth as jest.Mock).mockImplementation(() => {
                return {
                    currentUser: { displayName: "Mock name user logged" },
                };
            });
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
            expect(handleModal).toHaveBeenCalled();
        });
        test("Then drawer component should be in the screen", () => {
            const elementText = screen.getByText("Mock drawer");
            expect(elementText).toBeInTheDocument();
        });
    });
    describe("When it has been render and user is NOT logged", () => {
        const showModal = false;
        const mockContext = {
            showModal,
            handleModal,
        } as unknown as ProductsContextStructure;
        beforeEach(() => {
            (getAuth as jest.Mock).mockImplementation(() => {
                return {
                    currentUser: null,
                };
            });
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
