"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Star, Leaf } from "lucide-react"
import { AddToCartButton } from "@/components/add-to-cart-button"

const featuredProducts = [
  {
    id: "featured-1",
    name: "Fresh Organic Tomatoes",
    price: 45,
    originalPrice: 50,
    rating: 4.8,
    reviews: 234,
    image: "/placeholder.svg?height=200&width=200&text=Fresh+Tomatoes",
    isOrganic: true,
    unit: "per kg",
    seller: "Fresh Farm Market",
    ecoPoints: 10,
    category: "vegetables",
  },
  {
    id: "featured-2",
    name: "Premium Basmati Rice",
    price: 120,
    rating: 4.9,
    reviews: 189,
    image: "/placeholder.svg?height=200&width=200&text=Basmati+Rice",
    isOrganic: false,
    unit: "per kg",
    seller: "Rice Mills Direct",
    ecoPoints: 5,
    category: "grains",
  },
  {
    id: "featured-3",
    name: "Fresh Ginger",
    price: 80,
    originalPrice: 90,
    rating: 4.7,
    reviews: 156,
    image: "/placeholder.svg?height=200&width=200&text=Fresh+Ginger",
    isOrganic: true,
    unit: "per kg",
    seller: "Farm Direct",
    ecoPoints: 8,
    category: "vegetables",
  },
  {
    id: "featured-4",
    name: "Organic Spinach",
    price: 35,
    rating: 4.6,
    reviews: 98,
    image: "/placeholder.svg?height=200&width=200&text=Organic+Spinach",
    isOrganic: true,
    unit: "per bunch",
    seller: "Green Valley",
    ecoPoints: 6,
    category: "vegetables",
  },
  {
    id: "featured-5",
    name: "Fresh Carrots",
    price: 40,
    originalPrice: 45,
    rating: 4.5,
    reviews: 267,
    image: "/placeholder.svg?height=200&width=200&text=Fresh+Carrots",
    isOrganic: true,
    unit: "per kg",
    seller: "Organic Farms",
    ecoPoints: 7,
    category: "vegetables",
  },
]

export default function ProductShowcase() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Featured Products</h2>
        <p className="text-gray-600">Fresh picks from our top-rated sellers</p>
      </div>

      <Carousel className="w-full">
        <CarouselContent className="-ml-2 md:-ml-4">
          {featuredProducts.map((product) => (
            <CarouselItem key={product.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="relative mb-4">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    {product.originalPrice && (
                      <Badge className="absolute top-2 left-2 bg-red-500">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                      </Badge>
                    )}
                    {product.isOrganic && (
                      <Badge className="absolute top-2 right-2 bg-green-500">
                        <Leaf className="w-3 h-3 mr-1" />
                        Organic
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 line-clamp-2">{product.name}</h3>
                      <p className="text-sm text-gray-500">{product.unit}</p>
                      <p className="text-xs text-gray-400">by {product.seller}</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium ml-1">{product.rating}</span>
                      </div>
                      <span className="text-sm text-gray-500">({product.reviews})</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        +{product.ecoPoints} EcoPoints
                      </Badge>

                      <AddToCartButton product={product} size="sm" className="bg-green-600 hover:bg-green-700" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">500+</div>
          <div className="text-sm text-gray-600">Fresh Products</div>
        </div>
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">50+</div>
          <div className="text-sm text-gray-600">Local Vendors</div>
        </div>
        <div className="text-center p-4 bg-orange-50 rounded-lg">
          <div className="text-2xl font-bold text-orange-600">4.8★</div>
          <div className="text-sm text-gray-600">Average Rating</div>
        </div>
        <div className="text-center p-4 bg-purple-50 rounded-lg">
          <div className="text-2xl font-bold text-purple-600">24/7</div>
          <div className="text-sm text-gray-600">Support</div>
        </div>
      </div>
    </div>
  )
}
