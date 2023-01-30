/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from "react";
import { allergensData } from "../data/allergens.data";
import { categoriesData } from "../data/categories.data";
import { GenericModel } from "../model/generic.model";
import { ProductsContextStructure } from "../types/products.context.type";

export const initialContext: ProductsContextStructure = {
    products: [],
    allergen: new GenericModel("", ""),
    allergens: allergensData,
    category: new GenericModel("", ""),
    categories: categoriesData,
    showModal: false,
    handleFilter: async () => {
        //
    },
    handleAllergen: async () => {
        //
    },
    handleCategory: async () => {
        //
    },
    handleLoad: async () => {
        //
    },
    handleAdd: async () => {
        //
    },
    handleModal: async () => {
        //
    },
};

export const ProductsContext = createContext(initialContext);
