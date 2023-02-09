import { ImageStructure } from "../types/ext.image.type";
import { RepositoryImages } from "../types/repo.images.type";

export class ImageRepo implements RepositoryImages<ImageStructure> {
    constructor(
        public url = "https://api.unsplash.com/search/photos?lang=es&per_page=33&query="
    ) {
        //
    }
    async load(query: string): Promise<ImageStructure[]> {
        const resp = await fetch(this.url + query, {
            headers: {
                Authorization:
                    "Client-ID wXts438c87awZdZh3YMHVFJshIWUc0DcuZxqToHa6Zc",
            },
        });
        if (!resp.ok)
            throw new Error(`Error ${resp.status}: ${resp.statusText}`);
        const imagesObj = await resp.json();
        return imagesObj.results;
    }
}
