import { create } from 'zustand';
import { persist } from 'zustand/middleware';
// --- helpers ---
const normalizePrice = (p) => {
  if (typeof p === 'number') return p;
  const cleaned = (p ?? '').toString().replace(/[^0-9.]/g, '');
  const n = parseFloat(cleaned);
  return Number.isFinite(n) ? n : 0;
};

const recalcTotals = (items) => {
  let totalItems = 0;
  let totalPrice = 0;
  for (const it of items) {
    const qty = Number(it.quantity) || 0;
    totalItems += qty;
    totalPrice += normalizePrice(it.price) * qty;
  }
  return { totalItems, totalPrice };
};
// Helper function to get current user ID from session
const getUserId = () => {
  try {
    const session = JSON.parse(localStorage.getItem('next-auth.session-token') || 
                              localStorage.getItem('__Secure-next-auth.session-token') || 
                              sessionStorage.getItem('next-auth.session-token') || 
                              sessionStorage.getItem('__Secure-next-auth.session-token') || '{}');
    return session?.user?.id || session?.sub || 'guest-user';
  } catch (error) {
    console.error('Error getting user ID:', error);
    return 'guest-user';
  }
};

// Create a store with Zustand for cart management
export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,

      addItem: (product, quantity = 1) => {
        const items = get().items;
        const productId = product._id || product.id;
        const existing = items.find(it => (it._id || it.id) === productId);

        if (existing) {
          const updatedItems = items.map(it =>
            (it._id || it.id) === productId
              ? { ...it, quantity: it.quantity + quantity, price: normalizePrice(product.price) }
              : it
          );
          const totals = recalcTotals(updatedItems);
          set({ items: updatedItems, ...totals });
        } else {
          const newItem = {
            ...product,
            id: productId,                 // normalize id for later ops
            quantity,
            price: normalizePrice(product.price),
          };
          const updatedItems = [...items, newItem];
          const totals = recalcTotals(updatedItems);
          set({ items: updatedItems, ...totals });
        }
      },

      removeItem: (productId) => {
        const updatedItems = get().items.filter(
          it => (it.id || it._id) !== productId
        );
        const totals = recalcTotals(updatedItems);
        set({ items: updatedItems, ...totals });
      },

      updateItemQuantity: (productId, quantity) => {
        const updatedItems = get().items.map(it =>
          (it.id || it._id) === productId
            ? { ...it, quantity: Math.max(1, quantity) }
            : it
        );
        const totals = recalcTotals(updatedItems);
        set({ items: updatedItems, ...totals });
      },

      clearCart: () => set({ items: [], totalItems: 0, totalPrice: 0 }),
    }),
    {
      name: () => `cart-storage-${getUserId()}`,
      getStorage: () => localStorage,

      // Optional: fix existing persisted carts on hydration
      version: 2,
      migrate: (persisted) => {
        if (!persisted || !Array.isArray(persisted.items)) return persisted;
        const items = persisted.items.map(it => ({ ...it, price: normalizePrice(it.price) }));
        const totals = recalcTotals(items);
        return { ...persisted, items, ...totals };
      },
    }
  )
);

// Create a store for product management
export const useProductStore = create(
  persist(
    (set, get) => ({
      products: [],
      isLoading: false,
      
      // Fetch products from API
      fetchProducts: async () => {
        set({ isLoading: true });
        try {
          const response = await fetch('/api/products');
          const result = await response.json();
          
          if (result.success) {
            set({ 
              products: result.data,
              isLoading: false 
            });
          } else {
            console.error('Error fetching products:', result.message);
            set({ isLoading: false });
          }
        } catch (error) {
          console.error('Error fetching products:', error);
          set({ isLoading: false });
        }
      },
      
      // Add product
      addProduct: (product) => {
        // Generate a unique ID if not provided
        const timestamp = Date.now();
        const randomSuffix = Math.floor(Math.random() * 1000);
        const newProduct = {
          ...product,
          id: product.id || `prod-${timestamp}${randomSuffix}`,
          slug: product.slug || product.name.toLowerCase().replace(/\s+/g, '-')
        };
        
        // Get current products and append the new one
        const currentProducts = get().products || [];
        
        set({
          products: [...currentProducts, newProduct]
        });
        
        return newProduct;
      },
      
      // Update product
      updateProduct: (productId, updatedData) => {
        set(state => ({
          products: state.products.map(product => 
            product.id === productId 
              ? { ...product, ...updatedData } 
              : product
          )
        }));
      },
      
      // Delete product
      deleteProduct: (productId) => {
        set(state => ({
          products: state.products.filter(product => 
            product.id !== productId && product._id !== productId
          )
        }));
      },
      
      // Get all products
      getProducts: () => get().products,
      
      // Get product by ID
      getProductById: (productId) => get().products.find(product => 
        product.id === productId || product._id === productId
      ),
      
      // Get product by slug
      getProductBySlug: (slug) => get().products.find(product => product.slug === slug)
    }),
    {
      name: 'product-storage',
      getStorage: () => localStorage,
    }
  )
);

// Create a store for wishlist management
// ✅ Safe getter for user-specific key
const getUserStorageKey = () => {
  if (typeof window !== "undefined") {
    const userId = localStorage.getItem("userId") || "guest";
    return `wishlist-storage-${userId}`;
  }
  return "wishlist-storage-guest";
};

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [],

      // ✅ Add unique product (prefer Mongo _id)
      addItem: (product) => {
        const items = get().items;
        const productId = product._id || product.id;
        if (!productId) return; // skip invalid product

        const exists = items.some(
          (item) => (item._id || item.id) === productId
        );

        if (!exists) {
          set({ items: [...items, product] });
        }
      },

      // ✅ Remove by id or _id
      removeItem: (productId) => {
        if (!productId) return;
        set((state) => ({
          items: state.items.filter(
            (item) => (item._id || item.id) !== productId
          ),
        }));
      },

      // ✅ Check if item is in wishlist
      isInWishlist: (productId) => {
        if (!productId) return false;
        return get().items.some(
          (item) => (item._id || item.id) === productId
        );
      },

      // ✅ Clear wishlist completely
      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: getUserStorageKey(), // per-user storage
      getStorage: () => localStorage,
    }
  )
);

// Create a store for UI state management
export const useUIStore = create((set) => ({
  isDarkMode: false,
  isCartOpen: false,
  isMenuOpen: false,
  
  // Toggle dark mode
  toggleDarkMode: () => set(state => ({ isDarkMode: !state.isDarkMode })),
  
  // Toggle cart sidebar
  toggleCart: () => set(state => ({ isCartOpen: !state.isCartOpen })),
  
  // Toggle mobile menu
  toggleMenu: () => set(state => ({ isMenuOpen: !state.isMenuOpen })),
  
  // Close all modals/sidebars
  closeAll: () => set({ isCartOpen: false, isMenuOpen: false })
}));