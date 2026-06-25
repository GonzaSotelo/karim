import { useState, useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import "./Home.css";

function Admin() {
const {
  addProduct,
  products,
  deleteProduct,
  updateProduct,
} = useContext(ProductContext);

  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    featured: false,
    sizes: {
      S: "",
      M: "",
      L: "",
      XL: "",
    },
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [editingProduct, setEditingProduct] =
  useState(null);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

const handleImageChange = (e) => {
  const file = e.target.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onloadend = () => {
    setPreview(reader.result);
  };

  reader.readAsDataURL(file);
};

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
      ...product,
      image: preview,
    };

    if (editingProduct) {
  updateProduct({
    ...newProduct,
    id: editingProduct.id,
  });

  setEditingProduct(null);
} else {
  addProduct(newProduct);
}

    alert("Producto agregado correctamente");

    setProduct({
      name: "",
      category: "",
      price: "",
      featured: false,
      sizes: {
        S: "",
        M: "",
        L: "",
        XL: "",
      },
    });

  setPreview(null);
setImage(null);
setEditingProduct(null);
  };

  const handleEdit = (product) => {
  setEditingProduct(product);

  setProduct({
    name: product.name,
    category: product.category,
    price: product.price,
    featured: product.featured,
    sizes: product.sizes,
  });

  setPreview(product.image);
  window.scrollTo({
  top: 0,
  behavior: "smooth",
});
};
  return (
    <div className="container mt-4">
      <h2 className="mb-4">
        Panel Administrador
      </h2>

      <form
        onSubmit={handleSubmit}
        className="card p-4 shadow"
      >
        <div className="mb-3">
          <label className="form-label">
            Nombre del producto
          </label>

          <input
            type="text"
            className="form-control"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            Categoría
          </label>

          <select
            className="form-select"
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          >
            <option value="">
              Seleccione una categoría
            </option>

            <option value="Remeras">
              Remeras
            </option>

            <option value="Buzos">
              Buzos
            </option>

            <option value="Camperas">
              Camperas
            </option>

            <option value="Pantalones">
              Pantalones
            </option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">
            Precio
          </label>

          <div className="form-check mb-3">
  <input
    className="form-check-input"
    type="checkbox"
    checked={product.featured}
    onChange={(e) =>
      setProduct({
        ...product,
        featured: e.target.checked,
      })
    }
  />

  <label className="form-check-label">
    Producto destacado
  </label>
</div>

          <input
            type="number"
            className="form-control"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>

        <h5 className="mt-3">
          Stock por talle
        </h5>

        <div className="row">
          {["S", "M", "L", "XL"].map(
            (size) => (
              <div
                key={size}
                className="col-md-3 mb-3"
              >
                <label>{size}</label>

                <input
                  type="number"
                  className="form-control"
                  value={
                    product.sizes[size]
                  }
                  onChange={(e) =>
                    setProduct({
                      ...product,
                      sizes: {
                        ...product.sizes,
                        [size]:
                          e.target.value,
                      },
                    })
                  }
                />
              </div>
            )
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">
            Imagen
          </label>

          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        {preview && (
          <div className="mb-3">
            <p>Vista previa:</p>

            <img
              src={preview}
              alt="Vista previa"
              className="img-fluid rounded border"
              style={{
                maxWidth: "250px",
              }}
            />
          </div>
        )}

        <button
          className="btn btn-primary"
          type="submit"
        >
          {editingProduct
  ? "Actualizar Producto"
  : "Guardar Producto"}
        </button>
      </form>
      {editingProduct && (
  <button
    type="button"
    className="btn btn-secondary ms-2"
    onClick={() => {
      setEditingProduct(null);

      setProduct({
        name: "",
        category: "",
        price: "",
        featured: false,
        sizes: {
          S: "",
          M: "",
          L: "",
          XL: "",
        },
      });

      setPreview(null);
    }}
  >
    Cancelar
  </button>
)}
      <hr className="my-5" />
      

<h3>Productos cargados</h3>
{products.length === 0 ? (
  <p>No hay productos cargados.</p>
) : (
  <div className="row">

    {products.map((product) => (
      <div
        key={product.id}
        className="col-md-4 mb-4"
      >
        <div className="card h-100">

          <img
            src={product.image}
            className="card-img-top product-image"
            alt={product.name}
          />

          <div className="card-body">

            <h5>
              {product.name}
            </h5>

            <p>
              {product.category}
            </p>

            <p>
              $
              {Number(
                product.price
              ).toLocaleString()}
            </p>
<button
  className="btn btn-warning me-2"
  onClick={() =>
    handleEdit(product)
  }
>
  Editar
</button>
            <button
              className="btn btn-danger"
              onClick={() =>
                deleteProduct(
                  product.id
                )
              }
            >
              Eliminar
            </button>

          </div>

        </div>
      </div>
    ))}

  </div>
)}
    </div>
  );
}

export default Admin;