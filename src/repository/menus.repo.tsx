import { MenuStructure } from "../types/menu.type";
import { RepositoryMenus } from "../types/repo.menu.type";

const invalidIdError = new Error("Invalid ID");
export class MenuRepo implements RepositoryMenus<MenuStructure> {
    constructor(
        public url = "https://digital-menu-app-5cd01-default-rtdb.europe-west1.firebasedatabase.app/menus"
    ) {
        //
    }
    async load(): Promise<MenuStructure[]> {
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

    async create(payload: Partial<MenuStructure>): Promise<MenuStructure> {
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

    async update(payload: Partial<MenuStructure>): Promise<MenuStructure> {
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
}
