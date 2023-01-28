import { render } from "@testing-library/react";
import * as useGeneric from "../hooks/use.generic";
import { ProductsContextProvider } from "./products.provider";

describe("Given ProductsContextProvider", () => {
    describe("When we use it", () => {
        test("Then it should call the custom hook useGeneric", () => {
            const spyuseGeneric = jest.spyOn(useGeneric, "useGeneric");
            render(
                <ProductsContextProvider>
                    <></>
                </ProductsContextProvider>
            );
            expect(spyuseGeneric).toHaveBeenCalled();
        });
    });
});
