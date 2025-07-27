"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Plus, Minus, Trash2, MapPin, Truck, CreditCard, Smartphone, Wallet } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Fresh Onions",
      price: 25,
      unit: "kg",
      quantity: 10,
      image: "/placeholder.svg?height=100&width=100",
      seller: "Ramesh Wholesale",
      location: "2.3 km away",
    },
    {
      id: 2,
      name: "Red Chili Powder",
      price: 180,
      unit: "kg",
      quantity: 2,
      image: "/placeholder.svg?height=100&width=100",
      seller: "Spice King",
      location: "1.8 km away",
    },
    {
      id: 5,
      name: "Fresh Tomatoes",
      price: 35,
      unit: "kg",
      quantity: 5,
      image: "/placeholder.svg?height=100&width=100",
      seller: "Veggie Fresh",
      location: "1.2 km away",
    },
  ])

  const updateQuantity = (id, change) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item)),
    )
  }

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const deliveryFee = 30
  const total = subtotal + deliveryFee

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center space-x-3">
            <Link href="/vendor/marketplace">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold">My Cart</h1>
            <Badge variant="secondary">{cartItems.length} items</Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🛒</div>
            <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
            <p className="text-gray-600 mb-6">Add some products to get started</p>
            <Link href="/vendor/marketplace">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Cart Items */}
            <div className="space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <p className="text-sm text-gray-600">{item.seller}</p>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <MapPin className="w-4 h-4 mr-1" />
                          {item.location}
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <div className="text-lg font-bold text-green-600">
                            ₹{item.price} per {item.unit}
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="w-8 h-8 bg-transparent"
                              onClick={() => updateQuantity(item.id, -1)}
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="w-8 text-center font-semibold">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="w-8 h-8 bg-transparent"
                              onClick={() => updateQuantity(item.id, 1)}
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              className="w-8 h-8 text-red-600 hover:text-red-700 bg-transparent"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="text-right mt-2">
                          <span className="text-lg font-bold">₹{item.price * item.quantity}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="flex items-center">
                    <Truck className="w-4 h-4 mr-1" />
                    Delivery Fee
                  </span>
                  <span>₹{deliveryFee}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Smartphone className="w-5 h-5 mr-3" />
                  UPI Payment
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <CreditCard className="w-5 h-5 mr-3" />
                  Card Payment
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Wallet className="w-5 h-5 mr-3" />
                  Wallet
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  💵 Cash on Delivery
                </Button>
              </CardContent>
            </Card>

            {/* Place Order Button */}
            <Link href="/vendor/orders">
              <Button className="w-full text-lg py-6 bg-green-600 hover:bg-green-700">Place Order - ₹{total}</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
