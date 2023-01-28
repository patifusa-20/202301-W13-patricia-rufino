import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GenericStructure } from "../types/generic.type.ts";
import { useProducts } from "./use.products";

const mockItem: GenericStructure = {
    id: "1",
    name: "snack",
    icon: "Test icon",
    isSelected: true,
};

describe(`Given useProducts (custom hook)
            render with a virtual component`, () => {
    let TestComponent: () => JSX.Element;
    let buttons: Array<HTMLElement>;
    beforeEach(() => {
        TestComponent = () => {
            const { item, items, handleFilter } = useProducts();
            return (
                <>
                    <div>
                        <ul>
                            {items.map((item) => (
                                <li key={item.id}>
                                    <button
                                        onClick={() => handleFilter(mockItem)}
                                    >
                                        {item.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            );
        };
        render(<TestComponent />);
        buttons = screen.getAllByRole("button");
    });
    test("Then its function handleFilter should be used", async () => {
        userEvent.click(buttons[0]);
        expect(await screen.findByText(mockItem.name)).toBeInTheDocument();
    });
});
