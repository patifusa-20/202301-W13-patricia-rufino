import { Filters } from "../../components/filters/filters";
import { Products } from "../../components/products/products";

export default function ProductsPage() {
    return (
        <>
            <section>
                <h1>Products</h1>
                <Filters></Filters>
                <Products></Products>
            </section>
        </>
    );
}
