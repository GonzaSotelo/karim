import { useContext, useState } from "react";
import ProductCard from "../components/ProductCard";
import { ProductContext } from "../context/ProductContext";
import FilterSidebar from "../components/FilterSidebar";
import "./Products.css";

function Products() {
  const { products } = useContext(ProductContext);

const [category, setCategory] = useState("Todos");

const [search, setSearch] = useState("");

const [featuredOnly, setFeaturedOnly] =
  useState(false);

const [priceRange, setPriceRange] =
  useState("");

const [selectedSizes, setSelectedSizes] =
  useState([]);


const filteredProducts = products.filter(
  (product) => {

    const matchCategory =
      category === "Todos" ||
      product.category === category;

    const matchSearch =
      product.name
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchFeatured =
      !featuredOnly ||
      product.featured;

    let matchPrice = true;

    const price = Number(product.price);

    if (priceRange === "0-30000") {
      matchPrice = price <= 30000;
    }

    if (priceRange === "30000-60000") {
      matchPrice =
        price >= 30000 &&
        price <= 60000;
    }

    if (priceRange === "60000+") {
      matchPrice = price > 60000;
    }

    let matchSizes = true;

    if (selectedSizes.length > 0) {

      matchSizes = selectedSizes.some(
        (size) =>
          Number(product.sizes[size]) > 0
      );

    }

    return (
      matchCategory &&
      matchSearch &&
      matchFeatured &&
      matchPrice &&
      matchSizes
    );

  }
);

  return (
    <div className="container mt-4">

     <h2 className="mb-4">
  Nuestros Productos
</h2>

<div className="row">

  <div className="col-lg-3 mb-4">

    <FilterSidebar
      search={search}
      setSearch={setSearch}
      category={category}
      setCategory={setCategory}
      featuredOnly={featuredOnly}
      setFeaturedOnly={setFeaturedOnly}
      priceRange={priceRange}
      setPriceRange={setPriceRange}
      selectedSizes={selectedSizes}
      setSelectedSizes={setSelectedSizes}
    />

  </div>

  <div className="col-lg-9">

    {filteredProducts.length === 0 ? (

      <div className="alert alert-light border">

        No se encontraron productos.

      </div>

    ) : (

      <div className="row">

        {filteredProducts.map((product) => (

          <ProductCard
            key={product.id}
            product={product}
          />

        ))}

      </div>

    )}

  </div>

</div>
    </div>
  );
}

export default Products;