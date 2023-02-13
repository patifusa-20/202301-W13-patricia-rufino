import { render, screen } from "@testing-library/react";
import { useContext } from "react";
import * as mocks from "./mock";
import { initialContext, ProductsContext } from "./products.context";

initialContext.categories = mocks.mockCategories;
initialContext.allergens = mocks.mockAllergens;
initialContext.products = mocks.mockProducts;
initialContext.users = mocks.mockUsers;
initialContext.userLogged = mocks.mockUser;
initialContext.allergen = mocks.mockAllergen;
initialContext.category = mocks.mockCategory;

describe("Given the context ProductsContext", () => {
    let TestComponent: () => JSX.Element;
    describe("When a Test Component is wrapper with this context", () => {
        beforeEach(() => {
            TestComponent = () => {
                const {
                    userLogged,
                    users,
                    products,
                    allergen,
                    allergens,
                    category,
                    categories,
                    handleLoad,
                    handleMenu,
                    handleLoadMenuNotLoggedUser,
                    handleUsersMenu,
                    handleAdd,
                    handleUpdate,
                    handleDelete,
                    handleDrawer,
                    handleFilter,
                    handleAllergen,
                    handleCategory,
                    handleModal,
                } = useContext(ProductsContext);

                handleFilter(mocks.mockCategory);
                handleAllergen(mocks.mockAllergen);
                handleCategory(mocks.mockCategory);
                handleModal();
                handleDrawer();
                handleLoad();
                handleAdd(mocks.mockProduct);
                handleUpdate(mocks.mockProduct);
                handleDelete(mocks.mockProduct.id);
                handleMenu();
                handleLoadMenuNotLoggedUser(mocks.mockMenu.id);
                handleUsersMenu();

                return (
                    <>
                        <p>{allergens[1].name}</p>
                        <p>{categories[1].name}</p>
                        <p>{allergen.name}</p>
                        <p>{category.name}</p>
                        <p>{products[0].productName}</p>
                        <p>{users[1].userName}</p>
                        <p>{userLogged.userName}</p>
                    </>
                );
            };
        });
        test("Context values should be used in the component", async () => {
            render(
                <ProductsContext.Provider value={initialContext}>
                    <TestComponent></TestComponent>
                </ProductsContext.Provider>
            );
            const elementCategory = screen.getByText(
                initialContext.categories[1].name
            );
            expect(elementCategory).toBeInTheDocument();

            const elementAllergen = screen.getByText(
                initialContext.allergens[1].name
            );
            expect(elementAllergen).toBeInTheDocument();

            const elementProduct = screen.getByText(
                initialContext.products[0].productName
            );
            expect(elementProduct).toBeInTheDocument();

            const elementUser = screen.getByText(
                initialContext.users[1].userName
            );
            expect(elementUser).toBeInTheDocument();

            const elementUser1 = screen.getByText(
                initialContext.userLogged.userName
            );
            expect(elementUser1).toBeInTheDocument();

            const elementAllergen1 = screen.getByText(
                initialContext.allergen.name
            );
            expect(elementAllergen1).toBeInTheDocument();

            const elementCategory1 = screen.getByText(
                initialContext.category.name
            );
            expect(elementCategory1).toBeInTheDocument();
        });
    });
});
