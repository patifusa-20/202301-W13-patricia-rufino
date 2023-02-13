import { SyntheticEvent, useContext, useState } from "react";
import { ProductsContext } from "../../context/products.context";
import { ExtImages } from "../ext.images/ext.images";
import "./modal.scss";

export function Modal({
    queryImage,
    handleFileInput,
    handleSelectExtImage,
}: {
    queryImage: string;
    handleSelectExtImage: (ev: SyntheticEvent) => void;
    handleFileInput: (ev: SyntheticEvent) => void;
}) {
    const { handleModal } = useContext(ProductsContext);

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
                        <div>
                            <h4>
                                Elige una imagen para tu producto desde tu
                                dispositivo
                            </h4>
                            <input
                                type="file"
                                name="image"
                                id="image"
                                accept="image/png, image/jpeg"
                                onChange={handleFileInput}
                                data-testid="inputFile"
                            />
                        </div>
                        <div>
                            <h4>
                                O si lo prefieres, puedes elegirla de la
                                colección de UnSplash
                            </h4>
                            <button
                                type="button"
                                className="secondary-btn"
                                onClick={handleExtImageBtn}
                            >
                                Seleccionar imagen desde
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
            </div>
        </>
    );
}
