import { ProductStructure } from "../types/product.type";
import { RepositoryProducts } from "../types/repo";

const invalidIdError = new Error("Invalid ID");
export class ProductRepo implements RepositoryProducts<ProductStructure> {
    constructor(
        public url = "https://digital-menu-app-5cd01-default-rtdb.europe-west1.firebasedatabase.app/products"
    ) {
        //
    }
    async load(): Promise<ProductStructure[]> {
        const resp = await fetch(this.url + ".json", {
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
        const resp = await fetch(this.url + ".json", {
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

    async update(
        payload: Partial<ProductStructure>
    ): Promise<ProductStructure> {
        if (!payload.id) return Promise.reject(invalidIdError);
        const resp = await fetch(this.url + "/" + payload.id + ".json", {
            method: "PATCH",
            body: JSON.stringify(payload),
            headers: {
                "Content-type": "application/json",
            },
        });
        if (!resp.ok)
            throw new Error(`Error ${resp.status}: ${resp.statusText}`);
        return await resp.json();
    }

    async delete(id: ProductStructure["id"]): Promise<ProductStructure["id"]> {
        if (!id) return Promise.reject(invalidIdError);
        const resp = await fetch(this.url + "/" + id + ".json", {
            method: "DELETE",
        });
        if (!resp.ok)
            throw new Error(`Error ${resp.status}: ${resp.statusText}`);
        return id;
    }
}
