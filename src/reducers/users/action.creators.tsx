import { UserStructure } from "../../types/user.type";
import { userActionStructure } from "./action.types";

export type UserAction = {
    type: string;
    payload: Array<UserStructure> | UserStructure | UserStructure["id"];
};

export const userLoadActionCreator = (
    payload: Array<UserStructure>
): UserAction => ({
    type: userActionStructure.load,
    payload: payload,
});

export const userAddActionCreator = (payload: UserStructure): UserAction => ({
    type: userActionStructure.add,
    payload: payload,
});
