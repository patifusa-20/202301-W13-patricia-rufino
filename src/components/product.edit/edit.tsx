import { ProductStructure } from "../../types/product.type";
import { ProductForm } from "../product.form/form";

export function Edit({ product }: { product: ProductStructure }) {
    const initialFormData: Partial<ProductStructure> = {
        id: product.id,
        productName: product.productName,
        image: product.image,
        price: product.price,
        isExtImage: product.isExtImage,
        category: product.category,
        allergens: product.allergens,
    };

    return (
        <section>
            <ProductForm formData={initialFormData}></ProductForm>
        </section>
    );
}
