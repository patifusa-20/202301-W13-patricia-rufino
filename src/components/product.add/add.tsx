import { useContext } from "react";
import { ProductsContext } from "../../context/products.context";
import { ProductStructure } from "../../types/product.type";
import { ProductForm } from "../product.form/form";

export function Add() {
    const { category } = useContext(ProductsContext);

    const initialFormData: Partial<ProductStructure> = {
        productName: "",
        image: "",
        price: "",
        isExtImage: false,
        category: category.name,
    };

    return (
        <section>
            <ProductForm formData={initialFormData}></ProductForm>
        </section>
    );
}
