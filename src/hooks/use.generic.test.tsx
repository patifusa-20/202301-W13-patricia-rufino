import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { GenericStructure } from "../types/generic.type";
import { useGeneric } from "./use.generic";

const mockCategory: GenericStructure = {
    id: "1",
    name: "Comidas",
    icon: "Test category icon",
    isSelected: true,
};
const mockAllergen: GenericStructure = {
    id: "2",
    name: "gluten",
    icon: "Test allergen icon",
    isSelected: true,
};
describe(`Given useGeneric (custom hook)
            render with a virtual component`, () => {
    let TestComponentFilter: () => JSX.Element;
    let buttons: Array<HTMLElement>;
    beforeEach(() => {
        TestComponentFilter = () => {
            const { categories, handleFilter } = useGeneric();
            return (
                <>
                    <div>
                        <ul>
                            {categories.map((item) => (
                                <li key={item.icon}>
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
        render(
            <BrowserRouter>
                <TestComponentFilter />
            </BrowserRouter>
        );
        buttons = screen.getAllByRole("button");
    });
    test("Then its function handleFilter should be used", async () => {
        userEvent.click(buttons[0]);
        expect(await screen.findByText(mockCategory.name)).toBeInTheDocument();
    });
});

describe(`Given useGeneric (custom hook)
            render with a virtual component`, () => {
    let TestComponentAllergen: () => JSX.Element;
    let buttons: Array<HTMLElement>;
    beforeEach(() => {
        TestComponentAllergen = () => {
            const { allergens, handleAllergen } = useGeneric();
            return (
                <>
                    <div>
                        <ul>
                            {allergens.map((item) => (
                                <li key={item.icon}>
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
        render(
            <BrowserRouter>
                <TestComponentAllergen />
            </BrowserRouter>
        );
        buttons = screen.getAllByRole("button");
    });
    test("Then its function handleAllergen should be used", async () => {
        userEvent.click(buttons[0]);
        expect(await screen.findByText(mockAllergen.name)).toBeInTheDocument();
    });
});

describe(`Given useGeneric (custom hook)
            render with a virtual component`, () => {
    let TestComponentCategory: () => JSX.Element;
    let buttons: Array<HTMLElement>;
    beforeEach(() => {
        TestComponentCategory = () => {
            const { categories, handleCategory } = useGeneric();
            return (
                <>
                    <div>
                        <ul>
                            {categories.map((item) => (
                                <li key={item.icon}>
                                    <button
                                        onClick={() =>
                                            handleCategory(mockCategory)
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
        render(
            <BrowserRouter>
                <TestComponentCategory />
            </BrowserRouter>
        );
        buttons = screen.getAllByRole("button");
    });
    test("Then its function handleCategory should be used", async () => {
        userEvent.click(buttons[0]);
        expect(await screen.findByText(mockCategory.name)).toBeInTheDocument();
    });
});

describe(`Given useGeneric (custom hook)
            render with a virtual component`, () => {
    let TestComponent: () => JSX.Element;
    let button: HTMLElement;
    beforeEach(() => {
        TestComponent = () => {
            const { handleModal } = useGeneric();
            return (
                <>
                    <div>
                        <button onClick={() => handleModal()}>
                            Show modal
                        </button>
                    </div>
                </>
            );
        };
        render(
            <BrowserRouter>
                <TestComponent />
            </BrowserRouter>
        );
        button = screen.getByRole("button");
    });
    test("Then its function handleModal should be used", async () => {
        userEvent.click(button);
        expect(await screen.findByText("Show modal")).toBeInTheDocument();
    });
});

describe(`Given useGeneric (custom hook)
            render with a virtual component`, () => {
    let TestComponent: () => JSX.Element;
    let button: HTMLElement;
    beforeEach(() => {
        TestComponent = () => {
            const { handleDrawer } = useGeneric();
            return (
                <>
                    <div>
                        <button onClick={() => handleDrawer()}>
                            Show drawer
                        </button>
                    </div>
                </>
            );
        };
        render(
            <BrowserRouter>
                <TestComponent />
            </BrowserRouter>
        );
        button = screen.getByRole("button");
    });
    test("Then its function handleDrawer should be used", async () => {
        userEvent.click(button);
        expect(await screen.findByText("Show drawer")).toBeInTheDocument();
    });
});
