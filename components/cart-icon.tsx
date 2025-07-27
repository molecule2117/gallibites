"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart } from "lucide-react"
import { useCartContext } from "@/components/cart-provider"
import Link from "next/link"

interface CartIconProps {
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
  showText?: boolean
  className?: string
}

export function CartIcon({ variant = "outline", size = "default", showText = true, className = "" }: CartIconProps) {
  const { getCartCount, getCartTotal } = useCartContext()

  const itemCount = getCartCount()
  const total = getCartTotal()

  return (
    <Link href="/vendor/cart">
      <Button variant={variant} size={size} className={`relative ${className}`}>
        <ShoppingCart className="w-4 h-4 mr-2" />
        {showText && "Cart"}

        {itemCount > 0 && (
          <>
            <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs min-w-[20px] h-5 flex items-center justify-center rounded-full">
              {itemCount > 99 ? "99+" : itemCount}
            </Badge>

            {showText && total > 0 && <span className="ml-2 text-sm font-medium">₹{total}</span>}
          </>
        )}
      </Button>
    </Link>
  )
}
