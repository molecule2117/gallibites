"use client"

import { useState } from "react"
import { Minus, Plus, Trash2, ShoppingBag, Truck, Clock, Leaf, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import Image from "next/image"

interface CartItem {
  id: string
  name: string
  image: string
  price: number
  originalPrice?: number
  unit: string
  seller: string
  quantity: number
  ecoPoints: number
  deliveryTime: string
  organic?: boolean
  inStock: boolean
}

const cartItems: CartItem[] = [
  {
    id: "1",
    name: "Fresh Onions",
    image: "/products/fresh-onions.jpg",
    price: 25,
    originalPrice: 30,
    unit: "per kg",
    seller: "Ravi Vegetables",
    quantity: 2,
    ecoPoints: 5,
    deliveryTime: "30 mins",
    organic: true,
    inStock: true,
  },
  {
    id: "11",
    name: "Red Chili Powder",
    image: "/products/red-chili-powder.jpg",
    price: 150,
    unit: "per kg",
    seller: "Spice Master",
    quantity: 1,
    ecoPoints: 12,
    deliveryTime: "25 mins",
    inStock: true,
  },
  {
    id: "2",
    name: "Fresh Tomatoes",
    image: "/products/fresh-tomatoes.jpg",
    price: 40,
    unit: "per kg",
    seller: "Green Farm Co.",
    quantity: 3,
    ecoPoints: 8,
    deliveryTime: "45 mins",
    organic: true,
    inStock: true,
  },
  {
    id: "19",
    name: "Eco Paper Plates",
    image: "/products/eco-paper-plates.jpg",
    price: 80,
    unit: "per 50 pieces",
    seller: "Eco Pack",
    quantity: 2,
    ecoPoints: 25,
    deliveryTime: "30 mins",
    inStock: true,
  },
  {
    id: "25",
    name: "Basmati Rice",
    image: "/products/basmati-rice.jpg",
    price: 80,
    unit: "per kg",
    seller: "Rice Mills",
    quantity: 5,
    ecoPoints: 12,
    deliveryTime: "45 mins",
    inStock: true,
  },
]

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>(cartItems)
  const [promoCode, setPromoCode] = useState("")
  const [deliveryAddress, setDeliveryAddress] = useState("")
  const [deliveryNotes, setDeliveryNotes] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("")
  const [scheduleDelivery, setScheduleDelivery] = useState(false)
  const [deliveryDate, setDeliveryDate] = useState("")
  const [deliveryTime, setDeliveryTime] = useState("")

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      setItems(items.filter((item) => item.id !== id))
    } else {
      setItems(items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
    }
  }

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const originalTotal = items.reduce((sum, item) => sum + (item.originalPrice || item.price) * item.quantity, 0)
  const savings = originalTotal - subtotal
  const totalEcoPoints = items.reduce((sum, item) => sum + item.ecoPoints * item.quantity, 0)
  const deliveryFee = subtotal > 500 ? 0 : 40
  const total = subtotal + deliveryFee

  const applyPromoCode = () => {
    // Promo code logic would go here
    console.log("Applying promo code:", promoCode)
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some products to get started</p>
          <Link href="/vendor/marketplace">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/vendor/marketplace">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Continue Shopping
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
            <Badge variant="secondary">{items.length} items</Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="w-20 h-20 object-cover rounded-lg"
                    />

                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">{item.name}</h3>
                          <p className="text-sm text-gray-600">{item.seller}</p>
                          <div className="flex items-center gap-2 mt-1">
                            {item.organic && (
                              <Badge variant="secondary" className="text-xs">
                                <Leaf className="h-3 w-3 mr-1" />
                                Organic
                              </Badge>
                            )}
                            <div className="flex items-center gap-1 text-sm text-green-600">
                              <Leaf className="h-3 w-3" />+{item.ecoPoints * item.quantity} EcoPoints
                            </div>
                          </div>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="font-medium w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                          <span className="text-sm text-gray-500 ml-2">{item.unit}</span>
                        </div>

                        <div className="text-right">
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-green-600">₹{item.price * item.quantity}</span>
                            {item.originalPrice && (
                              <span className="text-sm text-gray-500 line-through">
                                ₹{item.originalPrice * item.quantity}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <Clock className="h-3 w-3" />
                            {item.deliveryTime}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Delivery Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Delivery Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="address">Delivery Address</Label>
                  <Textarea
                    id="address"
                    placeholder="Enter your complete delivery address..."
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="notes">Delivery Notes (Optional)</Label>
                  <Input
                    id="notes"
                    placeholder="Any special instructions..."
                    value={deliveryNotes}
                    onChange={(e) => setDeliveryNotes(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="schedule" checked={scheduleDelivery} onCheckedChange={setScheduleDelivery} />
                  <Label htmlFor="schedule">Schedule delivery for later</Label>
                </div>

                {scheduleDelivery && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="date">Delivery Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={deliveryDate}
                        onChange={(e) => setDeliveryDate(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="time">Preferred Time</Label>
                      <Select value={deliveryTime} onValueChange={setDeliveryTime}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="morning">Morning (9 AM - 12 PM)</SelectItem>
                          <SelectItem value="afternoon">Afternoon (12 PM - 4 PM)</SelectItem>
                          <SelectItem value="evening">Evening (4 PM - 8 PM)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
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
                  {savings > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>You Save</span>
                      <span>-₹{savings}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>{deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}</span>
                  </div>
                  {deliveryFee === 0 && <p className="text-xs text-green-600">Free delivery on orders above ₹500</p>}
                </div>

                <Separator />

                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>

                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 text-green-700">
                    <Leaf className="h-4 w-4" />
                    <span className="font-medium">EcoPoints Earned: {totalEcoPoints}</span>
                  </div>
                  <p className="text-xs text-green-600 mt-1">Use EcoPoints for discounts on future orders</p>
                </div>

                {/* Promo Code */}
                <div className="space-y-2">
                  <Label htmlFor="promo">Promo Code</Label>
                  <div className="flex gap-2">
                    <Input
                      id="promo"
                      placeholder="Enter code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <Button variant="outline" onClick={applyPromoCode}>
                      Apply
                    </Button>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="space-y-2">
                  <Label>Payment Method</Label>
                  <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cod">Cash on Delivery</SelectItem>
                      <SelectItem value="upi">UPI Payment</SelectItem>
                      <SelectItem value="card">Credit/Debit Card</SelectItem>
                      <SelectItem value="wallet">Digital Wallet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full" size="lg" disabled={!deliveryAddress || !paymentMethod}>
                  Place Order - ₹{total}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  By placing this order, you agree to our terms and conditions
                </p>
              </CardContent>
            </Card>

            {/* Estimated Delivery */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Estimated Delivery</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Array.from(new Set(items.map((item) => item.seller))).map((seller) => {
                    const sellerItems = items.filter((item) => item.seller === seller)
                    const maxDeliveryTime = Math.max(...sellerItems.map((item) => Number.parseInt(item.deliveryTime)))

                    return (
                      <div key={seller} className="flex justify-between text-sm">
                        <span>{seller}</span>
                        <span className="text-gray-600">{maxDeliveryTime} mins</span>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
