import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { GenericModel } from "../model/generic.model";
import { ProductModel } from "../model/product.model";
import { ProductRepo } from "../repository/products.repo";
import { useProduct } from "./use.product";

jest.mock("../repository/products.repo");
ProductRepo.prototype.load = jest.fn();
ProductRepo.prototype.create = jest.fn();
ProductRepo.prototype.update = jest.fn();
ProductRepo.prototype.delete = jest.fn();

const mockCategory = "Test category";
const mockAllergen = [new GenericModel("Test allergen", "Test allergen icon")];
const mockProduct = new ProductModel(
    "Test name 1",
    "Test image 1",
    "Test price 1",
    mockCategory,
    mockAllergen,
    false
);
mockProduct.id = "0030";
const mockProduct1 = new ProductModel(
    "Test name 1a",
    "Test image 1a",
    "Test price 1a",
    mockCategory,
    mockAllergen,
    false
);
mockProduct1.id = "0035";

const mockAddProduct = new ProductModel(
    "Test name added",
    "Test image added",
    "Test price added",
    mockCategory,
    mockAllergen,
    false
);
mockAddProduct.id = "0040";

const mockUpdateProduct = new ProductModel(
    "Test name updated",
    "Test image updated",
    "Test price updated",
    mockCategory,
    mockAllergen,
    false
);
mockUpdateProduct.id = "0050";

const mockProducts = [mockProduct, mockProduct1, mockUpdateProduct];

const mockRepoResponse = () => {
    (ProductRepo.prototype.load as jest.Mock).mockResolvedValue(mockProducts);
    (ProductRepo.prototype.create as jest.Mock).mockResolvedValue(
        mockAddProduct
    );
    (ProductRepo.prototype.update as jest.Mock).mockResolvedValue(
        mockAddProduct
    );
    (ProductRepo.prototype.delete as jest.Mock).mockResolvedValue(
        mockAddProduct
    );
};
ProductRepo.prototype.load = jest.fn();
ProductRepo.prototype.create = jest.fn();
ProductRepo.prototype.update = jest.fn();
ProductRepo.prototype.delete = jest.fn();

describe(`Given useProduct (custom hook)
            render with a virtual component`, () => {
    let TestComponent: () => JSX.Element;
    let buttons: Array<HTMLElement>;
    beforeEach(() => {
        TestComponent = () => {
            const { handleLoad, handleAdd, handleUpdate, handleDelete } =
                useProduct();
            return (
                <>
                    <button onClick={handleLoad}>Load</button>
                    <button onClick={() => handleAdd(mockAddProduct)}>
                        Add
                    </button>
                    <button onClick={() => handleUpdate(mockUpdateProduct)}>
                        Update
                    </button>
                    <button onClick={() => handleDelete(mockProduct1.id)}>
                        Delete
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
        render(
            <MemoryRouter>
                <TestComponent />
            </MemoryRouter>
        );
        buttons = screen.getAllByRole("button");
    });
    describe(`When the repo is working OK`, () => {
        beforeEach(mockRepoResponse);

        test("Then its function handleLoad should be add Products to the state", async () => {
            userEvent.click(buttons[0]);
            await act(async () => {
                expect(ProductRepo.prototype.load).toHaveBeenCalled();
                expect(
                    await screen.findByText(mockProduct.productName)
                ).toBeInTheDocument();
            });
        });
        test("Then its function handleAdd should be used", async () => {
            userEvent.click(buttons[0]);
            userEvent.click(buttons[1]);
            waitFor(() => {
                expect(ProductRepo.prototype.create).toHaveBeenCalled();
                expect(
                    screen.findByText(mockAddProduct.productName)
                ).toBeInTheDocument();
            });
        });
        test("Then its function handleUpdate should be used", async () => {
            userEvent.click(buttons[0]);
            userEvent.click(buttons[2]);
            waitFor(() => {
                expect(ProductRepo.prototype.update).toHaveBeenCalled();
                expect(
                    screen.findByText(mockUpdateProduct.productName)
                ).toBeInTheDocument();
            });
        });

        test("Then its function handleDelete should be used", async () => {
            userEvent.click(buttons[0]);
            userEvent.click(buttons[3]);
            waitFor(() => {
                expect(ProductRepo.prototype.delete).toHaveBeenCalled();
                expect(
                    screen.findByText(mockProduct.productName)
                ).toBeInTheDocument();

                expect(() =>
                    screen.findByText(mockProduct1.productName)
                ).rejects.toThrowError();
            });
        });
    });
});
