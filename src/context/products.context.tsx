/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from "react";
import { allergensData } from "../data/allergens.data";
import { categoriesData } from "../data/categories.data";
import { ProductStructure } from "../types/product.type";
import { ProductsContextStructure } from "../types/products.context.type";

export const initialContext: ProductsContextStructure = {
    userLogged: {
        id: "",
        userName: "",
        token: "",
        menu: { id: "", name: "", products: [] },
    },
    users: [],
    products: [],
    allergen: allergensData[0],
    allergens: allergensData,
    category: categoriesData[0],
    categories: categoriesData,
    showModal: false,
    showDrawer: false,
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
    handleDrawer: async () => {
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
    handleLoadMenuNotLoggedUser: async (idMenu: string) => {
        //
    },
    handleUsersMenu: async () => {
        //
    },
};

export const ProductsContext = createContext(initialContext);
