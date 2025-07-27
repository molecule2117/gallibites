"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Clock, TrendingDown, TrendingUp, BarChart3 } from "lucide-react"

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
      { name: baseProduct.seller, distance: baseProduct.distance, rating: baseProduct.rating },
      { name: "Fresh Market Co.", distance: "1.8 km", rating: 4.2 },
      { name: "Organic Valley", distance: "2.3 km", rating: 4.6 },
      { name: "Local Farmers Hub", distance: "0.9 km", rating: 4.4 },
      { name: "Green Grocers", distance: "3.1 km", rating: 4.1 },
    ]

    return sellers.map((seller, index) => ({
      id: `${baseProduct.id}-${index}`,
      name: baseProduct.name,
      seller: seller.name,
      price: index === 0 ? baseProduct.price : baseProduct.price + (Math.random() * 20 - 10),
      rating: seller.rating,
      distance: seller.distance,
      deliveryTime: `${20 + Math.floor(Math.random() * 40)} mins`,
      inStock: Math.random() > 0.1,
    }))
  }

  const comparisonData = generateComparisonData(product)
  const sortedByPrice = [...comparisonData].sort((a, b) => a.price - b.price)
  const cheapestPrice = Math.min(...comparisonData.map((p) => p.price))
  const averagePrice = comparisonData.reduce((sum, p) => sum + p.price, 0) / comparisonData.length
  const maxSavings = Math.max(...comparisonData.map((p) => p.price)) - cheapestPrice

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <BarChart3 className="h-4 w-4 mr-1" />
          Compare
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Price Comparison - {product.name}
          </DialogTitle>
        </DialogHeader>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-1 text-green-600 mb-1">
                <TrendingDown className="h-4 w-4" />
                <span className="text-lg font-bold">₹{cheapestPrice.toFixed(0)}</span>
              </div>
              <p className="text-xs text-gray-600">Lowest Price</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-1 text-blue-600 mb-1">
                <BarChart3 className="h-4 w-4" />
                <span className="text-lg font-bold">₹{averagePrice.toFixed(0)}</span>
              </div>
              <p className="text-xs text-gray-600">Average Price</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-1 text-orange-600 mb-1">
                <TrendingUp className="h-4 w-4" />
                <span className="text-lg font-bold">₹{maxSavings.toFixed(0)}</span>
              </div>
              <p className="text-xs text-gray-600">Max Savings</p>
            </CardContent>
          </Card>
        </div>

        {/* Seller Comparison */}
        <div className="space-y-3">
          <h3 className="font-semibold text-lg mb-3">Available from {comparisonData.length} sellers</h3>
          {sortedByPrice.map((item, index) => (
            <Card key={item.id} className={index === 0 ? "border-green-500 border-2" : ""}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold">{item.seller}</h4>
                      {index === 0 && <Badge className="bg-green-500 text-white text-xs">Best Price</Badge>}
                      {!item.inStock && (
                        <Badge variant="destructive" className="text-xs">
                          Out of Stock
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{item.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{item.distance}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{item.deliveryTime}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xl font-bold text-green-600">₹{item.price.toFixed(0)}</div>
                    {index > 0 && (
                      <div className="text-xs text-red-500">+₹{(item.price - cheapestPrice).toFixed(0)} more</div>
                    )}
                  </div>

                  <div className="ml-4">
                    <Button
                      size="sm"
                      disabled={!item.inStock}
                      className={index === 0 ? "bg-green-600 hover:bg-green-700" : ""}
                    >
                      {item.inStock ? "Add to Cart" : "Out of Stock"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Price Insights */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">💡 Price Insights</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• You can save up to ₹{maxSavings.toFixed(0)} by choosing the cheapest option</li>
            <li>
              • {sortedByPrice[0].seller} offers the best price at ₹{cheapestPrice.toFixed(0)}
            </li>
            <li>• Average market price for this item is ₹{averagePrice.toFixed(0)}</li>
            {sortedByPrice[0].distance && <li>• Closest seller with best price is {sortedByPrice[0].distance} away</li>}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  )
}
