import { useContext, useState } from "react";
import { ProductsContext } from "../../context/products.context";
import { useForm } from "../../hooks/use.form";
import { ProductStructure } from "../../types/product.type";
import { ExtImages } from "../ext.images/ext.images";
import "./modal.scss";

export function Modal({
    formData,
    queryImage,
}: {
    formData: Partial<ProductStructure>;
    queryImage: string;
}) {
    const { handleModal } = useContext(ProductsContext);
    const { handleSelectExtImage, handleFileInput } = useForm(formData);

    const initialState = false;
    const [showExtImages, setExtImages] = useState(initialState);

    const handleExtImageBtn = () => {
        setExtImages(!showExtImages);
    };

    const handleClickModal = () => {
        handleModal();
    };

    return (
        <>
            <div className="modal__back">
                <div className="modal">
                    <div className="modal__header">
                        <h3>Seleccionar imagen</h3>
                        <button type="button" onClick={handleClickModal}>
                            <img
                                src="../../assets/icons/icon-close.svg"
                                alt="Close modal"
                            ></img>
                        </button>
                    </div>
                    <div className="modal__body">
                        <p>¿De dónde quieres elegir la imagen?</p>
                        <input
                            type="file"
                            name="image"
                            id="image"
                            accept="image/png, image/jpeg"
                            onChange={handleFileInput}
                        />
                        <button
                            type="button"
                            className="secondary-btn"
                            onClick={handleExtImageBtn}
                        >
                            Seleccionar imagen de la colección de
                            <span>UnSplash</span>
                        </button>
                        {showExtImages ? (
                            <ExtImages
                                handleSelectExtImage={handleSelectExtImage}
                                queryImage={queryImage}
                            ></ExtImages>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
