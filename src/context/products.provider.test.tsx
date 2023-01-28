import { render } from "@testing-library/react";
import * as useProducts from "../hooks/use.products";
import { ProductsContextProvider } from "./products.provider";

describe("Given ProductsContextProvider", () => {
    describe("When we use it", () => {
        test("Then it should call the custom hook useProducts", () => {
            const spyUseProducts = jest.spyOn(useProducts, "useProducts");
            render(
                <ProductsContextProvider>
                    <></>
                </ProductsContextProvider>
            );
            expect(spyUseProducts).toHaveBeenCalled();
        });
    });
});
