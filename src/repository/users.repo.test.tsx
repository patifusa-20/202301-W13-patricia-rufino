import { UserStructure } from "../types/user.type";
import { UserRepo } from "./users.repo";

describe("Given a Users Repository", () => {
    const mockMenu = {
        id: "mockMenu",
        name: "mockMenu",
        products: [],
    };
    const mockUser1 = {
        id: "00015",
        userName: "User1",
        token: "token1",
        menu: mockMenu,
    };
    const mockUser2 = {
        id: "00019",
        userName: "User2",
        token: "token2",
        menu: mockMenu,
    };

    const mockData = [mockUser1, mockUser2];
    const repo = new UserRepo();

    beforeEach(() => {
        // mocks de fetch
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue(mockData),
        });
    });

    test("Then we can instantiate it", () => {
        expect(repo).toBeInstanceOf(UserRepo);
    });

    describe("When we use load method", () => {
        test("Then we received the users in the repo", async () => {
            const data = await repo.load();
            expect(global.fetch).toHaveBeenCalled();
            expect(data).toEqual(mockData);
        });
        test("Then if there are NO DATA, we received a rejected promise", async () => {
            global.fetch = jest.fn().mockResolvedValue({
                ok: false,
            });
            await expect(async () => {
                await repo.load();
            }).rejects.toThrowError();
            expect(global.fetch).toHaveBeenCalled();
        });
    });
    describe("When we use create method", () => {
        test(`Then if the data are VALID, we received the user
            created in the repo with its own new id`, async () => {
            const mockNewUserPayload: Partial<UserStructure> = {
                id: "Id new user",
                userName: "Name new user",
                token: "Token new user",
                menu: mockMenu,
            };
            global.fetch = jest.fn().mockResolvedValue({
                ok: true,
                json: jest.fn().mockResolvedValue(mockNewUserPayload),
            });

            const data = await repo.create(mockNewUserPayload);
            expect(data).toHaveProperty(
                "userName",
                mockNewUserPayload.userName
            );
            expect(data).toHaveProperty("id", mockNewUserPayload.id);
            expect(data).toHaveProperty("token", mockNewUserPayload.token);
            expect(data).toHaveProperty("menu", mockNewUserPayload.menu);
        });
        test(`Then if the data are NOT VALID, we received a rejected promise`, async () => {
            global.fetch = jest.fn().mockResolvedValue({
                ok: false,
            });

            await expect(async () => {
                await repo.create({});
            }).rejects.toThrowError();
            expect(global.fetch).toHaveBeenCalled();
        });
    });
});
