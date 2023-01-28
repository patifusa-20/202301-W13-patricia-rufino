import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GenericStructure } from "../types/generic.type.ts";
import { useProducts } from "./use.products";

const mockCategory: GenericStructure = {
    id: "1",
    name: "snack",
    icon: "Test icon",
    isSelected: true,
};
const mockAllergen: GenericStructure = {
    id: "1",
    name: "gluten",
    icon: "Test icon",
    isSelected: true,
};
describe(`Given useProducts (custom hook)
            render with a virtual component`, () => {
    let TestComponent: () => JSX.Element;
    let buttons: Array<HTMLElement>;
    beforeEach(() => {
        TestComponent = () => {
            const { categories, handleFilter } = useProducts();
            return (
                <>
                    <div>
                        <ul>
                            {categories.map((item) => (
                                <li key={item.id}>
                                    <button
                                        onClick={() =>
                                            handleFilter(mockCategory)
                                        }
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
        expect(await screen.findByText(mockCategory.name)).toBeInTheDocument();
    });
});

describe(`Given useProducts (custom hook)
            render with a virtual component`, () => {
    let TestComponent: () => JSX.Element;
    let buttons: Array<HTMLElement>;
    beforeEach(() => {
        TestComponent = () => {
            const { allergens, handleAllergen } = useProducts();
            return (
                <>
                    <div>
                        <ul>
                            {allergens.map((item) => (
                                <li key={item.id}>
                                    <button
                                        onClick={() =>
                                            handleAllergen(mockAllergen)
                                        }
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
        expect(await screen.findByText(mockAllergen.name)).toBeInTheDocument();
    });
});
