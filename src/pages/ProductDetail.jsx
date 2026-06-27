import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useParams, Link } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import "./Home.css";

function ProductDetail() {
  const { id } = useParams();

  const { products } = useContext(ProductContext);
const { cart, addToCart } = useContext(CartContext);

const [selectedSize, setSelectedSize] = useState("");
  const product = products.find(
    (p) => String(p.id) === id
  );

  const handleAddToCart = () => {
  if (!selectedSize) {
    alert("Seleccione un talle");
    return;
  }

  const stockDisponible = Number(
    product.sizes[selectedSize]
  );

  const productoEnCarrito = cart.find(
    (item) =>
      item.id === product.id &&
      item.selectedSize === selectedSize
  );

  const cantidadActual = productoEnCarrito
    ? productoEnCarrito.quantity
    : 0;

  if (cantidadActual >= stockDisponible) {
    alert(
      `No hay más stock disponible para el talle ${selectedSize}`
    );
    return;
  }

  addToCart({
    ...product,
    selectedSize,
  });

  alert("Producto agregado al carrito");
};

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
  {product.description || "Sin descripción."}
</p>

<hr />

<h5 className="mb-3">
  Seleccione un talle
</h5>

<div className="d-flex gap-2 flex-wrap mb-3">

  {Object.entries(product.sizes).map(
    ([size, stock]) => {

      const stockNum = Number(stock);

      return (

        <button
          key={size}
          type="button"
          className={`btn ${
            selectedSize === size
              ? "btn-dark"
              : "btn-outline-dark"
          } ${
            stockNum <= 0
              ? "opacity-50 text-decoration-line-through"
              : ""
          }`}
          disabled={stockNum <= 0}
          onClick={() =>
            setSelectedSize(size)
          }
        >
          {size}
        </button>

      );

    }
  )}

</div>

{selectedSize && (

  <div className="mb-3">

    <span className="badge bg-dark fs-6">
      Talle: {selectedSize}
    </span>

  </div>

)}

<button
  className="btn btn-dark btn-lg w-100 mb-4"
  disabled={!selectedSize}
  onClick={handleAddToCart}
>
  {!selectedSize
    ? "Seleccione un talle"
    : "🛒 Agregar al carrito"}
</button>

<hr />

        </div>

      </div>

    </div>
  );
}

export default ProductDetail;