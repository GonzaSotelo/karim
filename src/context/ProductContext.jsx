import {
  createContext,
  useState,
  useEffect,
} from "react";

import { productService } from "../services/productService";

export const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);

  // Cargar productos desde Supabase
  const loadProducts = async () => {
    try {
      const data =
        await productService.getProducts();

      setProducts(data);
    } catch (error) {
      console.error(
        "Error al cargar productos:",
        error
      );
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Agregar producto
  const addProduct = async (product) => {
    try {
      await productService.addProduct(product);

      await loadProducts();
    } catch (error) {
      console.error(
        "Error al agregar producto:",
        error
      );
    }
  };

  // Eliminar producto
  const deleteProduct = async (id) => {
    try {
      await productService.deleteProduct(id);

      await loadProducts();
    } catch (error) {
      console.error(
        "Error al eliminar producto:",
        error
      );
    }
  };

  // Editar producto
  const updateProduct = async (
    updatedProduct
  ) => {
    try {
      const { id, ...product } =
        updatedProduct;

      await productService.updateProduct(
        id,
        product
      );

      await loadProducts();
    } catch (error) {
      console.error(
        "Error al actualizar producto:",
        error
      );
    }
  };

  // Más adelante lo adaptaremos a Supabase
  const updateStock = () => {};

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