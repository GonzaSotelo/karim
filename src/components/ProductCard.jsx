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

       

          <div className="mb-3">
  <label className="form-label">Seleccione talle</label>

  <div className="d-flex gap-2 flex-wrap">
    {Object.entries(product.sizes).map(([size, stock]) => {
      const stockNum = Number(stock);

      return (
   <button
  key={size}
  type="button"
  className={`btn ${
    selectedSize === size
      ? "btn-dark"
      : "btn-outline-dark"
  } ${stockNum <= 0 ? "opacity-50 text-decoration-line-through" : ""}`}
  disabled={stockNum <= 0}
  onClick={() => setSelectedSize(size)}
>
  {size}
</button>
      );
    })}
  </div>
</div>
{selectedSize && (
  <p className="mt-2">
    Talle seleccionado: <strong>{selectedSize}</strong>
  </p>
)}

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