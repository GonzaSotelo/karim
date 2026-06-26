import { supabase } from "./supabase";

export const productService = {
  // Obtener productos
  async getProducts() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return data;
  },

  // Agregar producto
  async addProduct(product) {
    const { data, error } = await supabase
      .from("products")
      .insert(product)
      .select();

    if (error) throw error;

    return data;
  },

  // Actualizar producto
  async updateProduct(id, product) {
    const { data, error } = await supabase
      .from("products")
      .update(product)
      .eq("id", id)
      .select();

    if (error) throw error;

    return data;
  },

  // Eliminar producto
  async deleteProduct(id) {
    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (error) throw error;
  },
};

// ---------- STORAGE ----------

// Subir imagen
export async function uploadImage(file) {
  const fileName = `${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from("products")
    .upload(fileName, file);

  if (error) throw error;

  const { data } = supabase.storage
    .from("products")
    .getPublicUrl(fileName);

  return data.publicUrl;
}