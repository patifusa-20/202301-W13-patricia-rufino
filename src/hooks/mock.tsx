import { GenericModel } from "../model/generic.model";
import { ProductModel } from "../model/product.model";
import { MenuRepo } from "../repository/menus.repo";
import { ProductRepo } from "../repository/products.repo";
import { UserRepo } from "../repository/users.repo";

const mockCategory = "Test category";
const mockAllergen = [new GenericModel("Test allergen", "Test allergen icon")];

const mockProduct = new ProductModel(
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

export const mockMenu1 = { id: "0508", name: "NameMenu1" };
export const mockMenus = [mockMenu1];
const mockMenu2 = {
    id: "0508",
    name: "NameMenu2",
    products: [mockProduct, mockProduct1],
};
export const mockMenus2 = [mockMenu2];

const mockUser = {
    id: "0158",
    name: "Name Logged User",
    token: "Token Logged User",
    menu: { id: "0508" },
};
const mockUser2 = {
    id: "0325",
    name: "Name Logged User2",
    token: "Token Logged User2",
    menu: { id: "0509" },
};
const mockUsers = [mockUser, mockUser2];

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