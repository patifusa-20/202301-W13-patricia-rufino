import { GenericModel } from "../../model/generic.model";
import { ProductsContextStructure } from "../../types/products.context.type";

const mockCategory = new GenericModel("Test Category", "icon category");
mockCategory.isFiltered = false;
const mockAllergens = [new GenericModel("Test allergen", "Test allergen icon")];
const category = mockCategory;
const categories = [mockCategory];
const allergens = mockAllergens;
const showModal = false;

const handleAdd = jest.fn();
const handleModal = jest.fn().mockReturnValue(!showModal);
const handleUpdate = jest.fn();
const handleDelete = jest.fn();
const handleFilter = jest.fn();

export const mockContext = {
    category,
    categories,
    allergens,
    handleAdd,
    handleUpdate,
    showModal,
    handleDelete,
    handleModal,
    handleFilter,
} as unknown as ProductsContextStructure;

export const mockFormData = {
    productName: "",
    image: "",
    price: "",
    isExtImage: false,
    category: category.name,
};

export const mockFormDataCase2 = {
    productName: "",
    image: "",
    price: "",
    isExtImage: true,
    category: category.name,
};
