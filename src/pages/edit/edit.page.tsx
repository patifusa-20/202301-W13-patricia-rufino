import { useContext } from "react";
import { useParams } from "react-router-dom";
import { Edit } from "../../components/product.edit/edit";
import { ProductsContext } from "../../context/products.context";

export default function EditPage() {
    const { products } = useContext(ProductsContext);
    const pathName = useParams();

    return (
        <>
            <h1>Editar producto</h1>
            {products.map((item) => {
                if (item.id === pathName.id) {
                    return <Edit key={item.id} product={item}></Edit>;
                }
            })}
        </>
    );
}
