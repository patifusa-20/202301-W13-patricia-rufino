/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from "react";
import { allergensData } from "../data/allergens.data";
import { categoriesData } from "../data/categories.data";
import { GenericModel } from "../model/generic.model";
import { ProductStructure } from "../types/product.type";
import { ProductsContextStructure } from "../types/products.context.type";

export const initialContext: ProductsContextStructure = {
    userLogged: {
        id: "",
        userName: "",
        token: "",
        menu: { id: "", name: "", products: [] },
    },
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
    handleAdd: async (product: ProductStructure) => {
        //
    },
    handleModal: async () => {
        //
    },
    handleUpdate: async (product: Partial<ProductStructure>) => {
        //
    },
    handleDelete: async (id: ProductStructure["id"]) => {
        //
    },
    login: async () => {
        //
    },
    logout: async () => {
        //
    },
    handleLoadUser: async () => {
        //
    },
    handleMenu: async () => {
        //
    },
    handleLoadNotUserMenu: async (idMenu: string) => {
        //
    },
};

export const ProductsContext = createContext(initialContext);
