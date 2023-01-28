import { ProductStructure } from "../../types/product.type";

export function Product({ product }: { product: ProductStructure }) {
    return (
        <>
            <li className="card" id={product.id}>
                <div
                    className="card_image"
                    style={{ backgroundImage: `url(${product.image})` }}
                >
                    <p>{product.price}</p>
                </div>
                <p className="card_title">{product.name}</p>
            </li>
        </>
    );
}
