import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { ProductContext } from "../context/ProductContext";

function Cart() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeProduct,
    clearCart,
  } = useContext(CartContext);

  const { updateStock } =
  useContext(ProductContext);

  const total = cart.reduce(
    (acc, item) =>
      acc +
      Number(item.price) *
        item.quantity,
    0
  );

  const sendWhatsAppOrder = () => {
    const phone =
      "5491140974034";

    let message =
      "Hola, quiero realizar este pedido:%0A%0A";

    cart.forEach((item) => {
      message +=
        `• ${item.name} | Talle: ${item.selectedSize} | Cantidad: ${item.quantity}%0A`;
    });

    message += `%0A💰 Total: $${total.toLocaleString()}`;

    window.open(
      `https://wa.me/${phone}?text=${message}`,
      "_blank"
    );
    updateStock(cart);

clearCart();
  };

  return (
    <div className="container mt-4">
      <h2>Carrito</h2>

      {cart.length === 0 ? (
        <p>
          No hay productos en el carrito.
        </p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={`${item.id}-${item.selectedSize}`}
              className="card mb-3"
            >
              <div className="card-body">

                <h5>{item.name}</h5>

                <p>
                  <strong>
                    Talle:
                  </strong>{" "}
                  {item.selectedSize}
                </p>

                <p>
                  Precio: $
                  {Number(
                    item.price
                  ).toLocaleString()}
                </p>

                <p>
                  Cantidad:
                  {" "}
                  {item.quantity}
                </p>

                <div className="d-flex gap-2">

                  <button
                    className="btn btn-warning"
                    onClick={() =>
                      decreaseQuantity(
                        item.id,
                        item.selectedSize
                      )
                    }
                  >
                    -
                  </button>

                  <button
                    className="btn btn-success"
                    onClick={() =>
                      increaseQuantity(
                        item.id,
                        item.selectedSize
                      )
                    }
                  >
                    +
                  </button>

                  <button
                    className="btn btn-danger"
                    onClick={() =>
                      removeProduct(
                        item.id,
                        item.selectedSize
                      )
                    }
                  >
                    Eliminar
                  </button>

                </div>

              </div>
            </div>
          ))}

          <h3 className="mt-4">
            Total: $
            {total.toLocaleString()}
          </h3>

          <div className="mt-3 d-flex gap-2">

            <button
              className="btn btn-danger"
              onClick={clearCart}
            >
              Vaciar carrito
            </button>

            <button
              className="btn btn-success"
              onClick={sendWhatsAppOrder}
            >
              Finalizar compra
            </button>

          </div>
        </>
      )}
    </div>
  );
}

export default Cart;