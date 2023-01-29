import { GenericModel } from "../model/generic.model";
import { ProductModel } from "../model/product.model";
import { ProductRepo } from "./products.repo";

describe("Given a Products Repository", () => {
    const mockCategory = [
        new GenericModel("Test category", "Test category icon"),
    ];
    const mockAllergen = [
        new GenericModel("Test allergen", "Test allergen icon"),
    ];
    const mockData = [
        new ProductModel(
            "Test name 1",
            "Test image 1",
            "Test price 1",
            mockCategory,
            mockAllergen
        ),
        new ProductModel(
            "Test name 2",
            "Test image 2",
            "Test price 2",
            mockCategory,
            mockAllergen
        ),
    ];
    const repo = new ProductRepo();

    beforeEach(() => {
        // mocks de fetch
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue(mockData),
        });
    });

    test("Then we can instantiate it", () => {
        expect(repo).toBeInstanceOf(ProductRepo);
    });

    describe("When we use load method", () => {
        test("Then we received the products in the repo", async () => {
            const data = await repo.load();
            expect(global.fetch).toHaveBeenCalled();
            expect(data).toEqual(mockData);
        });
        test("Then if there are NO DATA, we received a rejected promise", async () => {
            global.fetch = jest.fn().mockResolvedValue({
                ok: false,
            });
            await expect(async () => {
                await repo.load();
            }).rejects.toThrowError();
            expect(global.fetch).toHaveBeenCalled();
        });
    });
});
