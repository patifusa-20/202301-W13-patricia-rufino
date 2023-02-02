import { GenericModel } from '../model/generic.model';
import { ProductModel } from '../model/product.model';
import { ProductStructure } from '../types/product.type';
import { ProductRepo } from './products.repo';

describe('Given a Products Repository', () => {
    const mockCategory = 'Test category';
    const mockAllergen = [
        new GenericModel('Test allergen', 'Test allergen icon'),
    ];
    const mockData = [
        new ProductModel(
            'Test name 1',
            'Test image 1',
            'Test price 1',
            mockCategory,
            mockAllergen,
            false
        ),
        new ProductModel(
            'Test name 2',
            'Test image 2',
            'Test price 2',
            mockCategory,
            mockAllergen,
            false
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

    test('Then we can instantiate it', () => {
        expect(repo).toBeInstanceOf(ProductRepo);
    });

    describe('When we use load method', () => {
        test('Then we received the products in the repo', async () => {
            const data = await repo.load();
            expect(global.fetch).toHaveBeenCalled();
            expect(data).toEqual(mockData);
        });
        test('Then if there are NO DATA, we received a rejected promise', async () => {
            global.fetch = jest.fn().mockResolvedValue({
                ok: false,
            });
            await expect(async () => {
                await repo.load();
            }).rejects.toThrowError();
            expect(global.fetch).toHaveBeenCalled();
        });
    });
    describe('When we use create method', () => {
        test(`Then if the data are VALID, we received the product
            created in the repo with its own new id`, async () => {
            const mockNewProductPayload: Partial<ProductStructure> = {
                productName: 'New product name',
                image: 'New image',
                price: 'New price',
                category: mockCategory,
                allergens: mockAllergen,
            };
            global.fetch = jest.fn().mockResolvedValue({
                ok: true,
                json: jest.fn().mockResolvedValue(mockNewProductPayload),
            });

            const data = await repo.create(mockNewProductPayload);
            expect(data).toHaveProperty(
                'productName',
                mockNewProductPayload.productName
            );
            expect(data).toHaveProperty('image', mockNewProductPayload.image);
            expect(data).toHaveProperty('price', mockNewProductPayload.price);
            expect(data).toHaveProperty(
                'category',
                mockNewProductPayload.category
            );
            expect(data).toHaveProperty(
                'allergens',
                mockNewProductPayload.allergens
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
});
