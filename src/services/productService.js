import { supabase } from "./supabase";

export const productService = {

  async getProducts() {
    const { data, error } =
      await supabase
        .from("products")
        .select("*")
        .order("created_at", {
          ascending: false,
        });

    if (error) throw error;

    return data;
  },

  async addProduct(product) {
    const { data, error } =
      await supabase
        .from("products")
        .insert(product)
        .select();

    if (error) throw error;

    return data;
  },

  async updateProduct(id, product) {
    const { data, error } =
      await supabase
        .from("products")
        .update(product)
        .eq("id", id)
        .select();

    if (error) throw error;

    return data;
  },

  async deleteProduct(id) {
    const { error } =
      await supabase
        .from("products")
        .delete()
        .eq("id", id);

    if (error) throw error;
  },

};