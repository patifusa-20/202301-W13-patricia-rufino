import { ImageRepo } from "./ext.image.repo";

describe("Given a Images Repository", () => {
    const mockImageUrl = {
        thumb: "Test thumb image",
        small: "Test small image",
        full: "Test full image",
    };
    const mockImageAuthor = { name: "Test author" };
    const mockImage = { id: "0001", urls: mockImageUrl, user: mockImageAuthor };
    const mockImageSearch = [mockImage];
    const mockQuery = "test";

    const repo = new ImageRepo();

    beforeEach(() => {
        // mocks de fetch
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue(mockImageSearch),
        });
    });

    test("Then we can instantiate it", () => {
        expect(repo).toBeInstanceOf(ImageRepo);
    });

    describe("When we use load method", () => {
        test("Then we received the products in the repo", async () => {
            await repo.load(mockQuery);
            expect(global.fetch).toHaveBeenCalled();
        });
        test("Then if there are NO DATA, we received a rejected promise", async () => {
            global.fetch = jest.fn().mockResolvedValue({
                ok: false,
            });
            await expect(async () => {
                await repo.load(mockQuery);
            }).rejects.toThrowError();
            expect(global.fetch).toHaveBeenCalled();
        });
    });
});
