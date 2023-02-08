import { render, screen } from "@testing-library/react";
import { getAuth } from "firebase/auth";
import { BrowserRouter } from "react-router-dom";
import { Login } from "../../components/login/login";
import { Menus } from "../../components/menus/menus";
import HomePage from "./home.page";

jest.mock("../../components/login/login");
jest.mock("../../components/menus/menus");
jest.mock("firebase/auth");

describe("Given HomePage component", () => {
    describe("When it has been render with logged user", () => {
        beforeEach(() => {
            (Login as jest.Mock).mockImplementation(() => {
                return <p>Mock Login</p>;
            });
            (Menus as jest.Mock).mockImplementation(() => {
                return <p>Mock Menus</p>;
            });
            (getAuth as jest.Mock).mockImplementation(() => {
                return {
                    currentUser: { displayName: "Mock name user logged" },
                };
            });
            render(
                <BrowserRouter>
                    <HomePage />
                </BrowserRouter>
            );
        });
        test("Then the heading should be in the screen", () => {
            const element = screen.getByRole("heading", {
                name: "Crea el menú de tu restaurante",
            });
            expect(element).toBeInTheDocument();
        });
        test("Then the text in Link component should be in the screen", () => {
            const elementLink = screen.getByText(/Ver mi carta/i);
            expect(elementLink).toBeInTheDocument();
        });
        test("Then the text in Menus component should be in the screen", () => {
            const elementMenus = screen.getByText(/Mock Menus/i);
            expect(elementMenus).toBeInTheDocument();
        });
    });
    describe("When it has been render with NOT logged user", () => {
        beforeEach(() => {
            (Login as jest.Mock).mockImplementation(() => {
                return <p>Mock Login</p>;
            });
            (Menus as jest.Mock).mockImplementation(() => {
                return <p>Mock Menus</p>;
            });
            (getAuth as jest.Mock).mockImplementation(() => {
                return {
                    currentUser: null,
                };
            });
            render(
                <BrowserRouter>
                    <HomePage />
                </BrowserRouter>
            );
        });
        test("Then the text in Menus component should be in the screen", () => {
            const elementLogin = screen.getByText(/Mock Login/i);
            expect(elementLogin).toBeInTheDocument();
        });
    });
});
