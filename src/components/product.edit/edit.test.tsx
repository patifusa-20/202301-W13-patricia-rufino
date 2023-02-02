import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProductsContext } from '../../context/products.context';
import { GenericModel } from '../../model/generic.model';
import { ProductModel } from '../../model/product.model';
import { ProductsContextStructure } from '../../types/products.context.type';
import { Allergens } from '../allergens/allergens';
import { Categories } from '../categories/categories';
import { Edit } from './edit';
jest.mock('../categories/categories');
jest.mock('..//allergens/allergens');
jest.mock('..//modal/modal');
jest.mock('firebase/storage');

describe('Given edit product component', () => {
    const mockCategory = 'Test Category';
    const mockAllergens = [
        new GenericModel('Test allergen', 'Test allergen icon'),
    ];
    const mockProduct = new ProductModel(
        'Test name 1',
        'Test image 1',
        'Test price 1',
        mockCategory,
        mockAllergens,
        false
    );
    mockProduct.id = '0030';
    const handleAdd = jest.fn();
    const handleModal = jest.fn();
    const category = mockCategory;
    const allergens = mockAllergens;
    const showModal = false;

    const mockContext = {
        category,
        allergens,
        handleAdd,
        showModal,
        handleModal,
    } as unknown as ProductsContextStructure;

    beforeEach(() => {
        (Categories as jest.Mock).mockImplementation(() => {
            return <p>Mock Categories</p>;
        });
        (Allergens as jest.Mock).mockImplementation(() => {
            return <p>Mock Allergens</p>;
        });
        render(
            <ProductsContext.Provider value={mockContext}>
                <Edit product={mockProduct}></Edit>
            </ProductsContext.Provider>
        );
    });

    describe('When component is call with a DOM implementation', () => {
        test(`Then it should be render with a labels`, () => {
            const element = screen.getByLabelText('Nombre del producto*'); // <h1>
            expect(element).toBeInTheDocument();
        });
    });

    describe('When data are provided in the form', () => {
        const mockProductName = 'Test ProductName';
        const mockPrice = 'Test price';
        let inputElements: Array<HTMLElement>;
        let buttonElements: Array<HTMLElement>;
        beforeEach(() => {
            inputElements = screen.getAllByRole('textbox'); // <input>
            buttonElements = screen.getAllByRole('button');
        });
        test.skip('Then form could be used for type content', () => {
            expect(inputElements[0]).toBeInTheDocument();
            expect(inputElements[1]).toBeInTheDocument();
            userEvent.type(inputElements[0], mockPrice);
            userEvent.type(inputElements[1], mockProductName);
            expect(inputElements[0]).toHaveValue(mockPrice);
            expect(inputElements[1]).toHaveValue(mockProductName);
        });
        test('Then button could be used for send the function received in context', () => {
            userEvent.click(buttonElements[0]);
            act(() => {
                expect(handleModal).toHaveBeenCalled();
            });
        });
    });
});
