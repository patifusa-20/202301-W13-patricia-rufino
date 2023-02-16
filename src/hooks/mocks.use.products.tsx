import { GenericModel } from "../model/generic.model";
import { ProductModel } from "../model/product.model";
import { MenuRepo } from "../repository/menus.repo";
import { ProductRepo } from "../repository/products.repo";
import { UserRepo } from "../repository/users.repo";
import { ProductStructure } from "../types/product.type";

const mockCategory = "Test category";
const mockAllergen = [new GenericModel("Test allergen", "Test allergen icon")];

export const mockProduct = new ProductModel(
    "Test name 1",
    "Test image 1",
    "Test price 1",
    mockCategory,
    mockAllergen,
    false
);
mockProduct.id = "0030";
export const mockProduct1 = new ProductModel(
    "Test name 1a",
    "Test image 1a",
    "Test price 1a",
    mockCategory,
    mockAllergen,
    false
);
mockProduct1.id = "0035";

const mockNewObj = { name: "0040" };

export const mockAddProduct = new ProductModel(
    "Test name added",
    "Test image added",
    "Test price added",
    mockCategory,
    mockAllergen,
    false
);
mockAddProduct.id = "0040";

export const mockUpdateProduct = new ProductModel(
    "Test name updated",
    "Test image updated",
    "Test price updated",
    mockCategory,
    mockAllergen,
    false
);
mockUpdateProduct.id = "0050";

export const mockProducts = [mockProduct, mockProduct1, mockUpdateProduct];

export const mockProducts1: Array<ProductStructure> = [];

export const mockMenu1 = {
    id: "0508",
    name: "NameMenu1",
    products: [mockProduct, mockProduct1],
};

const mockMenu2 = {
    id: "0510",
    name: "NameMenu2",
    products: [mockProduct, mockProduct1],
};

const mockMenu3 = {
    id: "0510",
    name: "NameMenu2",
    products: undefined,
};

const mockMenu4 = {
    id: "0510",
    name: "NameMenu2",
    products: [mockAddProduct],
};

export const mockMenus = [mockMenu1, mockMenu2];
export const mockMenus2 = [mockMenu2];
export const mockMenus3 = [mockMenu3];
export const mockMenus4 = [mockMenu4];

export const mockUser = {
    id: "0158",
    userName: "Name Logged User",
    token: "Token Logged User",
    menu: mockMenu2,
};
export const mockUser2 = {
    id: "0325",
    userName: "Name Logged User2",
    token: "Token Logged User2",
    menu: mockMenu2,
};
export const mockUsers = [mockUser, mockUser2];

export const mockRepoResponse = () => {
    (ProductRepo.prototype.load as jest.Mock).mockResolvedValue(mockProducts);
    (ProductRepo.prototype.create as jest.Mock).mockResolvedValue(mockNewObj);
    (ProductRepo.prototype.update as jest.Mock).mockResolvedValue(
        mockUpdateProduct
    );
    (ProductRepo.prototype.delete as jest.Mock).mockResolvedValue(
        mockProduct1.id
    );
    (MenuRepo.prototype.load as jest.Mock).mockResolvedValue(mockMenus);
    (UserRepo.prototype.load as jest.Mock).mockResolvedValue(mockUsers);
};

export const mockRepoResponseCase3 = () => {
    (ProductRepo.prototype.load as jest.Mock).mockResolvedValue(mockProducts);
    (ProductRepo.prototype.create as jest.Mock).mockResolvedValue(mockNewObj);
    (MenuRepo.prototype.load as jest.Mock).mockResolvedValue(mockMenus2);
    (UserRepo.prototype.load as jest.Mock).mockResolvedValue(mockUsers);
};

export const mockRepoResponseCase4 = () => {
    (ProductRepo.prototype.load as jest.Mock).mockResolvedValue(mockProducts1);
    (ProductRepo.prototype.create as jest.Mock).mockResolvedValue(mockNewObj);
    (MenuRepo.prototype.load as jest.Mock).mockResolvedValue(mockMenus3);
    (MenuRepo.prototype.update as jest.Mock).mockResolvedValue(mockMenus4);
    (UserRepo.prototype.load as jest.Mock).mockResolvedValue(mockUsers);
};
