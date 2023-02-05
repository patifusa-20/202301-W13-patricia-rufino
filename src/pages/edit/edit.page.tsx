import { useContext } from "react";
import { useParams } from "react-router-dom";
import { Edit } from "../../components/product.edit/edit";
import { ProductsContext } from "../../context/products.context";
import { ProductStructure } from "../../types/product.type";

export default function EditPage() {
    const { products } = useContext(ProductsContext);
    const pathName = useParams();

    const productToEdit = products.find(
        (item) => item.id === pathName.id
    ) as ProductStructure;

    return (
        <>
            <h1>Editar producto</h1>
            {productToEdit ? (
                <Edit key={productToEdit.id} product={productToEdit}></Edit>
            ) : (
                <p>Producto eliminado correctamente</p>
            )}
        </>
    );
}
