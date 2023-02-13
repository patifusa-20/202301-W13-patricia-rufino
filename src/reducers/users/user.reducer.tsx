import { UserStructure } from "../../types/user.type";
import { UserAction } from "./action.creators";
import { userActionStructure } from "./action.types";

export function userReducer(
    state: Array<UserStructure>,
    action: UserAction
): Array<UserStructure> {
    switch (action.type) {
        case userActionStructure.load:
            return action.payload as Array<UserStructure>;

        case userActionStructure.add:
            return [...state, action.payload as UserStructure];

        default:
            return [...state];
    }
}
