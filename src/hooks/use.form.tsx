import { SyntheticEvent, useContext, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase.config";
import { ProductsContext } from "../context/products.context";
import { ProductStructure } from "../types/product.type";
import { ProductModel } from "../model/product.model";

export function useForm(initialFormData: Partial<ProductStructure>) {
    const { category, allergens, handleAdd, handleUpdate, handleModal } =
        useContext(ProductsContext);

    const [formData, setFormData] = useState(initialFormData);

    const handleInput = (ev: SyntheticEvent) => {
        const element = ev.target as HTMLFormElement;
        setFormData({ ...formData, [element.name]: element.value });
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
        const fileStorage = ref(storage, "images");
        const storageRef = ref(fileStorage, fileObj.name);
        const metadata = {
            contentType: "image/jpeg",
        };
        await uploadBytes(storageRef, fileObj, metadata);
        setFormData({ ...formData, [element.name]: fileObj.name });
        handleModal();
    };

    const handleAddSubmit = (ev: SyntheticEvent) => {
        ev.preventDefault();
        const addProduct = new ProductModel(
            formData.productName as string,
            formData.image as string,
            formData.price as string,
            category.name,
            allergens.filter((allergen) => allergen.isSelected),
            formData.isExtImage as boolean
        );
        const addLocalImage = () => {
            getDownloadURL(ref(storage, `images/${formData.image}`))
                .then((url) => {
                    formData.image = url;
                    setFormData({ ...formData });
                })
                .then(() => {
                    handleAdd(
                        new ProductModel(
                            formData.productName as string,
                            formData.image as string,
                            formData.price as string,
                            category.name,
                            allergens.filter((allergen) => allergen.isSelected),
                            formData.isExtImage as boolean
                        )
                    );
                    setFormData(initialFormData);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        formData.isExtImage ? handleAdd(addProduct) : addLocalImage();
        setFormData(initialFormData);
    };

    const addLocalImage = () => {
        if (formData.image !== initialFormData.image) {
            getDownloadURL(ref(storage, `images/${formData.image}`))
                .then((url) => {
                    formData.image = url;
                    setFormData({ ...formData });
                })
                .then(() => {
                    handleUpdate(formData);
                    setFormData(initialFormData);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            handleUpdate(formData);
        }
    };

    const handleUpdateSubmit = (ev: SyntheticEvent) => {
        ev.preventDefault();
        formData.category = category.name;
        formData.isExtImage ? handleUpdate(formData) : addLocalImage();
        setFormData({ ...formData });
    };

    return {
        formData,
        handleInput,
        handleSelectExtImage,
        handleFileInput,
        handleAddSubmit,
        handleUpdateSubmit,
    };
}
