import { useState, useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import { uploadImage } from "../services/productService";
import "./Home.css";

function Admin() {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
  } = useContext(ProductContext);

  const [loading, setLoading] = useState(false);

  const [editingProduct, setEditingProduct] =
    useState(null);

  const [image, setImage] = useState(null);

  const [preview, setPreview] =
    useState(null);

const [product, setProduct] = useState({
  name: "",
  category: "",
  price: "",
  description: "",
  featured: false,
  sizes: {
    S: "",
    M: "",
    L: "",
    XL: "",
  },
});

  const handleChange = (e) => {
  const { name, value } = e.target;

  setProduct((prev) => ({
    ...prev,
    [name]: value,
  }));
};

const handleImageChange = (e) => {
  const file = e.target.files[0];

  if (!file) return;

  setImage(file);

  const reader = new FileReader();

  reader.onloadend = () => {
    setPreview(reader.result);
  };

  reader.readAsDataURL(file);
};

const resetForm = () => {
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

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    let imageUrl = preview;

    if (image) {
      imageUrl = await uploadImage(image);
    }

    const newProduct = {
      ...product,
      image: imageUrl,
    };

    if (editingProduct) {
      await updateProduct({
        ...newProduct,
        id: editingProduct.id,
      });

      alert("Producto actualizado");
    } else {
      await addProduct(newProduct);

      alert("Producto agregado");
    }

    resetForm();

  } catch (error) {
    console.error(error);

    alert("Ocurrió un error");
  } finally {
    setLoading(false);
  }
};

const handleEdit = (product) => {
  setEditingProduct(product);

  setProduct({
    name: product.name,
    category: product.category,
    price: product.price,
    description: product.description || "",
    featured: product.featured,
    sizes: product.sizes,
  });

  setPreview(product.image);

  // importante
  setImage(null);

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const cancelEdit = () => {
  resetForm();
};


  return (
    <div className="container mt-4">
      <h2 className="mb-4">
        Panel Administrador
      </h2>

     <form onSubmit={handleSubmit} className="card shadow p-4 mb-5">

  <h4 className="mb-4">
    {editingProduct
      ? "Editar producto"
      : "Nuevo producto"}
  </h4>

  <div className="mb-3">
    <label className="form-label">
      Nombre
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
<div className="mb-3">

  <label className="form-label">
    Descripción
  </label>

  <textarea
    className="form-control"
    rows="4"
    name="description"
    value={product.description}
    onChange={handleChange}
  />

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

  <div className="form-check mb-4">

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

  <h5 className="mb-3">
    Stock por talle
  </h5>

  <div className="row">

    {["S", "M", "L", "XL"].map((size) => (

      <div
        key={size}
        className="col-md-3 mb-3"
      >

        <label>{size}</label>

        <input
          type="number"
          className="form-control"
          value={product.sizes[size]}
          onChange={(e) =>
            setProduct({
              ...product,
              sizes: {
                ...product.sizes,
                [size]: e.target.value,
              },
            })
          }
        />

      </div>

    ))}

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

    <div className="mb-4 text-center">

      <img
        src={preview}
        alt="preview"
        className="img-thumbnail"
        style={{
          width: "220px",
          height: "220px",
          objectFit: "cover",
        }}
      />

    </div>

  )}

  <div className="d-flex gap-2">

    <button
      type="submit"
      className="btn btn-primary flex-grow-1"
      disabled={loading}
    >
      {loading
        ? "Guardando..."
        : editingProduct
        ? "Actualizar producto"
        : "Guardar producto"}
    </button>

    {editingProduct && (

      <button
        type="button"
        className="btn btn-secondary"
        onClick={cancelEdit}
        disabled={loading}
      >
        Cancelar
      </button>

    )}

  </div>

</form>
    
      <hr className="my-5" />

<h3 className="mb-4">
  Productos cargados
</h3>

{products.length === 0 ? (
  <div className="alert alert-info">
    No hay productos cargados.
  </div>
) : (
  <div className="row">

    {products.map((product) => {

      const totalStock = Object.values(product.sizes)
        .reduce((acc, stock) => acc + Number(stock), 0);

      return (

        <div
          key={product.id}
          className="col-lg-4 col-md-6 mb-4"
        >

          <div className="card shadow-sm h-100">

            <img
              src={product.image}
              className="card-img-top product-image"
              alt={product.name}
            />

            <div className="card-body">

              <div className="d-flex justify-content-between align-items-start">

                <h5>
                  {product.name}
                </h5>

                {product.featured && (
                  <span className="badge bg-warning text-dark">
                    ⭐ Destacado
                  </span>
                )}

              </div>

              <p className="text-muted mb-2">
                {product.category}
              </p>

              <h5 className="text-success mb-3">
                $
                {Number(product.price).toLocaleString()}
              </h5>
<label className="form-label">
  Descripción
</label>

<textarea
  className="form-control"
  rows="4"
  name="description"
  value={product.description}
  onChange={handleChange}
/>
              <strong>
                Stock
              </strong>

              <ul className="list-group list-group-flush mb-3 mt-2">

                {Object.entries(product.sizes).map(
                  ([size, stock]) => (

                    <li
                      key={size}
                      className="list-group-item d-flex justify-content-between"
                    >

                      <span>
                        {size}
                      </span>

                      <span
                        className={
                          Number(stock) === 0
                            ? "text-danger fw-bold"
                            : Number(stock) <= 3
                            ? "text-warning fw-bold"
                            : "text-success fw-bold"
                        }
                      >
                        {stock}
                      </span>

                    </li>

                  )
                )}

              </ul>

              <p className="fw-bold">
                Total:
                {" "}
                {totalStock}
                {" "}
                unidades
              </p>

            </div>

            <div className="card-footer bg-white border-0">

              <div className="d-grid gap-2">

                <button
                  className="btn btn-warning"
                  onClick={() =>
                    handleEdit(product)
                  }
                >
                  ✏️ Editar
                </button>

                <button
                  className="btn btn-danger"
                  onClick={() => {

                    if (
                      window.confirm(
                        "¿Eliminar este producto?"
                      )
                    ) {
                      deleteProduct(product.id);
                    }

                  }}
                >
                  🗑️ Eliminar
                </button>

              </div>

            </div>

          </div>

        </div>

      );

    })}

  </div>
)}
    </div>
  );
}

export default Admin;