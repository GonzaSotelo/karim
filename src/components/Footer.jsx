function Footer() {
  return (
    <footer className="bg-dark text-white mt-5">
      <div className="container py-5">

        <div className="row">

          <div className="col-md-4">
            <h4>Karim</h4>

            <p>
              Moda urbana para todos los días.
            </p>
          </div>

          <div className="col-md-4">
            <h5>Contacto</h5>

            <p>
              <i className="bi bi-geo-alt-fill me-2"></i>
              La Matanza, Buenos Aires
            </p>

            <p>
              <i className="bi bi-whatsapp me-2"></i>
              +54 9 221 123-4567
            </p>

            <p>
              <i className="bi bi-envelope-fill me-2"></i>
              contacto@tiendaropa.com
            </p>
          </div>

          <div className="col-md-4">
            <h5>Seguinos</h5>

            <div className="d-flex gap-3 fs-3">

              <a
                href="#"
                className="text-white"
              >
                <i className="bi bi-instagram"></i>
              </a>

              <a
                href="#"
                className="text-white"
              >
                <i className="bi bi-facebook"></i>
              </a>

              <a
                href="#"
                className="text-white"
              >
                <i className="bi bi-tiktok"></i>
              </a>

            </div>
          </div>

        </div>

        <hr />

        <div className="text-center">
          © 2026 Karim - Todos los derechos reservados
        </div>

      </div>
    </footer>
  );
}

export default Footer;