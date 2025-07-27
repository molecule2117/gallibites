"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Star, MapPin, Leaf, TrendingDown, TrendingUp } from "lucide-react"
import Image from "next/image"

interface Product {
  id: number
  name: string
  price: number
  unit: string
  image: string
  seller: string
  rating: number
  location: string
  isEco?: boolean
  stock: number
}

interface PriceComparisonProps {
  productName: string
  products: Product[]
  onAddToCart: (product: Product) => void
}

export function PriceComparison({ productName, products, onAddToCart }: PriceComparisonProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Sort products by price for comparison
  const sortedProducts = [...products].sort((a, b) => a.price - b.price)
  const lowestPrice = sortedProducts[0]?.price || 0
  const highestPrice = sortedProducts[sortedProducts.length - 1]?.price || 0

  const getPriceIndicator = (price: number) => {
    if (price === lowestPrice) return { icon: TrendingDown, color: "text-green-600", label: "Lowest" }
    if (price === highestPrice) return { icon: TrendingUp, color: "text-red-600", label: "Highest" }
    return null
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="bg-transparent">
          Compare Prices ({products.length})
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Price Comparison - {productName}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {sortedProducts.map((product) => {
            const priceIndicator = getPriceIndicator(product.price)
            const savingsFromHighest = highestPrice - product.price

            return (
              <Card key={product.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={80}
                      height={80}
                      className="rounded-lg object-cover"
                    />

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-lg">{product.seller}</h3>
                        <div className="flex items-center space-x-2">
                          {product.isEco && (
                            <Badge className="bg-green-100 text-green-800">
                              <Leaf className="w-3 h-3 mr-1" />
                              Eco +5 pts
                            </Badge>
                          )}
                          {priceIndicator && (
                            <Badge className={`${priceIndicator.color} bg-transparent border`}>
                              <priceIndicator.icon className="w-3 h-3 mr-1" />
                              {priceIndicator.label}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                        <div>
                          <div className="text-gray-600">Price</div>
                          <div className="font-bold text-lg text-green-600">
                            ₹{product.price}/{product.unit}
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-600">Rating</div>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                            <span className="font-semibold">{product.rating}</span>
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-600">Location</div>
                          <div className="flex items-center text-sm">
                            <MapPin className="w-3 h-3 mr-1" />
                            {product.location}
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-600">Stock</div>
                          <div className="font-semibold">
                            {product.stock} {product.unit}
                          </div>
                        </div>
                      </div>

                      {savingsFromHighest > 0 && (
                        <div className="text-sm text-green-600 mb-3">
                          💰 Save ₹{savingsFromHighest} compared to highest price
                        </div>
                      )}

                      <Button
                        onClick={() => {
                          onAddToCart(product)
                          setIsOpen(false)
                        }}
                        className="w-full"
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </DialogContent>
    </Dialog>
  )
}
