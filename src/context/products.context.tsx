/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from "react";
import { categoriesData } from "../data/categories.data";
import { GenericModel } from "../model/generic.model";
import { ProductsContextStructure } from "../types/products.context.type";

export const initialContext: ProductsContextStructure = {
    item: new GenericModel("", ""),
    items: categoriesData,
    handleFilter: async () => {
        //
    },
};

export const ProductsContext = createContext(initialContext);
