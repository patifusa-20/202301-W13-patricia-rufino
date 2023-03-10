import { RepositoryUsers } from "../types/repo.user";
import { UserStructure } from "../types/user.type";

export class UserRepo implements RepositoryUsers<UserStructure> {
    constructor(
        public url = "https://digital-menu-app-5cd01-default-rtdb.europe-west1.firebasedatabase.app/users"
    ) {
        //
    }
    async load(): Promise<UserStructure[]> {
        const resp = await fetch(this.url + ".json", {
            headers: {
                Authorization:
                    "Client-ID wXts438c87awZdZh3YMHVFJshIWUc0DcuZxqToHa6Zc",
            },
        });
        if (!resp.ok)
            throw new Error(`Error ${resp.status}: ${resp.statusText}`);
        const response = await resp.json();
        return Object.values(response);
    }

    async create(payload: Partial<UserStructure>): Promise<UserStructure> {
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
}
