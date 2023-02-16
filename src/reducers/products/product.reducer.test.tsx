import {
    mockProducts,
    mockProduct1,
    mockProduct,
} from "../../hooks/mocks.use.products";
import { ProductStructure } from "../../types/product.type";
import { ProductAction } from "./action.creators";
import * as actionCreator from "./action.creators";
import { productReducer } from "./product.reducer";

describe("Given the reducer", () => {
    let state: Array<ProductStructure>;
    let action: ProductAction;

    describe('When the action type is "products@load"', () => {
        test("Then it should return as state the loaded data", () => {
            state = [];
            action = actionCreator.productLoadActionCreator(mockProducts);
            const result = productReducer(state, action);
            expect(result).toEqual(mockProducts);
        });
    });

    describe('When the action type is "products@add"', () => {
        test("Then it should return the state with the data added", () => {
            state = [mockProduct];
            action = actionCreator.productAddActionCreator(mockProduct1);
            const result = productReducer(state, action);
            expect(result).toEqual([mockProduct, mockProduct1]);
        });
    });

    describe('When the action type is "products@update"', () => {
        test("Then it should return the state with th data updated", () => {
            const updateProduct: ProductStructure = {
                ...mockProduct,
                image: "new image",
            };
            state = [mockProduct, mockProduct1];
            action = actionCreator.productUpdateActionCreator(updateProduct);
            const result = productReducer(state, action);
            expect(result).toEqual([updateProduct, mockProduct1]);
        });
    });

    describe('When the action type is "products@delete"', () => {
        test("Then it should return the state without the data deleted", () => {
            state = [mockProduct];
            action = actionCreator.productDeleteActionCreator(mockProduct.id);
            const result = productReducer(state, action);
            expect(result).toEqual([]);
        });
    });

    describe("When the action type is not valid", () => {
        test("Then it should return the state", () => {
            state = [];
            action = { type: "Bad", payload: "Test" };
            const result = productReducer(state, action);
            expect(result).toEqual(state);
        });
    });
});
