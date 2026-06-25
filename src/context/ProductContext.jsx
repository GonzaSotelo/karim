import { createContext, useState, useEffect } from "react";

export const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(() => {
    const savedProducts =
      localStorage.getItem("products");

    return savedProducts
      ? JSON.parse(savedProducts)
      : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "products",
      JSON.stringify(products)
    );
  }, [products]);

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: Date.now(),
    };

    setProducts((prev) => [
      ...prev,
      newProduct,
    ]);
  };
const deleteProduct = (id) => {
  setProducts(
    products.filter(
      (product) => product.id !== id
    )
  );
};

const updateStock = (cart) => {
  const updatedProducts = products.map((product) => {
    const cartItems = cart.filter(
      (item) => item.id === product.id
    );

    if (cartItems.length === 0) {
      return product;
    }

    const newSizes = {
      ...product.sizes,
    };

    cartItems.forEach((item) => {
      newSizes[item.selectedSize] =
        Number(
          newSizes[item.selectedSize]
        ) - item.quantity;
    });

    return {
      ...product,
      sizes: newSizes,
    };
  });

  setProducts(updatedProducts);
};

const updateProduct = (updatedProduct) => {
  setProducts(
    products.map((product) =>
      product.id === updatedProduct.id
        ? updatedProduct
        : product
    )
  );
};
  return (
    <ProductContext.Provider
value={{
  products,
  addProduct,
  deleteProduct,
  updateProduct,
  updateStock,
}}
    >
      {children}
    </ProductContext.Provider>
  );
}