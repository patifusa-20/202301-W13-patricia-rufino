import { useContext } from "react";
import { ProductsContext } from "../../context/products.context";
import { ProductStructure } from "../../types/product.type";
import { Allergens } from "../allergens/allergens";
import { Categories } from "../categories/categories";
import { Modal } from "../modal/modal";
import { useForm } from "../../hooks/use.form";

export function Edit({ product }: { product: ProductStructure }) {
    const { showModal, handleModal, handleDelete } =
        useContext(ProductsContext);

    const initialFormData: Partial<ProductStructure> = {
        id: product.id,
        productName: product.productName,
        image: product.image,
        price: product.price,
        isExtImage: product.isExtImage,
        category: product.category,
    };

    const {
        formData,
        handleInput,
        handleSelectExtImage,
        handleFileInput,
        handleUpdateSubmit,
    } = useForm(initialFormData);

    const handleClickModal = () => {
        handleModal();
    };

    const handleClickDelete = () => {
        handleDelete(formData.id as string);
    };

    return (
        <section>
            <div
                className="bg-preview-image"
                style={{ backgroundImage: `url(${formData.image})` }}
            ></div>
            <form className="add-product" onSubmit={handleUpdateSubmit}>
                <div>
                    <label className="add-product__label" htmlFor="productName">
                        Nombre del producto*
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
                        Precio*
                    </label>
                    <input
                        className="add-product__input"
                        type="text"
                        name="price"
                        id="price"
                        pattern="[0-9]+"
                        placeholder="Introduce el precio"
                        value={formData.price}
                        onInput={handleInput}
                        required
                    />
                </div>
                <button
                    type="button"
                    className="icon-btn"
                    onClick={handleClickModal}
                >
                    <img src="../../assets/icons/icon-image.svg"></img>
                </button>
                <Categories></Categories>
                <Allergens></Allergens>
                <div>
                    <button type="submit" className="primary-btn">
                        GUARDAR CAMBIOS
                    </button>
                </div>
            </form>
            {showModal ? (
                <Modal
                    handleClickModal={handleClickModal}
                    handleFileInput={handleFileInput}
                    handleSelectExtImage={handleSelectExtImage}
                    queryImage={formData.productName as string}
                ></Modal>
            ) : (
                ""
            )}
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
