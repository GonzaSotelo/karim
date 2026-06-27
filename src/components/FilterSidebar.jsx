function FilterSidebar({
  search,
  setSearch,
  category,
  setCategory,
  featuredOnly,
  setFeaturedOnly,
  priceRange,
  setPriceRange,
  selectedSizes,
  setSelectedSizes,
}) {

  const handleSizeChange = (size) => {

    if (selectedSizes.includes(size)) {

      setSelectedSizes(
        selectedSizes.filter((s) => s !== size)
      );

    } else {

      setSelectedSizes([
        ...selectedSizes,
        size,
      ]);

    }

  };

  return (

    <div className="card p-4 filter-sidebar">

      <h4 className="mb-4">
        Filtros
      </h4>

      {/* Buscador */}

      <div className="mb-4">

        <label className="form-label fw-semibold">
          Buscar
        </label>

        <input
          type="text"
          className="form-control"
          placeholder="Buscar producto..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>

      {/* Categoría */}

      <div className="mb-4">

<h6 className="filter-title">
  Categorías
</h6>

<div className="category-list">

  {[
    "Todos",
    "Remeras",
    "Buzos",
    "Camperas",
    "Pantalones",
  ].map((cat) => (

    <button
      key={cat}
      type="button"
      className={`category-btn ${
        category === cat
          ? "active"
          : ""
      }`}
      onClick={() =>
        setCategory(cat)
      }
    >
      {cat}
    </button>

  ))}

</div>

      </div>

      {/* Precio */}

      <div className="mb-4">

        <label className="form-label fw-semibold">
          Precio
        </label>

    <h6 className="filter-title">
  Precio
</h6>

<div className="category-list">

  <button
    type="button"
    className={`category-btn ${
      priceRange === ""
        ? "active"
        : ""
    }`}
    onClick={() =>
      setPriceRange("")
    }
  >
    Todos
  </button>

  <button
    type="button"
    className={`category-btn ${
      priceRange === "0-30000"
        ? "active"
        : ""
    }`}
    onClick={() =>
      setPriceRange("0-30000")
    }
  >
    Hasta $30.000
  </button>

  <button
    type="button"
    className={`category-btn ${
      priceRange === "30000-60000"
        ? "active"
        : ""
    }`}
    onClick={() =>
      setPriceRange("30000-60000")
    }
  >
    $30.000 - $60.000
  </button>

  <button
    type="button"
    className={`category-btn ${
      priceRange === "60000+"
        ? "active"
        : ""
    }`}
    onClick={() =>
      setPriceRange("60000+")
    }
  >
    Más de $60.000
  </button>

</div>

      </div>

      {/* Talles */}

      <div className="mb-4">

        <label className="form-label fw-semibold">
          Talles
        </label>

        {["S", "M", "L", "XL"].map((size) => (

          <div
            className="form-check"
            key={size}
          >

            <input
              className="form-check-input"
              type="checkbox"
              checked={selectedSizes.includes(size)}
              onChange={() =>
                handleSizeChange(size)
              }
            />

            <label className="form-check-label">
              {size}
            </label>

          </div>

        ))}

      </div>

      {/* Destacados */}

      <div className="form-check mb-4">

        <input
          className="form-check-input"
          type="checkbox"
          checked={featuredOnly}
          onChange={(e) =>
            setFeaturedOnly(
              e.target.checked
            )
          }
        />

        <label className="form-check-label">
          Solo destacados
        </label>

      </div>

      <button
        className="btn btn-outline-dark w-100"
        onClick={() => {

          setSearch("");

          setCategory("Todos");

          setFeaturedOnly(false);

          setPriceRange("");

          setSelectedSizes([]);

        }}
      >

        Limpiar filtros

      </button>

    </div>

  );

}

export default FilterSidebar;