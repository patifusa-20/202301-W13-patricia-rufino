export type ImagesSearchStructure = {
    results: Array<ImageStructure>;
};

export type ImageStructure = {
    id: string;
    urls: ImageUrlStructure;
    user: ImageAuthorStructure;
};

type ImageUrlStructure = {
    thumb: string;
    small: string;
    full: string;
};

type ImageAuthorStructure = {
    name: string;
};
