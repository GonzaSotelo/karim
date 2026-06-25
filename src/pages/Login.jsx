import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const navigate = useNavigate();
  const ADMIN_USER = "admin";
const ADMIN_PASSWORD = "1234";

  const handleLogin = (e) => {
    e.preventDefault();

   if (
  username === ADMIN_USER &&
  password === ADMIN_PASSWORD
) {
      localStorage.setItem(
        "isAdmin",
        "true"
      );

     window.location.href = "/admin";
    } else {
      alert(
        "Usuario o contraseña incorrectos"
      );
    }
  };

  return (
    <div className="container mt-5">

      <div className="row justify-content-center">

        <div className="col-md-4">

          <div className="card p-4 shadow">

            <h2 className="mb-4">
              Login Admin
            </h2>

            <form
              onSubmit={handleLogin}
            >

              <input
                type="text"
                className="form-control mb-3"
                placeholder="Usuario"
                value={username}
                onChange={(e) =>
                  setUsername(
                    e.target.value
                  )
                }
              />

              <input
                type="password"
                className="form-control mb-3"
                placeholder="Contraseña"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
              />

              <button
                className="btn btn-primary w-100"
              >
                Ingresar
              </button>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;