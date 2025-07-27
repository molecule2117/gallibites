"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Star, Leaf, ShoppingCart } from "lucide-react"

interface FeaturedProduct {
  id: string
  name: string
  image: string
  price: number
  originalPrice?: number
  rating: number
  seller: string
  ecoFriendly: boolean
  category: string
}

export default function ProductShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [cartItems, setCartItems] = useState<string[]>([])

  const featuredProducts: FeaturedProduct[] = [
    {
      id: "featured-1",
      name: "Organic Fresh Tomatoes",
      image: "/placeholder.svg?height=200&width=300&text=Fresh+Organic+Tomatoes",
      price: 45,
      originalPrice: 55,
      rating: 4.8,
      seller: "Green Valley Farm",
      ecoFriendly: true,
      category: "vegetables",
    },
    {
      id: "featured-2",
      name: "Pure Turmeric Powder",
      image: "/placeholder.svg?height=200&width=300&text=Pure+Turmeric+Powder",
      price: 95,
      rating: 4.9,
      seller: "Spice Masters",
      ecoFriendly: true,
      category: "spices",
    },
    {
      id: "featured-3",
      name: "Premium Basmati Rice",
      image: "/placeholder.svg?height=200&width=300&text=Premium+Basmati+Rice",
      price: 120,
      originalPrice: 140,
      rating: 4.7,
      seller: "Grain Direct",
      ecoFriendly: false,
      category: "grains",
    },
    {
      id: "featured-4",
      name: "Cold Pressed Coconut Oil",
      image: "/placeholder.svg?height=200&width=300&text=Cold+Pressed+Coconut+Oil",
      price: 180,
      rating: 4.6,
      seller: "Natural Oils Co.",
      ecoFriendly: true,
      category: "oils",
    },
    {
      id: "featured-5",
      name: "Eco-Friendly Paper Plates",
      image: "/placeholder.svg?height=200&width=300&text=Eco+Paper+Plates",
      price: 75,
      originalPrice: 85,
      rating: 4.4,
      seller: "Green Packaging",
      ecoFriendly: true,
      category: "packaging",
    },
  ]

  const nextProduct = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredProducts.length)
  }

  const prevProduct = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length)
  }

  const addToCart = (productId: string) => {
    setCartItems((prev) => [...prev, productId])
  }

  const isInCart = (productId: string) => cartItems.includes(productId)

  const currentProduct = featuredProducts[currentIndex]

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Featured Products</h2>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={prevProduct}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-sm text-gray-600">
              {currentIndex + 1} of {featuredProducts.length}
            </span>
            <Button variant="outline" size="sm" onClick={nextProduct}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Main Featured Product */}
          <div className="relative">
            <img
              src={currentProduct.image || "/placeholder.svg"}
              alt={currentProduct.name}
              className="w-full h-64 object-cover rounded-lg"
            />
            {currentProduct.ecoFriendly && (
              <Badge className="absolute top-2 left-2 bg-green-600">
                <Leaf className="w-3 h-3 mr-1" />
                Eco-Friendly
              </Badge>
            )}
            {currentProduct.originalPrice && (
              <Badge className="absolute top-2 right-2 bg-red-600">
                {Math.round(
                  ((currentProduct.originalPrice - currentProduct.price) / currentProduct.originalPrice) * 100,
                )}
                % OFF
              </Badge>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-4">
            <div>
              <h3 className="text-2xl font-bold">{currentProduct.name}</h3>
              <p className="text-gray-600">by {currentProduct.seller}</p>
            </div>

            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="ml-1 font-semibold">{currentProduct.rating}</span>
              </div>
              <Badge variant="outline" className="capitalize">
                {currentProduct.category}
              </Badge>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-3xl font-bold text-green-600">₹{currentProduct.price}</span>
              {currentProduct.originalPrice && (
                <span className="text-lg text-gray-500 line-through">₹{currentProduct.originalPrice}</span>
              )}
            </div>

            <div className="space-y-2">
              <Button
                onClick={() => addToCart(currentProduct.id)}
                disabled={isInCart(currentProduct.id)}
                className="w-full"
                size="lg"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                {isInCart(currentProduct.id) ? "Added to Cart" : "Add to Cart"}
              </Button>

              <div className="text-sm text-gray-600">
                ✓ Fresh and high quality guaranteed
                <br />✓ Fast delivery within 30-45 minutes
                {currentProduct.ecoFriendly && (
                  <>
                    <br />✓ Eco-friendly and sustainable
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Product Thumbnails */}
        <div className="mt-6">
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {featuredProducts.map((product, index) => (
              <button
                key={product.id}
                onClick={() => setCurrentIndex(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                  index === currentIndex ? "border-blue-500" : "border-gray-200"
                }`}
              >
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-6 grid grid-cols-3 gap-4 text-center">
          <div className="p-3 bg-green-50 rounded-lg">
            <div className="text-lg font-bold text-green-600">
              {featuredProducts.filter((p) => p.ecoFriendly).length}
            </div>
            <div className="text-xs text-gray-600">Eco-Friendly</div>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg">
            <div className="text-lg font-bold text-blue-600">
              {featuredProducts.filter((p) => p.originalPrice).length}
            </div>
            <div className="text-xs text-gray-600">On Sale</div>
          </div>
          <div className="p-3 bg-orange-50 rounded-lg">
            <div className="text-lg font-bold text-orange-600">
              {(featuredProducts.reduce((sum, p) => sum + p.rating, 0) / featuredProducts.length).toFixed(1)}
            </div>
            <div className="text-xs text-gray-600">Avg Rating</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
