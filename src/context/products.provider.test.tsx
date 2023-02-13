import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import * as useGeneric from "../hooks/use.generic";
import * as useProduct from "../hooks/use.product";
import * as useUser from "../hooks/use.user";
import { ProductsContextProvider } from "./products.provider";

describe("Given ProductsContextProvider", () => {
    describe("When we use it", () => {
        test("Then it should call the custom hook useGeneric", () => {
            const spyuseGeneric = jest.spyOn(useGeneric, "useGeneric");
            render(
                <MemoryRouter>
                    <ProductsContextProvider>
                        <></>
                    </ProductsContextProvider>
                </MemoryRouter>
            );
            expect(spyuseGeneric).toHaveBeenCalled();
        });
        test("Then it should call the custom hook useProduct", () => {
            const spyuseProduct = jest.spyOn(useProduct, "useProduct");
            render(
                <MemoryRouter>
                    <ProductsContextProvider>
                        <></>
                    </ProductsContextProvider>
                </MemoryRouter>
            );
            expect(spyuseProduct).toHaveBeenCalled();
        });
        test("Then it should call the custom hook useUser", () => {
            const spyuseUser = jest.spyOn(useUser, "useUser");
            render(
                <MemoryRouter>
                    <ProductsContextProvider>
                        <></>
                    </ProductsContextProvider>
                </MemoryRouter>
            );
            expect(spyuseUser).toHaveBeenCalled();
        });
    });
});
