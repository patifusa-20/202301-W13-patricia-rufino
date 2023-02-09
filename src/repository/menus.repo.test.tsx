import { GenericModel } from "../model/generic.model";
import { ProductModel } from "../model/product.model";
import { MenuStructure } from "../types/menu.type";
import { MenuRepo } from "./menus.repo";

describe("Given a Menus Repository", () => {
    const mockCategory = "Test category";
    const mockAllergen = [
        new GenericModel("Test allergen", "Test allergen icon"),
    ];
    const mockProduct = new ProductModel(
        "Test name 1",
        "Test image 1",
        "Test price 1",
        mockCategory,
        mockAllergen,
        false
    );
    const mockMenu1 = {
        id: "Mock Id Menu 1",
        name: "Mock Name Menu 1",
        Menus: [],
    };
    const mockData = [mockMenu1];
    const repo = new MenuRepo();

    beforeEach(() => {
        // mocks de fetch
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue(mockData),
        });
    });

    test("Then we can instantiate it", () => {
        expect(repo).toBeInstanceOf(MenuRepo);
    });

    describe("When we use load method", () => {
        test("Then we received the menus in the repo", async () => {
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
    describe("When we use create method", () => {
        test(`Then if the data are VALID, we received the Menu
            created in the repo with its own new id`, async () => {
            const mockNewMenuPayload: Partial<MenuStructure> = {
                id: "New Id menu",
                name: "New name",
                products: [mockProduct],
            };
            global.fetch = jest.fn().mockResolvedValue({
                ok: true,
                json: jest.fn().mockResolvedValue(mockNewMenuPayload),
            });

            const data = await repo.create(mockNewMenuPayload);
            expect(data).toHaveProperty("id", mockNewMenuPayload.id);
            expect(data).toHaveProperty("name", mockNewMenuPayload.name);
            expect(data).toHaveProperty(
                "products",
                mockNewMenuPayload.products
            );
        });
        test(`Then if the data are NOT VALID, we received a rejected promise`, async () => {
            global.fetch = jest.fn().mockResolvedValue({
                ok: false,
            });

            await expect(async () => {
                await repo.create({});
            }).rejects.toThrowError();
            expect(global.fetch).toHaveBeenCalled();
        });
    });
    describe("When we use update method", () => {
        test(`Then if the ID are VALID, we received the task 
            update in the repo`, async () => {
            const updatePayload: Partial<MenuStructure> = {
                id: mockData[0].id,
                name: "Name menu",
            };
            global.fetch = jest.fn().mockResolvedValue({
                ok: true,
                json: jest.fn().mockResolvedValue(updatePayload),
            });
            const data = await repo.update(updatePayload);
            expect(data).toHaveProperty("name", updatePayload.name);
        });
        test(`Then if there are NOT ID, we received a null`, async () => {
            await expect(async () => {
                await repo.update({});
            }).rejects.toThrowError();
            expect(global.fetch).not.toHaveBeenCalled();
        });
        test(`Then if the ID are NOT VALID, we received a null`, async () => {
            const updatePayload: Partial<MenuStructure> = {
                id: "bad",
                name: "Name menu",
            };
            global.fetch = jest.fn().mockResolvedValue({
                ok: false,
            });
            await expect(async () => {
                await repo.update(updatePayload);
            }).rejects.toThrowError();
            expect(global.fetch).toHaveBeenCalled();
        });
    });
});
