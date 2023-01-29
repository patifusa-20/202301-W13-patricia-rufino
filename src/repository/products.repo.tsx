import { ProductStructure } from "../types/product.type";
import { RepositoryProducts } from "../types/repo";

export class ProductRepo implements RepositoryProducts<ProductStructure> {
    constructor(
        public url = "https://digital-menu-app-5cd01-default-rtdb.europe-west1.firebasedatabase.app/products.json"
    ) {
        //
    }
    async load(): Promise<ProductStructure[]> {
        const resp = await fetch(this.url, {
            headers: {
                Authorization:
                    "Client-ID wXts438c87awZdZh3YMHVFJshIWUc0DcuZxqToHa6Zc",
            },
        });
        if (!resp.ok)
            throw new Error(`Error ${resp.status}: ${resp.statusText}`);
        const response = await resp.json();
        for (const key in response) {
            response[key].id = key;
        }
        return Object.values(response);
    }

    async create(
        payload: Partial<ProductStructure>
    ): Promise<ProductStructure> {
        const resp = await fetch(this.url, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-type": "application/json",
            },
        });
        if (!resp.ok)
            throw new Error(`Error ${resp.status}: ${resp.statusText}`);
        return await resp.json();
    }
}
