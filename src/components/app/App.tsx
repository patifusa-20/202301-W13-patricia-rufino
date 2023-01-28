import React from "react";
import { Allergens } from "../allergens/allergens";
import { Filters } from "../filters/filters";

function App() {
    return (
        <>
            <header>
                <p>Hello world.</p>
            </header>
            <Filters></Filters>
            <Allergens></Allergens>
        </>
    );
}

export default App;
