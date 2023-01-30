import { ImagesSearchStructure } from "../types/ext.image.type";
import { RepositoryImages } from "../types/repo.images.type";

export class ImageRepo implements RepositoryImages<ImagesSearchStructure> {
    constructor(
        public url = "https://api.unsplash.com/search/photos?per_page=5&query=bread"
    ) {
        //
    }
    async load(): Promise<ImagesSearchStructure> {
        const resp = await fetch(this.url, {
            headers: {
                Authorization:
                    "Client-ID wXts438c87awZdZh3YMHVFJshIWUc0DcuZxqToHa6Zc",
            },
        });
        if (!resp.ok)
            throw new Error(`Error ${resp.status}: ${resp.statusText}`);
        return await resp.json();
    }
}
