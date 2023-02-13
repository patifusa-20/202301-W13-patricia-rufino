import { ProductStructure } from "../../types/product.type";
import { ProductAction } from "./action.creators";
import { productActionStructure } from "./action.types";

export function productReducer(
    state: Array<ProductStructure>,
    action: ProductAction
): Array<ProductStructure> {
    switch (action.type) {
        case productActionStructure.load:
            return action.payload as Array<ProductStructure>;

        case productActionStructure.add:
            return [...state, action.payload as ProductStructure];

        case productActionStructure.update:
            return state.map((item) =>
                item.id === (action.payload as ProductStructure).id
                    ? (action.payload as ProductStructure)
                    : item
            );

        case productActionStructure.delete:
            return state.filter(
                (item) => item.id !== (action.payload as ProductStructure["id"])
            );

        default:
            return [...state];
    }
}
