import { SyntheticEvent, useState } from "react";
import { ExtImages } from "../ext.images/ext.images";
import "./modal.scss";

export function Modal({
    handleClickModal,
    handleFileInput,
    handleSelectExtImage,
    queryImage,
}: {
    handleClickModal: () => void;
    handleFileInput: (ev: SyntheticEvent) => void;
    handleSelectExtImage: (ev: SyntheticEvent) => void;
    queryImage: string;
}) {
    const initialState = false;
    const [showExtImages, setExtImages] = useState(initialState);

    const handleExtImageBtn = () => {
        setExtImages(!showExtImages);
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
