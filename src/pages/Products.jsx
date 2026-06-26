import { useContext, useState } from "react";
import ProductCard from "../components/ProductCard";
import { ProductContext } from "../context/ProductContext";

function Products() {
  const { products } = useContext(ProductContext);

  const [category, setCategory] =
    useState("Todos");
const [search, setSearch] =
  useState("");
 const filteredProducts = products.filter(
  (product) => {
    const matchCategory =
      category === "Todos" ||
      product.category === category;

    const matchSearch =
      product.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        );

    return (
      matchCategory &&
      matchSearch
    );
  }
);

  return (
    <div className="container mt-4">

      <h2 className="mb-4">
        Nuestros Productos
      </h2>



      <div className="mb-4 d-flex gap-2 flex-wrap">
<div className="mb-4">
  <input
    type="text"
    className="form-control"
    placeholder="🔍 Buscar producto..."
    value={search}
    onChange={(e) =>
      setSearch(e.target.value)
    }
  />
</div>
        <button
          className={`btn ${
            category === "Todos"
              ? "btn-dark"
              : "btn-outline-dark"
          }`}
          onClick={() =>
            setCategory("Todos")
          }
        >
          Todos
        </button>

        <button
          className={`btn ${
            category === "Remeras"
              ? "btn-dark"
              : "btn-outline-dark"
          }`}
          onClick={() =>
            setCategory("Remeras")
          }
        >
          Remeras
        </button>

        <button
          className={`btn ${
            category === "Buzos"
              ? "btn-dark"
              : "btn-outline-dark"
          }`}
          onClick={() =>
            setCategory("Buzos")
          }
        >
          Buzos
        </button>

        <button
          className={`btn ${
            category === "Camperas"
              ? "btn-dark"
              : "btn-outline-dark"
          }`}
          onClick={() =>
            setCategory("Camperas")
          }
        >
          Camperas
        </button>

        <button
          className={`btn ${
            category === "Pantalones"
              ? "btn-dark"
              : "btn-outline-dark"
          }`}
          onClick={() =>
            setCategory("Pantalones")
          }
        >
          Pantalones
        </button>

      </div>

      {filteredProducts.length === 0 ? (
        <p>
          No hay productos en esta
          categoría.
        </p>
      ) : (
        <div className="row">
          {filteredProducts.map(
            (product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            )
          )}
        </div>
      )}

    </div>
  );
}

export default Products;