import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import { ImageRepo } from "../../repository/ext.image.repo";
import { ImageStructure } from "../../types/ext.image.type";
import "./ext.images.scss";

export function ExtImages({
    handleSelectExtImage,
}: {
    handleSelectExtImage: (ev: SyntheticEvent) => void;
}) {
    const repo = new ImageRepo();
    const initialState: Array<ImageStructure> = [];

    const [images, setImages] = useState(initialState);

    const handleLoad = useCallback(async () => {
        const imagesSearch = await repo.load();
        setImages(imagesSearch.results);
    }, []);

    useEffect(() => {
        handleLoad();
    }, [handleLoad]);

    return (
        <>
            <h2>Unsplash Images</h2>
            <ul className="custom-list">
                {images.map((image) => {
                    return (
                        <li key={image.id}>
                            <img
                                src={
                                    images.length
                                        ? image.urls.small
                                        : "./logo192.png"
                                }
                                alt="image"
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
