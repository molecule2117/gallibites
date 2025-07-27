"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Trash2, ShoppingCart, Leaf, MapPin, Clock, CreditCard, ArrowLeft } from "lucide-react"
import { useCartContext } from "@/components/cart-provider"
import { AddToCartButton } from "@/components/add-to-cart-button"
import Link from "next/link"
import { useState } from "react"

export default function CartPage() {
  const { cartItems, getCartTotal, getTotalEcoPoints, getTotalSavings, getOriginalTotal, removeFromCart, clearCart } =
    useCartContext()

  const [deliveryInfo, setDeliveryInfo] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    deliveryTime: "standard",
  })

  const subtotal = getCartTotal()
  const originalTotal = getOriginalTotal()
  const savings = getTotalSavings()
  const deliveryFee = subtotal > 500 ? 0 : 40
  const totalEcoPoints = getTotalEcoPoints()
  const total = subtotal + deliveryFee

  const handleInputChange = (field: string, value: string) => {
    setDeliveryInfo((prev) => ({ ...prev, [field]: value }))
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <Link href="/vendor/marketplace" className="text-2xl font-bold text-green-600">
                  GalliBites
                </Link>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  Shopping Cart
                </Badge>
              </div>

              <Link href="/vendor/marketplace">
                <Button variant="outline">Continue Shopping</Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
          <div className="text-center">
            <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some fresh products to get started</p>
            <Link href="/vendor/marketplace">
              <Button className="bg-green-600 hover:bg-green-700">Start Shopping</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/vendor/marketplace" className="text-2xl font-bold text-green-600">
                GalliBites
              </Link>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                Shopping Cart
              </Badge>
            </div>

            <div className="flex items-center space-x-4">
              <Link href="/vendor/marketplace">
                <Button variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Cart Items ({cartItems.length})
                  </CardTitle>
                  <Button variant="outline" size="sm" onClick={clearCart}>
                    Clear Cart
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />

                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900">{item.name}</h3>
                          <p className="text-sm text-gray-500">{item.unit}</p>
                          <p className="text-xs text-gray-400">by {item.seller}</p>

                          <div className="flex items-center space-x-2 mt-1">
                            {item.isOrganic && (
                              <Badge className="text-xs bg-green-100 text-green-800">
                                <Leaf className="w-3 h-3 mr-1" />
                                Organic
                              </Badge>
                            )}
                            <Badge variant="outline" className="text-xs">
                              +{item.ecoPoints * item.quantity} EcoPoints
                            </Badge>
                          </div>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-gray-900">₹{item.price}</span>
                          {item.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">₹{item.originalPrice}</span>
                          )}
                          <span className="text-sm text-gray-500">× {item.quantity}</span>
                          <span className="font-semibold text-green-600">= ₹{item.price * item.quantity}</span>
                        </div>

                        <AddToCartButton product={item} size="sm" showQuantityControls={true} />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Delivery Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Delivery Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={deliveryInfo.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={deliveryInfo.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={deliveryInfo.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    placeholder="Enter your complete address"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={deliveryInfo.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      placeholder="Enter city"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pincode">Pincode</Label>
                    <Input
                      id="pincode"
                      value={deliveryInfo.pincode}
                      onChange={(e) => handleInputChange("pincode", e.target.value)}
                      placeholder="Enter pincode"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="deliveryTime">Delivery Time</Label>
                  <Select
                    value={deliveryInfo.deliveryTime}
                    onValueChange={(value) => handleInputChange("deliveryTime", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          Standard (2-3 hours) - Free
                        </div>
                      </SelectItem>
                      <SelectItem value="express">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          Express (1 hour) - ₹25
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
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

                  {savings > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Savings</span>
                      <span>-₹{savings}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>{deliveryFee === 0 ? "Free" : `₹${deliveryFee}`}</span>
                  </div>

                  {deliveryInfo.deliveryTime === "express" && (
                    <div className="flex justify-between">
                      <span>Express Delivery</span>
                      <span>₹25</span>
                    </div>
                  )}

                  <Separator />

                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>₹{total + (deliveryInfo.deliveryTime === "express" ? 25 : 0)}</span>
                  </div>
                </div>

                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="flex items-center text-green-700">
                    <Leaf className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">You'll earn {totalEcoPoints} EcoPoints with this order!</span>
                  </div>
                </div>

                {subtotal < 500 && (
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-blue-700 text-sm">Add ₹{500 - subtotal} more to get free delivery!</p>
                  </div>
                )}

                <Button
                  className="w-full bg-green-600 hover:bg-green-700"
                  size="lg"
                  disabled={!deliveryInfo.name || !deliveryInfo.phone || !deliveryInfo.address}
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Proceed to Checkout
                </Button>

                <div className="text-center">
                  <Link href="/vendor/marketplace">
                    <Button variant="outline" className="w-full bg-transparent">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Accepted Payment Methods</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                  <div>• Credit/Debit Cards</div>
                  <div>• UPI Payments</div>
                  <div>• Net Banking</div>
                  <div>• Cash on Delivery</div>
                  <div>• Digital Wallets</div>
                  <div>• EcoPoints Redemption</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
