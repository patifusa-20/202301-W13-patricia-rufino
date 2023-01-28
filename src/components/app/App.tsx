import React from "react";
import { Allergens } from "../allergens/allergens";
import { Filters } from "../filters/filters";
import { Products } from "../products/products";

function App() {
    return (
        <>
            <header>
                <p>Hello world.</p>
            </header>
            <Filters></Filters>
            <Allergens></Allergens>
            <Products></Products>
        </>
    );
}

export default App;
