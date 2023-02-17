import { mockUsers, mockUser2, mockUser } from "../../hooks/mocks.use.products";
import { UserStructure } from "../../types/user.type";
import { UserAction } from "./action.creators";
import * as actionCreator from "./action.creators";
import { userReducer } from "./user.reducer";

describe("Given the reducer", () => {
    let state: Array<UserStructure>;
    let action: UserAction;

    describe('When the action type is "users@load"', () => {
        test("Then it should return as state the loaded data", () => {
            state = [];
            action = actionCreator.userLoadActionCreator(mockUsers);
            const result = userReducer(state, action);
            expect(result).toEqual(mockUsers);
        });
    });

    describe('When the action type is "users@add"', () => {
        test("Then it should return the state with the data added", () => {
            state = [mockUser];
            action = actionCreator.userAddActionCreator(mockUser2);
            const result = userReducer(state, action);
            expect(result).toEqual([mockUser, mockUser2]);
        });
    });

    describe("When the action type is not valid", () => {
        test("Then it should return the state", () => {
            state = [];
            action = { type: "Bad", payload: "Test" };
            const result = userReducer(state, action);
            expect(result).toEqual(state);
        });
    });
});
