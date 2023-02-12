import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import { ImageRepo } from "../../repository/ext.image.repo";
import { ImageStructure } from "../../types/ext.image.type";
import "./ext.images.scss";

export function ExtImages({
    handleSelectExtImage,
    queryImage,
}: {
    handleSelectExtImage: (ev: SyntheticEvent) => void;
    queryImage: string;
}) {
    const repo = new ImageRepo();
    const initialState: Array<ImageStructure> = [];

    const [images, setImages] = useState(initialState);

    const handleLoad = useCallback(async () => {
        const imagesSearch = await repo.load(queryImage);
        setImages(imagesSearch);
    }, []);

    useEffect(() => {
        handleLoad();
    }, [handleLoad]);

    return (
        <>
            <div className="custom-header">
                <h2>Colección Unsplash</h2>
                <h4 className="custom-header__subtitle">
                    Imágenes encontradas para <span>{queryImage}</span>
                </h4>
            </div>
            <ul className="custom-list">
                {images.map((image) => {
                    return (
                        <li key={image.id}>
                            <img
                                src={image.urls.small}
                                alt={queryImage}
                                onClick={handleSelectExtImage}
                                id={image.id}
                            />
                            <p>{image.user.name}</p>
                        </li>
                    );
                })}
            </ul>
        </>
    );
}
