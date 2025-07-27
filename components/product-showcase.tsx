"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Leaf } from "lucide-react"
import Image from "next/image"

interface Product {
  id: number
  name: string
  price: number
  unit: string
  image: string
  seller: string
  rating: number
  isEco?: boolean
  category: string
}

interface ProductShowcaseProps {
  products: Product[]
  title: string
  showEcoOnly?: boolean
}

export function ProductShowcase({ products, title, showEcoOnly = false }: ProductShowcaseProps) {
  const displayProducts = showEcoOnly ? products.filter((p) => p.isEco) : products.slice(0, 6)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">{title}</h3>
        {showEcoOnly && (
          <Badge className="bg-green-100 text-green-800">
            <Leaf className="w-3 h-3 mr-1" />
            Eco Friendly
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {displayProducts.map((product) => (
          <Card key={product.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-3">
              <div className="relative mb-2">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={120}
                  height={120}
                  className="w-full h-24 object-cover rounded-md"
                />
                {product.isEco && (
                  <Badge className="absolute top-1 left-1 bg-green-600 text-xs px-1 py-0">
                    <Leaf className="w-2 h-2 mr-0.5" />
                    Eco
                  </Badge>
                )}
              </div>
              <h4 className="font-medium text-sm mb-1 line-clamp-2">{product.name}</h4>
              <div className="text-green-600 font-bold text-sm">
                ₹{product.price}/{product.unit}
              </div>
              <div className="flex items-center justify-between mt-1">
                <div className="flex items-center text-xs">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-0.5" />
                  <span>{product.rating}</span>
                </div>
                <div className="text-xs text-gray-500 truncate">{product.seller}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
