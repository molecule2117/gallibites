"use client"

import { createContext, useContext, type ReactNode } from "react"
import { useCart, type CartItem } from "@/hooks/use-cart"

interface CartContextType {
  cartItems: CartItem[]
  isLoading: boolean
  addToCart: (product: Omit<CartItem, "quantity">, quantity?: number) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getCartTotal: () => number
  getCartCount: () => number
  getTotalEcoPoints: () => number
  getOriginalTotal: () => number
  getTotalSavings: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const cart = useCart()

  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>
}

export function useCartContext() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCartContext must be used within a CartProvider")
  }
  return context
}
