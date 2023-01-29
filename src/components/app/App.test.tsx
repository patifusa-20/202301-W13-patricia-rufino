import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { MemoryRouter as Router } from "react-router";

test("renders the name of the application", () => {
    render(
        <Router>
            <App />
        </Router>
    );
    const elementHeader = screen.getByRole("heading", {
        name: "MIY - Menu it yourself",
    });
    expect(elementHeader).toBeInTheDocument();
});
