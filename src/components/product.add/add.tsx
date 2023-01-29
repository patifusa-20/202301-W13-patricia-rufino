import { SyntheticEvent, useContext, useState } from "react";
import { ProductsContext } from "../../context/products.context";
import { ProductModel } from "../../model/product.model";
import { ProductStructure } from "../../types/product.type";
import { Allergens } from "../allergens/allergens";
import { Categories } from "../categories/categories";
import "./add.scss";

export function Add() {
    const { categories, allergens, handleAdd } = useContext(ProductsContext);

    const initialFormData: Partial<ProductStructure> = {
        productName: "",
        image: "",
        price: "",
    };

    const [formData, setFormData] = useState(initialFormData);

    const handleInput = (ev: SyntheticEvent) => {
        const element = ev.target as HTMLFormElement;
        setFormData({ ...formData, [element.name]: element.value });
    };

    const handleSubmit = (ev: SyntheticEvent) => {
        ev.preventDefault();
        formData.image = "generic-image.jpg";
        handleAdd(
            new ProductModel(
                formData.productName as string,
                formData.image,
                formData.price as string,
                categories.filter((category) => category.isSelected),
                allergens.filter((allergen) => allergen.isSelected)
            )
        );
        setFormData(initialFormData);
        categories.map((category) => {
            category.isSelected = false;
        });
        allergens.map((allergen) => {
            allergen.isSelected = false;
        });
    };

    return (
        <section>
            <h3>Add product</h3>
            <form className="add-product" onSubmit={handleSubmit}>
                <div>
                    <label className="add-product__label" htmlFor="productName">
                        Nombre del producto
                    </label>
                    <input
                        className="add-product__input"
                        type="text"
                        name="productName"
                        id="productName"
                        placeholder="Introduce el nombre del producto"
                        value={formData.productName}
                        onInput={handleInput}
                        required
                    />
                </div>
                <div>
                    <label className="add-product__label" htmlFor="price">
                        Precio
                    </label>
                    <input
                        className="add-product__input"
                        type="text"
                        name="price"
                        id="price"
                        placeholder="Introduce el precio"
                        value={formData.price}
                        onInput={handleInput}
                        required
                    />
                </div>
                <Categories></Categories>
                <Allergens></Allergens>
                <div>
                    <button type="submit" className="primary-btn">
                        GUARDAR CAMBIOS
                    </button>
                </div>
            </form>
        </section>
    );
}
