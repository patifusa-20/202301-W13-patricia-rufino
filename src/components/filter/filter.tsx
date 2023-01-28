import { useContext } from "react";
import { ProductsContext } from "../../context/products.context";
import { GenericStructure } from "../../types/generic.type.ts";

export function Filter({ category }: { category: GenericStructure }) {
    const { handleFilter } = useContext(ProductsContext);

    const handleFilterSelected = () => {
        category.isSelected = !category.isSelected;
        handleFilter(category);
    };

    return (
        <>
            <li className="filter">
                <div
                    onClick={handleFilterSelected}
                    className={
                        category.isSelected
                            ? "filter_icon active"
                            : "filter_icon"
                    }
                >
                    <img src={category.icon} alt={category.name} />
                </div>
                <p className="filter_title">{category.name}</p>
            </li>
        </>
    );
}
