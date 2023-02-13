import { ProductModel } from "../model/product.model";
import { GenericStructure } from "../types/generic.type";

export const mockCategory: GenericStructure = {
    id: "1",
    name: "Test category",
    icon: "Test icon",
    isSelected: true,
};
export const mockCategory2: GenericStructure = {
    id: "2",
    name: "Test category 2",
    icon: "Test icon 2",
    isSelected: false,
};
export const mockCategory3: GenericStructure = {
    id: "5",
    name: "Test category 3",
    icon: "Test icon 3",
    isSelected: false,
};
export const mockAllergen: GenericStructure = {
    id: "3",
    name: "Test allergen",
    icon: "Test icon",
    isSelected: true,
};
export const mockAllergen2: GenericStructure = {
    id: "4",
    name: "Test allergen 2",
    icon: "Test icon 2",
    isSelected: false,
};

export const mockAllergens = [mockAllergen, mockAllergen2];
export const mockCategories = [mockCategory, mockCategory2, mockCategory3];

export const mockMenu = { id: "", name: "", products: [] };

export const mockuserLogged = {
    id: "",
    userName: "",
    token: "",
    menu: mockMenu,
};

export const mockusers = [];

export const mockProduct = new ProductModel(
    "Test name 1",
    "Test image 1",
    "Test price 1",
    mockCategory.name,
    mockAllergens,
    false
);
mockProduct.id = "0030";
export const mockProduct1 = new ProductModel(
    "Test name 1a",
    "Test image 1a",
    "Test price 1a",
    mockCategory.name,
    mockAllergens,
    false
);
mockProduct1.id = "0035";
export const mockProducts = [mockProduct, mockProduct1];
