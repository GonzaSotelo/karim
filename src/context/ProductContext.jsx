import {
  createContext,
  useState,
  useEffect,
} from "react";

import { productService } from "../services/productService";

export const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] =
    useState(true);

  // Cargar productos
  const loadProducts = async () => {
    try {
      setLoadingProducts(true);

      const data =
        await productService.getProducts();

      setProducts(data);
    } catch (error) {
      console.error(
        "Error cargando productos:",
        error
      );
    } finally {
      setLoadingProducts(false);
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
        "Error agregando producto:",
        error
      );
    }
  };

  // Actualizar producto
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
        "Error actualizando producto:",
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
        "Error eliminando producto:",
        error
      );
    }
  };

  // Lo adaptaremos cuando hagamos los pedidos
  const updateStock = () => {};

  return (
    <ProductContext.Provider
      value={{
        products,
        loadingProducts,
        loadProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        updateStock,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}