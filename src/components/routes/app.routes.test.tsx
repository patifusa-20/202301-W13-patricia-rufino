import { act, render, screen } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import { AppRoutes } from "./app.routes";

const mockPageTitles = [
    "Test Products",
    "Test Add Product",
    "Test Edit Product",
];
const items = [
    { path: "/products" },
    { path: "/add-product" },
    { path: "/:page/edit/:id" },
];

const testRoute = (index: number) => {
    const title = new RegExp(mockPageTitles[index], "i"); // Antes /Test Home/i;
    const lazyElement = screen.getByText(title);
    expect(lazyElement).toBeInTheDocument();
};

jest.mock("../../pages/products/products.page", () => {
    return () => <p>{mockPageTitles[0]}</p>;
});
jest.mock("../../pages/add/add.page", () => {
    return () => <p>{mockPageTitles[1]}</p>;
});
jest.mock("../../pages/edit/edit.page", () => {
    return () => <p>{mockPageTitles[2]}</p>;
});

describe("Given AppRoutes component, if the user is logged", () => {
    let lazyPaths: Array<string>;

    beforeEach(() => {
        lazyPaths = items.map((item) => item.path);
    });
    describe(`When we render the component 
                And the lazy route is products`, () => {
        beforeEach(async () => {
            await act(async () => {
                render(
                    <Router initialEntries={lazyPaths} initialIndex={0}>
                        <AppRoutes />
                    </Router>
                );
            });
        });
        test("Then it should display the ProductsPage", () => {
            testRoute(0);
        });
    });
    describe(`When we render the component 
                And the lazy route is add-product`, () => {
        beforeEach(async () => {
            await act(async () => {
                render(
                    <Router initialEntries={lazyPaths} initialIndex={1}>
                        <AppRoutes />
                    </Router>
                );
            });
        });
        test("Then it should display the AddPage", () => {
            testRoute(1);
        });
    });
    describe(`When we render the component 
                And the lazy route is edit`, () => {
        beforeEach(async () => {
            await act(async () => {
                render(
                    <Router initialEntries={lazyPaths} initialIndex={2}>
                        <AppRoutes />
                    </Router>
                );
            });
        });
        test("Then it should display the EditPage", () => {
            testRoute(2);
        });
    });
});
