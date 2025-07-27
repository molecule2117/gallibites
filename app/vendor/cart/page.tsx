"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Minus, Plus, Trash2, ShoppingBag, Leaf, MapPin, Clock, CreditCard } from "lucide-react"

interface CartItem {
  id: string
  name: string
  image: string
  price: number
  quantity: number
  seller: string
  ecoFriendly: boolean
  deliveryTime: string
  distance: string
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Fresh Onions",
      image: "/products/fresh-onions.jpg",
      price: 30,
      quantity: 2,
      seller: "Green Valley Farm",
      ecoFriendly: true,
      deliveryTime: "30-45 min",
      distance: "2.1 km",
    },
    {
      id: "2",
      name: "Red Chili Powder",
      image: "/products/red-chili-powder.jpg",
      price: 85,
      quantity: 1,
      seller: "Spice Garden",
      ecoFriendly: false,
      deliveryTime: "25-40 min",
      distance: "1.5 km",
    },
    {
      id: "3",
      name: "Fresh Tomatoes",
      image: "/products/fresh-tomatoes.jpg",
      price: 45,
      quantity: 3,
      seller: "Local Farmers Co-op",
      ecoFriendly: true,
      deliveryTime: "45-60 min",
      distance: "3.2 km",
    },
    {
      id: "4",
      name: "Turmeric Powder",
      image: "/products/turmeric-powder.jpg",
      price: 95,
      quantity: 1,
      seller: "Pure Spices",
      ecoFriendly: true,
      deliveryTime: "35-50 min",
      distance: "2.3 km",
    },
  ])

  const [promoCode, setPromoCode] = useState("")
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null)

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(id)
      return
    }
    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "eco10") {
      setAppliedPromo("eco10")
    } else if (promoCode.toLowerCase() === "first20") {
      setAppliedPromo("first20")
    }
    setPromoCode("")
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const ecoItemsCount = cartItems.filter((item) => item.ecoFriendly).length
  const ecoDiscount = appliedPromo === "eco10" ? subtotal * 0.1 : 0
  const firstOrderDiscount = appliedPromo === "first20" ? subtotal * 0.2 : 0
  const deliveryFee = subtotal > 200 ? 0 : 25
  const ecoPoints = Math.floor(subtotal * 0.1) + ecoItemsCount * 10
  const total = subtotal - ecoDiscount - firstOrderDiscount + deliveryFee

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardContent className="p-12 text-center">
            <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some delicious items from our marketplace</p>
            <Button>Continue Shopping</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ShoppingBag className="w-5 h-5" />
                <span>Your Cart ({cartItems.length} items)</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                  <div className="relative">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    {item.ecoFriendly && (
                      <Badge className="absolute -top-2 -right-2 bg-green-600 text-xs">
                        <Leaf className="w-3 h-3" />
                      </Badge>
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-600">by {item.seller}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                      <div className="flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {item.distance}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {item.deliveryTime}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="text-right">
                    <div className="font-semibold">₹{item.price * item.quantity}</div>
                    <div className="text-sm text-gray-600">₹{item.price} each</div>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeItem(item.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Promo Code */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Promo Code</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2">
                <Input
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <Button onClick={applyPromoCode} variant="outline">
                  Apply
                </Button>
              </div>
              {appliedPromo && (
                <div className="mt-2">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {appliedPromo === "eco10" ? "ECO10: 10% off applied!" : "FIRST20: 20% off applied!"}
                  </Badge>
                </div>
              )}
              <div className="mt-3 text-sm text-gray-600">
                <p>Available codes:</p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>ECO10 - 10% off on eco-friendly items</li>
                  <li>FIRST20 - 20% off on first order</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>

                {ecoDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Eco Discount (10%)</span>
                    <span>-₹{ecoDiscount.toFixed(0)}</span>
                  </div>
                )}

                {firstOrderDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>First Order Discount (20%)</span>
                    <span>-₹{firstOrderDiscount.toFixed(0)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>{deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}</span>
                </div>

                {deliveryFee === 0 && <div className="text-xs text-green-600">Free delivery on orders above ₹200</div>}
              </div>

              <Separator />

              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>₹{total}</span>
              </div>

              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Leaf className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-800">You'll earn {ecoPoints} EcoPoints</span>
                </div>
                <p className="text-xs text-green-700 mt-1">{ecoItemsCount} eco-friendly items in your cart</p>
              </div>

              <Button className="w-full" size="lg">
                <CreditCard className="w-4 h-4 mr-2" />
                Proceed to Checkout
              </Button>

              <Button variant="outline" className="w-full bg-transparent">
                Continue Shopping
              </Button>
            </CardContent>
          </Card>

          {/* Delivery Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Delivery Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-600" />
                  <span>Estimated delivery: 45-75 minutes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-600" />
                  <span>Multiple vendors in your area</span>
                </div>
                <div className="p-2 bg-blue-50 border border-blue-200 rounded text-xs">
                  Orders from different vendors may arrive separately
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
