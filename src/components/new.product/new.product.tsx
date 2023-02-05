import { Link } from "react-router-dom";

export function NewProduct() {
    return (
        <>
            <li className="card">
                <Link to={"/add-product"}>
                    <div className="card_image card_add">
                        <img
                            src="../assets/icons/icon-plus.svg"
                            alt="Icono de nuevo producto"
                        ></img>
                    </div>
                    <p className="card_title">Nuevo producto</p>
                </Link>
            </li>
        </>
    );
}
