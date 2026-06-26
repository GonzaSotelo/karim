import { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import "./Home.css";

function ProductDetail() {
  const { id } = useParams();

  const { products } = useContext(ProductContext);

  const product = products.find(
    (p) => String(p.id) === id
  );

  if (!product) {
    return (
      <div className="container mt-5 text-center">

        <h2>
          Producto no encontrado
        </h2>

        <Link
          to="/productos"
          className="btn btn-dark mt-3"
        >
          Volver
        </Link>

      </div>
    );
  }

  return (
    <div className="container py-5">

      <div className="row">

        {/* Imagen */}

        <div className="col-lg-6">

    <img
  src={product.image}
  alt={product.name}
  className="img-fluid shadow product-detail-image"
  style={{
    width: "100%",
    maxHeight: "650px",
    objectFit: "cover",
  }}
/>

        </div>

        {/* Información */}

        <div className="col-lg-6">

          {product.featured && (
            <span className="badge bg-danger mb-3">
              ⭐ Producto Destacado
            </span>
          )}

          <h1 className="fw-bold">
            {product.name}
          </h1>

          <p className="text-muted">
            {product.category}
          </p>

          <h2 className="text-success fw-bold mb-4">
            $
            {Number(product.price).toLocaleString()}
          </h2>

          <hr />

          <h5>
            Descripción
          </h5>

      <p className="text-muted">
  {product.description}
</p>

        </div>

      </div>

    </div>
  );
}

export default ProductDetail;