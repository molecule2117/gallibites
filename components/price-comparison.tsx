"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Star, MapPin, Clock, TrendingDown, Award } from "lucide-react"

interface Product {
  id: string
  name: string
  price: number
  seller: string
  rating: number
  distance: string
  deliveryTime: string
}

interface PriceComparisonProps {
  product: Product
}

export function PriceComparison({ product }: PriceComparisonProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Generate mock comparison data based on the product
  const generateComparisonData = (baseProduct: Product) => {
    const sellers = [
      { name: baseProduct.seller, rating: baseProduct.rating, distance: baseProduct.distance },
      { name: "Fresh Market Co.", rating: 4.2, distance: "1.8 km" },
      { name: "Organic Valley", rating: 4.6, distance: "2.3 km" },
      { name: "Local Farmers Hub", rating: 4.4, distance: "3.1 km" },
      { name: "Green Grocers", rating: 4.1, distance: "2.7 km" },
    ]

    return sellers.map((seller, index) => ({
      id: `${baseProduct.id}-${index}`,
      name: baseProduct.name,
      seller: seller.name,
      price: index === 0 ? baseProduct.price : baseProduct.price + (Math.random() * 20 - 10),
      rating: seller.rating,
      distance: seller.distance,
      deliveryTime: `${20 + index * 10}-${35 + index * 10} min`,
      inStock: Math.random() > 0.1, // 90% chance of being in stock
      organic: Math.random() > 0.5,
    }))
  }

  const comparisonData = generateComparisonData(product)
  const sortedByPrice = [...comparisonData].sort((a, b) => a.price - b.price)
  const cheapestPrice = sortedByPrice[0]?.price || 0
  const averagePrice = comparisonData.reduce((sum, item) => sum + item.price, 0) / comparisonData.length
  const maxSavings = Math.max(...comparisonData.map((item) => item.price)) - cheapestPrice

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Compare Prices
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <TrendingDown className="w-5 h-5 text-blue-600" />
            <span>Price Comparison - {product.name}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">₹{cheapestPrice.toFixed(0)}</div>
                <div className="text-sm text-gray-600">Lowest Price</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">₹{averagePrice.toFixed(0)}</div>
                <div className="text-sm text-gray-600">Average Price</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">₹{maxSavings.toFixed(0)}</div>
                <div className="text-sm text-gray-600">Max Savings</div>
              </CardContent>
            </Card>
          </div>

          {/* Seller Comparison */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Available Sellers</h3>
            {sortedByPrice.map((item, index) => (
              <Card key={item.id} className={`${index === 0 ? "ring-2 ring-green-500 bg-green-50" : ""}`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-semibold">{item.seller}</h4>
                        {index === 0 && (
                          <Badge className="bg-green-600 text-white">
                            <Award className="w-3 h-3 mr-1" />
                            Best Price
                          </Badge>
                        )}
                        {item.organic && (
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            Organic
                          </Badge>
                        )}
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span>{item.rating}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span>{item.distance}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span>{item.deliveryTime}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">₹{item.price.toFixed(0)}</div>
                      {index > 0 && (
                        <div className="text-sm text-red-600">+₹{(item.price - cheapestPrice).toFixed(0)} more</div>
                      )}
                      <Button
                        size="sm"
                        className="mt-2"
                        disabled={!item.inStock}
                        variant={index === 0 ? "default" : "outline"}
                      >
                        {item.inStock ? "Add to Cart" : "Out of Stock"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Price History (Mock) */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Price Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-medium mb-2">Price Range</div>
                  <div className="text-gray-600">
                    ₹{cheapestPrice.toFixed(0)} - ₹{Math.max(...comparisonData.map((i) => i.price)).toFixed(0)}
                  </div>
                </div>
                <div>
                  <div className="font-medium mb-2">Best Time to Buy</div>
                  <div className="text-gray-600">Now (prices are stable)</div>
                </div>
                <div>
                  <div className="font-medium mb-2">Availability</div>
                  <div className="text-gray-600">
                    {comparisonData.filter((i) => i.inStock).length} of {comparisonData.length} sellers have stock
                  </div>
                </div>
                <div>
                  <div className="font-medium mb-2">Recommendation</div>
                  <div className="text-green-600 font-medium">{cheapestPrice.seller} offers the best value</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
