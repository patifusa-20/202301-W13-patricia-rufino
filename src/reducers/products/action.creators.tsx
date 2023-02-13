import { ProductStructure } from "../../types/product.type";
import { productActionStructure } from "./action.types";

export type ProductAction = {
    type: string;
    payload:
        | Array<ProductStructure>
        | ProductStructure
        | ProductStructure["id"];
};

export const productLoadActionCreator = (
    payload: Array<ProductStructure>
): ProductAction => ({
    type: productActionStructure.load,
    payload: payload,
});

export const productAddActionCreator = (
    payload: ProductStructure
): ProductAction => ({
    type: productActionStructure.add,
    payload: payload,
});

export const productUpdateActionCreator = (
    payload: ProductStructure
): ProductAction => ({
    type: productActionStructure.update,
    payload: payload,
});

export const productDeleteActionCreator = (
    payload: ProductStructure["id"]
): ProductAction => ({
    type: productActionStructure.delete,
    payload: payload,
});
