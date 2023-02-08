import React from "react";
import { render, screen, act } from "@testing-library/react";
import App from "./App";
import { MemoryRouter as Router } from "react-router";
import { Layout } from "../layout/layout";
import { getAuth } from "firebase/auth";

jest.mock("firebase/auth");
//jest.mock("../layout/layout");

test("renders the name of the application", async () => {
    // (Layout as jest.Mock).mockImplementation(() => {
    //     return <p>Mock layout</p>;
    // });
    (getAuth as jest.Mock).mockImplementation(() => {
        return {
            currentUser: { displayName: "Mock name user logged" },
        };
    });
    await act(() =>
        render(
            <Router>
                <App />
            </Router>
        )
    );
    const elementHeader = screen.getByRole("heading", {
        name: "MIY - Menu it yourself",
    });
    expect(elementHeader).toBeInTheDocument();
});
