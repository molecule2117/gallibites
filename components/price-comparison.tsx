"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingDown, TrendingUp, BarChart3, Star, MapPin, Clock } from "lucide-react"

interface PriceComparisonProps {
  productName: string
  currentPrice: number
}

export default function PriceComparison({ productName, currentPrice }: PriceComparisonProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Mock data for price comparison
  const sellers = [
    {
      id: "1",
      name: "Fresh Farm Market",
      price: currentPrice,
      originalPrice: currentPrice + 10,
      rating: 4.8,
      reviews: 234,
      distance: "0.5 km",
      deliveryTime: "30 mins",
      isBest: true,
    },
    {
      id: "2",
      name: "Green Valley Store",
      price: currentPrice + 5,
      rating: 4.6,
      reviews: 189,
      distance: "1.2 km",
      deliveryTime: "45 mins",
      isBest: false,
    },
    {
      id: "3",
      name: "Local Grocery Hub",
      price: currentPrice + 12,
      originalPrice: currentPrice + 20,
      rating: 4.4,
      reviews: 156,
      distance: "0.8 km",
      deliveryTime: "35 mins",
      isBest: false,
    },
    {
      id: "4",
      name: "Organic Bazaar",
      price: currentPrice + 8,
      rating: 4.7,
      reviews: 98,
      distance: "1.5 km",
      deliveryTime: "50 mins",
      isBest: false,
    },
  ]

  const bestPrice = Math.min(...sellers.map((s) => s.price))
  const avgPrice = Math.round(sellers.reduce((sum, s) => sum + s.price, 0) / sellers.length)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <BarChart3 className="w-4 h-4 mr-1" />
          Compare
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <BarChart3 className="w-5 h-5 mr-2" />
            Price Comparison - {productName}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <TrendingDown className="w-5 h-5 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-green-600">₹{bestPrice}</div>
                <div className="text-sm text-gray-600">Best Price</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-blue-600">₹{avgPrice}</div>
                <div className="text-sm text-gray-600">Average Price</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="w-5 h-5 text-orange-600" />
                </div>
                <div className="text-2xl font-bold text-orange-600">₹{currentPrice - bestPrice}</div>
                <div className="text-sm text-gray-600">You Save</div>
              </CardContent>
            </Card>
          </div>

          {/* Seller Comparison */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Available Sellers</h3>
            <div className="grid gap-4">
              {sellers.map((seller) => (
                <Card key={seller.id} className={`${seller.isBest ? "ring-2 ring-green-500" : ""}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-semibold">{seller.name}</h4>
                          {seller.isBest && <Badge className="bg-green-500">Best Price</Badge>}
                        </div>

                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                            {seller.rating} ({seller.reviews})
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {seller.distance}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {seller.deliveryTime}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-green-600">₹{seller.price}</span>
                          {seller.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">₹{seller.originalPrice}</span>
                          )}
                        </div>
                        {seller.price === bestPrice && (
                          <div className="text-xs text-green-600 font-medium">Lowest Price</div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Price Insights */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Price Insights</h4>
            <div className="space-y-2 text-sm text-blue-800">
              <p>
                • You can save up to ₹{Math.max(...sellers.map((s) => s.price)) - bestPrice} by choosing the best seller
              </p>
              <p>
                • {sellers.filter((s) => s.price <= avgPrice).length} out of {sellers.length} sellers offer
                below-average prices
              </p>
              <p>• Consider delivery time and seller rating along with price for the best value</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
