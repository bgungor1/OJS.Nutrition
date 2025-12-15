import { create } from 'zustand';
import { persist, type PersistStorage, type StorageValue } from 'zustand/middleware';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  flavor?: string;
  size?: string;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateItemQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  setCartOpen: (isOpen: boolean) => void;
}

const cartStorage: PersistStorage<CartState> = {
  getItem: (name) => {
    const str = localStorage.getItem(name);
    if (!str) return null;
    return JSON.parse(str) as StorageValue<CartState>;
  },
  setItem: (name, value) => {
    localStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name) => {
    localStorage.removeItem(name);
  },
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id);
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            };
          }
          return { items: [...state.items, { ...item, quantity: 1 }] };
        }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      updateItemQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
          ),
        })),
      clearCart: () => set({ items: [] }),
      getTotalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),
      getTotalPrice: () =>
        get().items.reduce((total, item) => total + item.price * item.quantity, 0),
      setCartOpen: (isOpen: boolean) => {
        // Bu fonksiyon, sepetin açılıp kapanmasını kontrol eder.
        // Ancak, bu state'in asıl kontrolü Navbar bileşeninde olduğu için
        // burada doğrudan DOM manipülasyonu yapamayız. Bunun yerine,
        // Navbar bileşenindeki `cartOpen` state'ini güncellemeyi hedeflemeliyiz.
        // Geçici olarak bir konsol logu ekleyebiliriz.
        console.log('Sepet açıldı/kapandı:', isOpen);
      },
      setCartOpen: (isOpen: boolean) => {
        // Bu fonksiyon, sepetin açılıp kapanmasını kontrol eder.
        // Ancak, bu state'in asıl kontrolü Navbar bileşeninde olduğu için
        // burada doğrudan DOM manipülasyonu yapamayız. Bunun yerine,
        // Navbar bileşenindeki `cartOpen` state'ini güncellemeyi hedeflemeliyiz.
        // Geçici olarak bir konsol logu ekleyebiliriz.
        console.log('Sepet açıldı/kapandı:', isOpen);
      },
    }),
    {
      name: 'cart-storage',
      storage: cartStorage,
    }
  )
);
