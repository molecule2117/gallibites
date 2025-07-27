"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Search, Star, Leaf, Filter, Grid, List } from "lucide-react"
import ProductShowcase from "@/components/product-showcase"
import PriceComparison from "@/components/price-comparison"
import EcoPointsDisplay from "@/components/eco-points-display"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { CartIcon } from "@/components/cart-icon"

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  image: string
  category: string
  isOrganic: boolean
  isBulk: boolean
  unit: string
  seller: string
  ecoPoints: number
}

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [priceRange, setPriceRange] = useState("all")
  const [showOrganic, setShowOrganic] = useState(false)
  const [showBulk, setShowBulk] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const products: Product[] = [
    {
      id: "1",
      name: "Fresh Organic Tomatoes",
      price: 45,
      originalPrice: 50,
      rating: 4.8,
      reviews: 234,
      image: "/placeholder.svg?height=200&width=200&text=Fresh+Tomatoes",
      category: "vegetables",
      isOrganic: true,
      isBulk: false,
      unit: "per kg",
      seller: "Fresh Farm Market",
      ecoPoints: 10,
    },
    {
      id: "2",
      name: "Red Onions",
      price: 30,
      rating: 4.6,
      reviews: 189,
      image: "/placeholder.svg?height=200&width=200&text=Red+Onions",
      category: "vegetables",
      isOrganic: false,
      isBulk: true,
      unit: "per kg",
      seller: "Green Valley Store",
      ecoPoints: 5,
    },
    {
      id: "3",
      name: "Fresh Potatoes",
      price: 25,
      rating: 4.5,
      reviews: 156,
      image: "/placeholder.svg?height=200&width=200&text=Fresh+Potatoes",
      category: "vegetables",
      isOrganic: false,
      isBulk: true,
      unit: "per kg",
      seller: "Local Grocery Hub",
      ecoPoints: 4,
    },
    {
      id: "4",
      name: "Green Chilies",
      price: 60,
      originalPrice: 70,
      rating: 4.7,
      reviews: 98,
      image: "/placeholder.svg?height=200&width=200&text=Green+Chilies",
      category: "vegetables",
      isOrganic: true,
      isBulk: false,
      unit: "per kg",
      seller: "Organic Bazaar",
      ecoPoints: 8,
    },
    {
      id: "5",
      name: "Fresh Ginger",
      price: 80,
      originalPrice: 90,
      rating: 4.9,
      reviews: 267,
      image: "/placeholder.svg?height=200&width=200&text=Fresh+Ginger",
      category: "vegetables",
      isOrganic: true,
      isBulk: false,
      unit: "per kg",
      seller: "Farm Direct",
      ecoPoints: 8,
    },
    {
      id: "6",
      name: "Fresh Garlic",
      price: 120,
      rating: 4.4,
      reviews: 145,
      image: "/placeholder.svg?height=200&width=200&text=Fresh+Garlic",
      category: "vegetables",
      isOrganic: false,
      isBulk: true,
      unit: "per kg",
      seller: "Fresh Farm Market",
      ecoPoints: 6,
    },
    {
      id: "7",
      name: "Red Chili Powder",
      price: 150,
      rating: 4.8,
      reviews: 203,
      image: "/placeholder.svg?height=200&width=200&text=Chili+Powder",
      category: "spices",
      isOrganic: true,
      isBulk: true,
      unit: "per 500g",
      seller: "Spice Garden",
      ecoPoints: 12,
    },
    {
      id: "8",
      name: "Turmeric Powder",
      price: 180,
      originalPrice: 200,
      rating: 4.7,
      reviews: 178,
      image: "/placeholder.svg?height=200&width=200&text=Turmeric+Powder",
      category: "spices",
      isOrganic: true,
      isBulk: false,
      unit: "per 500g",
      seller: "Organic Spices Co",
      ecoPoints: 15,
    },
    {
      id: "9",
      name: "Garam Masala",
      price: 220,
      rating: 4.9,
      reviews: 156,
      image: "/placeholder.svg?height=200&width=200&text=Garam+Masala",
      category: "spices",
      isOrganic: false,
      isBulk: false,
      unit: "per 250g",
      seller: "Traditional Spices",
      ecoPoints: 18,
    },
    {
      id: "10",
      name: "Coriander Powder",
      price: 140,
      rating: 4.6,
      reviews: 134,
      image: "/placeholder.svg?height=200&width=200&text=Coriander+Powder",
      category: "spices",
      isOrganic: true,
      isBulk: true,
      unit: "per 500g",
      seller: "Spice Garden",
      ecoPoints: 10,
    },
    {
      id: "11",
      name: "Sunflower Cooking Oil",
      price: 180,
      originalPrice: 200,
      rating: 4.5,
      reviews: 289,
      image: "/placeholder.svg?height=200&width=200&text=Cooking+Oil",
      category: "oils",
      isOrganic: false,
      isBulk: true,
      unit: "per liter",
      seller: "Oil Mills Direct",
      ecoPoints: 8,
    },
    {
      id: "12",
      name: "Mustard Oil",
      price: 220,
      rating: 4.7,
      reviews: 167,
      image: "/placeholder.svg?height=200&width=200&text=Mustard+Oil",
      category: "oils",
      isOrganic: true,
      isBulk: false,
      unit: "per liter",
      seller: "Pure Oil Co",
      ecoPoints: 10,
    },
    {
      id: "13",
      name: "Coconut Oil",
      price: 350,
      originalPrice: 400,
      rating: 4.8,
      reviews: 198,
      image: "/placeholder.svg?height=200&width=200&text=Coconut+Oil",
      category: "oils",
      isOrganic: true,
      isBulk: false,
      unit: "per 500ml",
      seller: "Tropical Oils",
      ecoPoints: 15,
    },
    {
      id: "14",
      name: "Eco Paper Plates",
      price: 120,
      rating: 4.4,
      reviews: 89,
      image: "/placeholder.svg?height=200&width=200&text=Paper+Plates",
      category: "packaging",
      isOrganic: false,
      isBulk: true,
      unit: "pack of 50",
      seller: "Eco Packaging",
      ecoPoints: 25,
    },
    {
      id: "15",
      name: "Recycled Containers",
      price: 80,
      rating: 4.3,
      reviews: 67,
      image: "/placeholder.svg?height=200&width=200&text=Containers",
      category: "packaging",
      isOrganic: false,
      isBulk: true,
      unit: "pack of 10",
      seller: "Green Pack Solutions",
      ecoPoints: 30,
    },
    {
      id: "16",
      name: "Basmati Rice",
      price: 120,
      rating: 4.9,
      reviews: 345,
      image: "/placeholder.svg?height=200&width=200&text=Basmati+Rice",
      category: "grains",
      isOrganic: false,
      isBulk: true,
      unit: "per kg",
      seller: "Rice Mills Direct",
      ecoPoints: 12,
    },
    {
      id: "17",
      name: "Wheat Flour",
      price: 45,
      rating: 4.6,
      reviews: 234,
      image: "/placeholder.svg?height=200&width=200&text=Wheat+Flour",
      category: "grains",
      isOrganic: true,
      isBulk: true,
      unit: "per kg",
      seller: "Organic Grains Co",
      ecoPoints: 8,
    },
    {
      id: "18",
      name: "Organic Quinoa",
      price: 450,
      originalPrice: 500,
      rating: 4.8,
      reviews: 123,
      image: "/placeholder.svg?height=200&width=200&text=Quinoa",
      category: "grains",
      isOrganic: true,
      isBulk: false,
      unit: "per 500g",
      seller: "Health Grains",
      ecoPoints: 20,
    },
    {
      id: "19",
      name: "Mixed Lentils (Dal)",
      price: 90,
      rating: 4.7,
      reviews: 189,
      image: "/placeholder.svg?height=200&width=200&text=Lentils",
      category: "grains",
      isOrganic: true,
      isBulk: true,
      unit: "per kg",
      seller: "Dal Direct",
      ecoPoints: 12,
    },
    {
      id: "20",
      name: "Steel Tawa",
      price: 350,
      rating: 4.5,
      reviews: 78,
      image: "/placeholder.svg?height=200&width=200&text=Steel+Tawa",
      category: "utensils",
      isOrganic: false,
      isBulk: false,
      unit: "piece",
      seller: "Kitchen Essentials",
      ecoPoints: 5,
    },
    {
      id: "21",
      name: "Dish Soap",
      price: 45,
      originalPrice: 50,
      rating: 4.4,
      reviews: 156,
      image: "/placeholder.svg?height=200&width=200&text=Dish+Soap",
      category: "cleaning",
      isOrganic: false,
      isBulk: true,
      unit: "per 500ml",
      seller: "Clean Solutions",
      ecoPoints: 3,
    },
    {
      id: "22",
      name: "Eco Detergent",
      price: 180,
      rating: 4.6,
      reviews: 134,
      image: "/placeholder.svg?height=200&width=200&text=Eco+Detergent",
      category: "cleaning",
      isOrganic: true,
      isBulk: false,
      unit: "per kg",
      seller: "Green Clean Co",
      ecoPoints: 20,
    },
  ]

  const categories = [
    { id: "all", name: "All Categories", count: products.length },
    { id: "vegetables", name: "Vegetables", count: products.filter((p) => p.category === "vegetables").length },
    { id: "spices", name: "Spices", count: products.filter((p) => p.category === "spices").length },
    { id: "oils", name: "Oils", count: products.filter((p) => p.category === "oils").length },
    { id: "grains", name: "Grains & Pulses", count: products.filter((p) => p.category === "grains").length },
    { id: "packaging", name: "Packaging", count: products.filter((p) => p.category === "packaging").length },
    { id: "utensils", name: "Utensils", count: products.filter((p) => p.category === "utensils").length },
    { id: "cleaning", name: "Cleaning", count: products.filter((p) => p.category === "cleaning").length },
  ]

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
      const matchesOrganic = !showOrganic || product.isOrganic
      const matchesBulk = !showBulk || product.isBulk

      let matchesPrice = true
      if (priceRange === "under-50") matchesPrice = product.price < 50
      else if (priceRange === "50-100") matchesPrice = product.price >= 50 && product.price <= 100
      else if (priceRange === "100-200") matchesPrice = product.price >= 100 && product.price <= 200
      else if (priceRange === "over-200") matchesPrice = product.price > 200

      return matchesSearch && matchesCategory && matchesOrganic && matchesBulk && matchesPrice
    })
  }, [searchQuery, selectedCategory, showOrganic, showBulk, priceRange])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-green-600">GalliBites</h1>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Marketplace
              </Badge>
            </div>

            <div className="flex items-center space-x-4">
              <EcoPointsDisplay currentPoints={750} totalEarned={2340} />
              <CartIcon />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Product Showcase */}
        <div className="mb-12">
          <ProductShowcase />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 space-y-6">
            {/* Search */}
            <Card>
              <CardContent className="p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                        selectedCategory === category.id ? "bg-green-100 text-green-800" : "hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span>{category.name}</span>
                        <Badge variant="secondary" className="text-xs">
                          {category.count}
                        </Badge>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Filters */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-4 flex items-center">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Price Range</label>
                    <Select value={priceRange} onValueChange={setPriceRange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select price range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Prices</SelectItem>
                        <SelectItem value="under-50">Under ₹50</SelectItem>
                        <SelectItem value="50-100">₹50 - ₹100</SelectItem>
                        <SelectItem value="100-200">₹100 - ₹200</SelectItem>
                        <SelectItem value="over-200">Over ₹200</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="organic" checked={showOrganic} onCheckedChange={setShowOrganic} />
                      <label htmlFor="organic" className="text-sm font-medium">
                        Organic Only
                      </label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox id="bulk" checked={showBulk} onCheckedChange={setShowBulk} />
                      <label htmlFor="bulk" className="text-sm font-medium">
                        Bulk Available
                      </label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold">
                  {selectedCategory === "all"
                    ? "All Products"
                    : categories.find((c) => c.id === selectedCategory)?.name}
                </h2>
                <p className="text-gray-600 text-sm">{filteredProducts.length} products found</p>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Products Grid */}
            <div
              className={`grid gap-6 ${
                viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
              }`}
            >
              {filteredProducts.map((product) => (
                <Card key={product.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className={`${viewMode === "list" ? "flex space-x-4" : ""}`}>
                      <div className={`relative ${viewMode === "list" ? "w-32 h-32" : "mb-4"}`}>
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className={`object-cover rounded-lg ${viewMode === "list" ? "w-full h-full" : "w-full h-48"}`}
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

                      <div className={`${viewMode === "list" ? "flex-1" : ""} space-y-3`}>
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
                          {product.isBulk && (
                            <Badge variant="outline" className="text-xs">
                              Bulk
                            </Badge>
                          )}
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

                          <div className="flex space-x-2">
                            <PriceComparison productName={product.name} currentPrice={product.price} />
                            <AddToCartButton product={product} size="sm" className="bg-green-600 hover:bg-green-700" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="w-12 h-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
