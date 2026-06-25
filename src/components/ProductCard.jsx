import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
 const { cart, addToCart } = useContext(CartContext);

  const [selectedSize, setSelectedSize] =
    useState("");


const handleAddToCart = () => {
  if (!selectedSize) {
    alert("Seleccione un talle");
    return;
  }

  const stockDisponible =
    Number(product.sizes[selectedSize]);

  const productoEnCarrito =
    cart.find(
      (item) =>
        item.id === product.id &&
        item.selectedSize ===
          selectedSize
    );

  const cantidadActual =
    productoEnCarrito
      ? productoEnCarrito.quantity
      : 0;

  if (
    cantidadActual >=
    stockDisponible
  ) {
    alert(
      `No hay más stock disponible para el talle ${selectedSize}`
    );
    return;
  }

  addToCart({
    ...product,
    selectedSize,
  });
};

  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm">

 <Link to={`/producto/${product.id}`}>
  <img
    src={product.image}
    className="card-img-top product-image"
    alt={product.name}
  />
</Link>

        <div className="card-body">

        <Link
  to={`/producto/${product.id}`}
  className="text-decoration-none text-dark"
>
  <h5>{product.name}</h5>
</Link>

          <p>
            <strong>
              ${Number(product.price).toLocaleString()}
            </strong>
          </p>

          <p>
            Categoría: {product.category}
          </p>

          <div className="mb-3">
            <strong>
              Stock por talle
            </strong>

            <ul>
              {Object.entries(
                product.sizes
              ).map(([size, stock]) => (
                <li key={size}>
                  {size}: {stock}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-3">

            <label className="form-label">
              Seleccione talle
            </label>

            <select
              className="form-select"
              value={selectedSize}
              onChange={(e) =>
                setSelectedSize(
                  e.target.value
                )
              }
            >
              <option value="">
                Seleccione
              </option>

              {Object.entries(
                product.sizes
              ).map(([size, stock]) => (
                <option
                  key={size}
                  value={size}
                  disabled={
                    Number(stock) <= 0
                  }
                >
                  {size}
                  {Number(stock) <= 0
                    ? " - Sin stock"
                    : ""}
                </option>
              ))}
            </select>

          </div>

          <button
            className="btn btn-primary w-100"
            onClick={handleAddToCart}
          >
            Agregar al carrito
          </button>

        </div>
      </div>
    </div>
  );
}

export default ProductCard;