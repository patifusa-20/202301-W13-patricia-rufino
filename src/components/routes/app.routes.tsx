import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Add } from "../product.add/add";

const Products = lazy(() => import("../../pages/products/products.page"));

export function AppRoutes() {
    return (
        <>
            <Suspense>
                <Routes>
                    <Route
                        path={"/products"}
                        element={<Products></Products>}
                    ></Route>
                    <Route path={"/add-product"} element={<Add></Add>}></Route>
                    <Route
                        path={"*"}
                        element={<Navigate to="/products" replace></Navigate>}
                    ></Route>
                </Routes>
            </Suspense>
        </>
    );
}
