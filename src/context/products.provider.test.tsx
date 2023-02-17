import { act, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import * as useGeneric from "../hooks/use.generic";
import { ProductsContextProvider } from "./products.provider";

describe("Given ProductsContextProvider", () => {
    describe("When we use it", () => {
        test("Then it should call the custom hook useGeneric", () => {
            const spyuseGeneric = jest.spyOn(useGeneric, "useGeneric");
            act(() => {
                render(
                    <MemoryRouter>
                        <ProductsContextProvider>
                            <></>
                        </ProductsContextProvider>
                    </MemoryRouter>
                );
            });
            expect(spyuseGeneric).toHaveBeenCalled();
        });
    });
});
