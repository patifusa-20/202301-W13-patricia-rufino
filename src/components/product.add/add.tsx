import { SyntheticEvent, useContext, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase.config";
import { ProductsContext } from "../../context/products.context";
import { ProductModel } from "../../model/product.model";
import { ProductStructure } from "../../types/product.type";
import { Allergens } from "../allergens/allergens";
import { Categories } from "../categories/categories";
import { Modal } from "../modal/modal";
import "./add.scss";

export function Add() {
    const { categories, allergens, handleAdd, showModal, handleModal } =
        useContext(ProductsContext);

    const initialFormData: Partial<ProductStructure> = {
        productName: "",
        image: "",
        price: "",
        isExtImage: false,
    };

    const [formData, setFormData] = useState(initialFormData);

    const handleInput = (ev: SyntheticEvent) => {
        const element = ev.target as HTMLFormElement;
        setFormData({ ...formData, [element.name]: element.value });
    };

    const handleClickModal = () => {
        handleModal();
    };

    const handleSelectExtImage = (ev: SyntheticEvent) => {
        const element = ev.target as HTMLImageElement;
        formData.isExtImage = true;
        setFormData({ ...formData, [element.alt]: element.src });
        handleModal();
    };

    const handleFileInput = async (ev: SyntheticEvent) => {
        const element = ev.target as HTMLFormElement;
        const fileObj: File = element.files[0];
        const storageRef = ref(storage, fileObj.name);
        const metadata = {
            contentType: "image/jpeg",
        };
        await uploadBytes(storageRef, fileObj, metadata);
        setFormData({ ...formData, [element.name]: fileObj.name });
        handleModal();
    };

    const handleSubmit = (ev: SyntheticEvent) => {
        ev.preventDefault();
        const addProduct = new ProductModel(
            formData.productName as string,
            formData.image as string,
            formData.price as string,
            categories.filter((category) => category.isSelected),
            allergens.filter((allergen) => allergen.isSelected)
        );
        const addLocalImage = () => {
            getDownloadURL(ref(storage, formData.image))
                .then((url) => {
                    setFormData({ ...formData, image: url });
                })
                .then(() => {
                    handleAdd(addProduct);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        formData.isExtImage ? handleAdd(addProduct) : addLocalImage();

        categories.map((category) => {
            category.isSelected = false;
        });
        allergens.map((allergen) => {
            allergen.isSelected = false;
        });

        setFormData(initialFormData);
    };

    return (
        <section>
            <div
                className="bg-preview-image"
                style={{ backgroundImage: `url(${formData.image})` }}
            ></div>
            <form className="add-product" onSubmit={handleSubmit}>
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
                    <img src="./assets/icons/icon-image.svg"></img>
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
                ></Modal>
            ) : (
                ""
            )}
        </section>
    );
}
