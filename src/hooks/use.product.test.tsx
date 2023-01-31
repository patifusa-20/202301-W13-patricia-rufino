import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GenericModel } from "../model/generic.model";
import { ProductModel } from "../model/product.model";
import { ProductRepo } from "../repository/products.repo";
import { useProduct } from "./use.product";

jest.mock("../repository/products.repo");
ProductRepo.prototype.load = jest.fn();
ProductRepo.prototype.create = jest.fn();

const mockCategory = [new GenericModel("Test category", "Test category icon")];
const mockAllergen = [new GenericModel("Test allergen", "Test allergen icon")];
const mockProduct = new ProductModel(
    "Test name 1",
    "Test image 1",
    "Test price 1",
    mockCategory,
    mockAllergen
);
mockProduct.id = "0030";

const mockProducts = [mockProduct];
const mockAddProduct = new ProductModel(
    "Test name added",
    "Test image added",
    "Test price added",
    mockCategory,
    mockAllergen
);
mockAddProduct.id = "0040";

const mockRepoResponse = () => {
    (ProductRepo.prototype.load as jest.Mock).mockResolvedValue(mockProducts);
    (ProductRepo.prototype.create as jest.Mock).mockResolvedValue(
        mockAddProduct
    );
};

describe(`Given useProduct (custom hook)
            render with a virtual component`, () => {
    let TestComponent: () => JSX.Element;
    let buttons: Array<HTMLElement>;
    beforeEach(() => {
        TestComponent = () => {
            const { handleLoad, handleAdd } = useProduct();
            return (
                <>
                    <button onClick={handleLoad}>Load</button>
                    <button onClick={() => handleAdd(mockAddProduct)}>
                        Add
                    </button>

                    <div>
                        <p>Loaded</p>
                        <ul>
                            {mockProducts.map((product) => (
                                <li key={product.id}>{product.productName}</li>
                            ))}
                        </ul>
                    </div>
                </>
            );
        };
        render(<TestComponent />);
        buttons = screen.getAllByRole("button");
    });
    describe(`When the repo is working OK`, () => {
        beforeEach(mockRepoResponse);

        test("Then its function handleLoad should be add Products to the state", async () => {
            userEvent.click(buttons[0]);
            expect(ProductRepo.prototype.load).toHaveBeenCalled();
            expect(
                await screen.findByText(mockProduct.productName)
            ).toBeInTheDocument();
        });

        test("Then its function handleAdd should be used", async () => {
            userEvent.click(buttons[0]);
            act(async () => {
                userEvent.click(buttons[1]);
                expect(ProductRepo.prototype.create).toHaveBeenCalled();
                expect(
                    await screen.findByText(mockAddProduct.productName)
                ).toBeInTheDocument();
            });
        });
    });
});
