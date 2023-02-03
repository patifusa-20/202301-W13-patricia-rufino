import { useContext } from "react";
import { ProductsContext } from "../../context/products.context";
import { ProductStructure } from "../../types/product.type";
import { useForm } from "../../hooks/use.form";
import { ProductForm } from "../product.form/form";

export function Edit({ product }: { product: ProductStructure }) {
    const { handleDelete } = useContext(ProductsContext);

    const initialFormData: Partial<ProductStructure> = {
        id: product.id,
        productName: product.productName,
        image: product.image,
        price: product.price,
        isExtImage: product.isExtImage,
        category: product.category,
    };

    const { formData } = useForm(initialFormData);

    const handleClickDelete = () => {
        handleDelete(formData.id as string);
    };

    return (
        <section>
            <ProductForm formData={initialFormData}></ProductForm>
            <button
                type="button"
                className="outline-btn"
                onClick={handleClickDelete}
            >
                ELIMINAR PRODUCTO
            </button>
        </section>
    );
}
