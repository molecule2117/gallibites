"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Plus, Minus, Check } from "lucide-react"
import { useCartContext } from "@/components/cart-provider"
import type { CartItem } from "@/hooks/use-cart"

interface AddToCartButtonProps {
  product: Omit<CartItem, "quantity">
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
  showQuantityControls?: boolean
  className?: string
}

export function AddToCartButton({
  product,
  variant = "default",
  size = "default",
  showQuantityControls = true,
  className = "",
}: AddToCartButtonProps) {
  const { cartItems, addToCart, updateQuantity } = useCartContext()
  const [isAdding, setIsAdding] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const cartItem = cartItems.find((item) => item.id === product.id)
  const quantity = cartItem?.quantity || 0

  const handleAddToCart = async () => {
    setIsAdding(true)

    // Add a small delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 300))

    addToCart(product, 1)
    setIsAdding(false)
    setShowSuccess(true)

    // Hide success state after 2 seconds
    setTimeout(() => setShowSuccess(false), 2000)
  }

  const handleUpdateQuantity = (newQuantity: number) => {
    updateQuantity(product.id, newQuantity)
  }

  if (showSuccess) {
    return (
      <Button variant="outline" size={size} className={`${className} border-green-500 text-green-600`} disabled>
        <Check className="w-4 h-4 mr-2" />
        Added!
      </Button>
    )
  }

  if (quantity > 0 && showQuantityControls) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <Button variant="outline" size="sm" onClick={() => handleUpdateQuantity(quantity - 1)} className="h-8 w-8 p-0">
          <Minus className="w-4 h-4" />
        </Button>

        <Badge variant="secondary" className="px-3 py-1 font-medium">
          {quantity}
        </Badge>

        <Button variant="outline" size="sm" onClick={() => handleUpdateQuantity(quantity + 1)} className="h-8 w-8 p-0">
          <Plus className="w-4 h-4" />
        </Button>
      </div>
    )
  }

  return (
    <Button variant={variant} size={size} onClick={handleAddToCart} disabled={isAdding} className={className}>
      <ShoppingCart className="w-4 h-4 mr-2" />
      {isAdding ? "Adding..." : "Add to Cart"}
    </Button>
  )
}
