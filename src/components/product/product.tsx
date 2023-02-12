import { Link } from "react-router-dom";
import { ProductStructure } from "../../types/product.type";

export function Product({ product }: { product: ProductStructure }) {
    return (
        <>
            <li className="card" id={product.id}>
                <Link to={`edit/${product.id}`}>
                    <div
                        className="card_image"
                        style={{ backgroundImage: `url(${product.image})` }}
                    >
                        <p>{product.price}€</p>
                    </div>
                    <div className="card_bottom">
                        <p className="card_title">{product.productName}</p>
                        <div className="card_allergens">
                            {product.allergens?.map((item) => {
                                return (
                                    <span key={item.id}>
                                        <img src={item.icon} alt={item.name} />
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                </Link>
            </li>
        </>
    );
}
