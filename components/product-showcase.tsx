"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Star, Leaf, ShoppingCart, Clock, MapPin } from "lucide-react"
import Image from "next/image"

const featuredProducts = [
  {
    id: "featured-1",
    name: "Organic Tomatoes",
    image: "/products/fresh-tomatoes.jpg",
    price: 45,
    originalPrice: 55,
    unit: "per kg",
    seller: "Green Farm Co.",
    rating: 4.8,
    ecoPoints: 12,
    deliveryTime: "30 mins",
    distance: "1.2 km",
    organic: true,
    featured: true,
  },
  {
    id: "featured-2",
    name: "Fresh Ginger",
    image: "/products/fresh-ginger.jpg",
    price: 75,
    unit: "per kg",
    seller: "Herb Valley",
    rating: 4.6,
    ecoPoints: 8,
    deliveryTime: "25 mins",
    distance: "0.8 km",
    organic: true,
    featured: true,
  },
  {
    id: "featured-3",
    name: "Turmeric Powder",
    image: "/products/turmeric-powder.jpg",
    price: 180,
    unit: "per kg",
    seller: "Golden Spices",
    rating: 4.9,
    ecoPoints: 15,
    deliveryTime: "35 mins",
    distance: "1.5 km",
    organic: true,
    featured: true,
  },
  {
    id: "featured-4",
    name: "Eco Paper Plates",
    image: "/products/eco-paper-plates.jpg",
    price: 80,
    unit: "per 50 pieces",
    seller: "Eco Pack",
    rating: 4.4,
    ecoPoints: 25,
    deliveryTime: "40 mins",
    distance: "2.0 km",
    featured: true,
  },
  {
    id: "featured-5",
    name: "Coconut Oil",
    image: "/products/coconut-oil.jpg",
    price: 200,
    unit: "per liter",
    seller: "Coconut Co.",
    rating: 4.7,
    ecoPoints: 18,
    deliveryTime: "45 mins",
    distance: "1.8 km",
    organic: true,
    featured: true,
  },
]

export default function ProductShowcase() {
  const [cart, setCart] = useState<{ [key: string]: number }>({})

  const addToCart = (productId: string) => {
    setCart((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-500" />
          Featured Products
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Carousel className="w-full">
          <CarouselContent>
            {featuredProducts.map((product) => (
              <CarouselItem key={product.id}>
                <Card className="border-0 shadow-sm">
                  <div className="relative">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={200}
                      height={150}
                      className="w-full h-32 object-cover rounded-t-lg"
                    />
                    {product.organic && (
                      <Badge className="absolute top-2 left-2 bg-green-500 text-white">
                        <Leaf className="w-3 h-3 mr-1" />
                        Organic
                      </Badge>
                    )}
                    {product.originalPrice && (
                      <Badge className="absolute top-2 right-2 bg-red-500 text-white">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                      </Badge>
                    )}
                  </div>

                  <CardContent className="p-3">
                    <h4 className="font-semibold text-sm mb-1 line-clamp-1">{product.name}</h4>

                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="text-lg font-bold text-green-600">₹{product.price}</span>
                        {product.originalPrice && (
                          <span className="text-xs text-gray-500 line-through ml-1">₹{product.originalPrice}</span>
                        )}
                      </div>
                      <div className="flex items-center">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs ml-1">{product.rating}</span>
                      </div>
                    </div>

                    <p className="text-xs text-gray-600 mb-2">{product.seller}</p>

                    <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {product.deliveryTime}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {product.distance}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <Leaf className="w-3 h-3 text-green-500 mr-1" />
                        <span className="text-xs text-green-600">+{product.ecoPoints} pts</span>
                      </div>
                      <span className="text-xs text-gray-500">{product.unit}</span>
                    </div>

                    <Button onClick={() => addToCart(product.id)} size="sm" className="w-full h-8 text-xs">
                      <ShoppingCart className="w-3 h-3 mr-1" />
                      {cart[product.id] ? `Added (${cart[product.id]})` : "Add to Cart"}
                    </Button>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>

        <div className="mt-4 p-3 bg-green-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Leaf className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-800">Eco-Friendly Picks</span>
          </div>
          <p className="text-xs text-green-700">
            These products are specially selected for their sustainable sourcing and eco-friendly packaging.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
