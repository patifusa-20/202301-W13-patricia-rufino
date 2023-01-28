import { ProductsContext } from "../../context/products.context";
import { GenericStructure } from "../../types/generic.type.ts";
import { useContext } from "react";

export function Allergen({ allergen }: { allergen: GenericStructure }) {
    const { handleAllergen } = useContext(ProductsContext);

    const handleAllergenSelected = () => {
        allergen.isSelected = !allergen.isSelected;
        handleAllergen(allergen);
    };
    return (
        <>
            <li className="allergen">
                <button
                    onClick={handleAllergenSelected}
                    className={
                        allergen.isSelected
                            ? "allergen_icon active"
                            : "allergen_icon"
                    }
                >
                    <img src={allergen.icon} alt={allergen.name} />
                </button>
            </li>
        </>
    );
}
