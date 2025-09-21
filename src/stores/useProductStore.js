import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios";

export const useProductStore = create((set, get) => ({
  allProducts: [],            // For admin (all products)
  featuredProducts: [],       // For homepage
  categoryProducts: {},       // Cache per category: { jeans: [...], shirts: [...] }
  loading: false,
  error: null,

  setAllProducts: (products) => set({ allProducts: products }),
  setFeaturedProducts: (products) => set({ featuredProducts: products }),
  setCategoryProducts: (category, products) =>
    set((state) => ({
      categoryProducts: { ...state.categoryProducts, [category]: products },
    })),

  // ------- CREATE PRODUCT -------
  createProduct: async (productData) => {
    set({ loading: true });
    try {
      const res = await axios.post("/products", productData);
      set((prevState) => ({
        allProducts: [...prevState.allProducts, res.data],
        loading: false,
      }));
      toast.success("Product created ✅");
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.error || "Failed to create product");
    }
  },

  // ------- FETCH ALL PRODUCTS -------
  fetchAllProducts: async () => {
    set({ loading: true });
    try {
      const response = await axios.get("/products");
      set({ allProducts: response.data.products, loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.error || "Failed to fetch products");
    }
  },

  // ------- FETCH FEATURED PRODUCTS -------
  fetchFeaturedProducts: async () => {
    set({ loading: true });
    try {
      const response = await axios.get("/products/featured");
      set({ featuredProducts: response.data, loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.error || "Failed to fetch featured products");
    }
  },

  // ------- FETCH PRODUCTS BY CATEGORY (with caching) -------
  fetchProductsByCategory: async (category) => {
    const { categoryProducts } = get();

    if (categoryProducts[category]) {
      return;
    }

    set({ loading: true });
    try {
      const response = await axios.get(`/products/category/${category}`);
      set((state) => ({
        categoryProducts: {
          ...state.categoryProducts,
          [category]: response.data.products,
        },
        loading: false,
      }));
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.error || "Failed to fetch products");
    }
  },

  // ------- DELETE PRODUCT -------
  deleteProduct: async (productId) => {
    set({ loading: true });
    try {
      await axios.delete(`/products/${productId}`);
      set((state) => ({
        allProducts: state.allProducts.filter((p) => p._id !== productId),
        loading: false,
      }));
      toast.success("Product deleted 🗑️");
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.error || "Failed to delete product");
    }
  },

  // ------- TOGGLE FEATURED -------
  toggleFeaturedProduct: async (productId) => {
    set({ loading: true });
    try {
      const response = await axios.patch(`/products/${productId}`);
      // Update in allProducts
      set((state) => ({
        allProducts: state.allProducts.map((product) =>
          product._id === productId
            ? { ...product, isFeatured: response.data.isFeatured }
            : product
        ),
        loading: false,
      }));
      toast.success("Product updated ✨");
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.error || "Failed to update product");
    }
  },
}));