import { useContext } from "react";
import { ProductsContext } from "../../context/products.context";
import { GenericStructure } from "../../types/generic.type";

export function Category({ category }: { category: GenericStructure }) {
    const { category: categorySelected, handleCategory } =
        useContext(ProductsContext);

    const handleCategorySelected = () => {
        handleCategory(category);
    };

    return (
        <>
            <li className="category">
                <button
                    type="button"
                    onClick={handleCategorySelected}
                    className={
                        category.name === categorySelected.name
                            ? "category_btn active"
                            : "category_btn"
                    }
                >
                    {category.name}
                </button>
            </li>
        </>
    );
}
