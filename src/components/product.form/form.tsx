import { SyntheticEvent, useContext, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase.config";
import { ProductsContext } from "../../context/products.context";
import { ProductModel } from "../../model/product.model";
import { ProductStructure } from "../../types/product.type";
import { Allergens } from "../allergens/allergens";
import { Categories } from "../categories/categories";
import { Modal } from "../modal/modal";
import { useLocation } from "react-router-dom";

export function ProductForm({
    formData,
}: {
    formData: Partial<ProductStructure>;
}) {
    const location = useLocation();

    const {
        category,
        allergens,
        showModal,
        handleAdd,
        handleUpdate,
        handleDelete,
        handleModal,
    } = useContext(ProductsContext);

    const [form, setFormData] = useState(formData);

    const handleInput = (ev: SyntheticEvent) => {
        const element = ev.target as HTMLFormElement;
        setFormData({ ...form, [element.name]: element.value });
    };

    const handleSelectExtImage = (ev: SyntheticEvent) => {
        const element = ev.target as HTMLImageElement;
        form.isExtImage = true;
        setFormData({ ...form, [element.alt]: element.src });
        handleModal();
    };

    const handleFileInput = async (ev: SyntheticEvent) => {
        const element = ev.target as HTMLFormElement;
        const fileObj: File = element.files[0];
        const fileStorage = ref(storage, "images");
        const storageRef = ref(fileStorage, fileObj.name);
        const metadata = {
            contentType: "image/jpeg",
        };
        await uploadBytes(storageRef, fileObj, metadata);
        setFormData({ ...form, [element.name]: fileObj.name });
        handleModal();
    };

    const handleAddSubmit = (ev: SyntheticEvent) => {
        ev.preventDefault();
        const addProduct = new ProductModel(
            form.productName as string,
            form.image as string,
            form.price as string,
            category.name,
            allergens.filter((allergen) => allergen.isSelected),
            form.isExtImage as boolean
        );
        const addLocalImage = () => {
            getDownloadURL(ref(storage, `images/${form.image}`))
                .then((url) => {
                    form.image = url;
                    setFormData({ ...form });
                })
                .then(() => {
                    handleAdd(
                        new ProductModel(
                            form.productName as string,
                            form.image as string,
                            form.price as string,
                            category.name,
                            allergens.filter((allergen) => allergen.isSelected),
                            form.isExtImage as boolean
                        )
                    );
                    setFormData({ ...form });
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        form.isExtImage ? handleAdd(addProduct) : addLocalImage();
        setFormData(formData);
    };

    const addLocalImage = () => {
        if (formData.image !== form.image) {
            getDownloadURL(ref(storage, `images/${form.image}`))
                .then((url) => {
                    form.image = url;
                    setFormData({ ...form });
                })
                .then(() => {
                    handleUpdate(form);
                    setFormData(formData);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            handleUpdate(form);
        }
    };

    const handleUpdateSubmit = (ev: SyntheticEvent) => {
        ev.preventDefault();
        form.category = category.name;
        form.isExtImage ? handleUpdate(form) : addLocalImage();
        setFormData({ ...formData });
    };

    const handleClickDelete = () => {
        handleDelete(formData.id as string);
    };

    const handleClickModal = () => {
        handleModal();
    };

    const pathForm =
        location.pathname === "/add-product"
            ? handleAddSubmit
            : handleUpdateSubmit;

    return (
        <>
            <div
                className="bg-preview-image"
                style={{ backgroundImage: `url(${form.image})` }}
            ></div>

            <form className="add-product" onSubmit={pathForm}>
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
                        value={form.productName}
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
                        value={form.price}
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
            {location.pathname !== "/add-product" ? (
                <button
                    type="button"
                    className="outline-btn"
                    onClick={handleClickDelete}
                >
                    ELIMINAR PRODUCTO
                </button>
            ) : (
                ""
            )}

            {showModal ? (
                <Modal
                    queryImage={form.productName as string}
                    handleSelectExtImage={handleSelectExtImage}
                    handleFileInput={handleFileInput}
                ></Modal>
            ) : (
                ""
            )}
        </>
    );
}
