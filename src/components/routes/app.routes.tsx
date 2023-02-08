import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const Products = lazy(() => import("../../pages/products/products.page"));
const Add = lazy(() => import("../../pages/add/add.page"));
const Edit = lazy(() => import("../../pages/edit/edit.page"));
const Home = lazy(() => import("../../pages/home/home.page"));
const Menu = lazy(() => import("../../pages/products/products.page"));

export function AppRoutes() {
    return (
        <>
            <Suspense>
                <Routes>
                    <Route path={"/"} element={<Home></Home>}></Route>
                    <Route
                        path={"/products"}
                        element={<Products></Products>}
                    ></Route>
                    <Route path={"/add-product"} element={<Add></Add>}></Route>
                    <Route
                        path={":page/edit/:id"}
                        element={<Edit></Edit>}
                    ></Route>
                    <Route path={"menu/:id"} element={<Menu></Menu>}></Route>
                    <Route
                        path={"*"}
                        element={<Navigate to="/" replace></Navigate>}
                    ></Route>
                </Routes>
            </Suspense>
        </>
    );
}
