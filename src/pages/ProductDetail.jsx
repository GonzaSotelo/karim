import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

function ProductDetail() {
  const { id } = useParams();

  const { products } =
    useContext(ProductContext);

  const { addToCart } =
    useContext(CartContext);

  const [selectedSize, setSelectedSize] =
    useState("");

  const product = products.find(
    (p) => p.id === Number(id)
  );

  const relatedProducts = products.filter(
  (p) =>
    p.category === product?.category &&
    p.id !== product?.id
);

  if (!product) {
    return (
      <div className="container mt-5">
        <h2>Producto no encontrado</h2>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Seleccione un talle");
      return;
    }

    addToCart({
      ...product,
      selectedSize,
    });
  };

  return (
    <div className="container mt-5">

      <div className="row">

        <div className="col-md-6">

          <img
            src={product.image}
            alt={product.name}
            className="img-fluid rounded shadow"
          />

        </div>

        <div className="col-md-6">

          <h1>{product.name}</h1>

          <h3 className="text-success">
            $
            {Number(
              product.price
            ).toLocaleString()}
          </h3>

          <p>
            Categoría:
            {" "}
            {product.category}
          </p>

          <h5>
            Talles disponibles
          </h5>

          <select
            className="form-select mb-3"
            value={selectedSize}
            onChange={(e) =>
              setSelectedSize(
                e.target.value
              )
            }
          >
            <option value="">
              Seleccione talle
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
                {" "}
                ({stock} disponibles)
              </option>
            ))}
          </select>

          <button
            className="btn btn-dark"
            onClick={handleAddToCart}
          >
            Agregar al carrito
          </button>

        </div>

      </div>
<hr className="my-5" />

<h3 className="mb-4">
  También te puede interesar
</h3>

<div className="row">

  {relatedProducts.slice(0, 4).map(
    (item) => (
      <div
        key={item.id}
        className="col-md-3 mb-4"
      >
        <div className="card h-100 shadow-sm">

          <img
            src={item.image}
            alt={item.name}
            className="card-img-top product-image"
          />

          <div className="card-body">

            <h5>{item.name}</h5>

            <p>
              $
              {Number(
                item.price
              ).toLocaleString()}
            </p>

            <Link
              to={`/producto/${item.id}`}
              className="btn btn-dark w-100"
            >
              Ver producto
            </Link>

          </div>

        </div>
      </div>
    )
  )}

</div>
    </div>
  );
}

export default ProductDetail;