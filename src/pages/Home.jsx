import { Link } from "react-router-dom";
import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import "./Home.css";

function Home() {
  const { products } = useContext(ProductContext);

  const featuredProducts = products.filter(
    (product) => product.featured
  );

  return (
    <>
      {/* Banner */}
      <section className="hero-section d-flex align-items-center">
        <div className="container text-white">

          <h4>NUEVA COLECCIÓN</h4>

          <h1 className="display-2 fw-bold">
            ESTILO QUE
            <br />
            TE REPRESENTA
          </h1>

          <p className="lead">
            Ropa urbana para todos los días
          </p>

          <Link
            to="/productos"
            className="btn btn-light btn-lg mt-3"
          >
            Ver Productos
          </Link>

        </div>
      </section>

      {/* Beneficios */}
      <section className="container py-5">

        <div className="row text-center">

          <div className="col-md-3">
            <i className="bi bi-truck fs-1"></i>

            <h5>Envíos</h5>

            <p>A todo el país</p>
          </div>

          <div className="col-md-3">
            <i className="bi bi-shield-check fs-1"></i>

            <h5>Compra segura</h5>

            <p>Protegemos tus datos</p>
          </div>

          <div className="col-md-3">
            <i className="bi bi-arrow-repeat fs-1"></i>

            <h5>Cambios</h5>

            <p>Hasta 30 días</p>
          </div>

          <div className="col-md-3">
            <i className="bi bi-credit-card fs-1"></i>

            <h5>Pagos</h5>

            <p>Todos los medios</p>
          </div>

        </div>

      </section>

      {/* Productos destacados */}
      {featuredProducts.length > 0 && (
        <section className="container pb-5">

          <h2 className="mb-4">
            ⭐ Productos Destacados
          </h2>

          <div className="row">

            {featuredProducts.map(
              (product) => (
                <div
                  key={product.id}
                  className="col-md-3 mb-4"
                >
                  <div className="card h-100 shadow-sm">

                    <img
                      src={product.image}
                      alt={product.name}
                      className="card-img-top product-image"
                    />

                    <div className="card-body">

                      <h5>
                        {product.name}
                      </h5>

                      <p className="fw-bold">
                        $
                        {Number(
                          product.price
                        ).toLocaleString()}
                      </p>

                      <p>
                        {product.category}
                      </p>

                      <Link
                        to="/productos"
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

        </section>
      )}
    </>
  );
}

export default Home;