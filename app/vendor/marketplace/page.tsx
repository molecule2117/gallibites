"use client"

import { useState } from "react"
import { Search, Filter, ShoppingCart, Star, Leaf, Clock, MapPin, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { PriceComparison } from "@/components/price-comparison"
import EcoPointsDisplay from "@/components/eco-points-display"
import ProductShowcase from "@/components/product-showcase"

interface Product {
  id: string
  name: string
  image: string
  price: number
  originalPrice?: number
  unit: string
  seller: string
  rating: number
  reviews: number
  category: string
  ecoPoints: number
  inStock: boolean
  deliveryTime: string
  distance: string
  organic?: boolean
  bulk?: boolean
  quantity?: number
}

const products: Product[] = [
  // Vegetables
  {
    id: "1",
    name: "Fresh Onions",
    image: "/placeholder.svg?height=300&width=400&text=Fresh+Onions",
    price: 25,
    originalPrice: 30,
    unit: "per kg",
    seller: "Ravi Vegetables",
    rating: 4.5,
    reviews: 128,
    category: "vegetables",
    ecoPoints: 5,
    inStock: true,
    deliveryTime: "30 mins",
    distance: "0.5 km",
    organic: true,
  },
  {
    id: "2",
    name: "Fresh Tomatoes",
    image: "/placeholder.svg?height=300&width=400&text=Fresh+Tomatoes",
    price: 40,
    unit: "per kg",
    seller: "Green Farm Co.",
    rating: 4.3,
    reviews: 95,
    category: "vegetables",
    ecoPoints: 8,
    inStock: true,
    deliveryTime: "45 mins",
    distance: "1.2 km",
    organic: true,
  },
  {
    id: "3",
    name: "Fresh Potatoes",
    image: "/placeholder.svg?height=300&width=400&text=Fresh+Potatoes",
    price: 20,
    unit: "per kg",
    seller: "Local Farmers",
    rating: 4.2,
    reviews: 156,
    category: "vegetables",
    ecoPoints: 3,
    inStock: true,
    deliveryTime: "25 mins",
    distance: "0.8 km",
  },
  {
    id: "4",
    name: "Green Chilies",
    image: "/placeholder.svg?height=300&width=400&text=Green+Chilies",
    price: 60,
    unit: "per kg",
    seller: "Spice Garden",
    rating: 4.6,
    reviews: 89,
    category: "vegetables",
    ecoPoints: 6,
    inStock: true,
    deliveryTime: "35 mins",
    distance: "1.0 km",
    organic: true,
  },
  {
    id: "5",
    name: "Fresh Ginger",
    image: "/placeholder.svg?height=300&width=400&text=Fresh+Ginger",
    price: 80,
    unit: "per kg",
    seller: "Herb Valley",
    rating: 4.4,
    reviews: 67,
    category: "vegetables",
    ecoPoints: 7,
    inStock: true,
    deliveryTime: "40 mins",
    distance: "1.5 km",
    organic: true,
  },
  {
    id: "6",
    name: "Fresh Garlic",
    image: "/placeholder.svg?height=300&width=400&text=Fresh+Garlic",
    price: 120,
    unit: "per kg",
    seller: "Organic Farms",
    rating: 4.7,
    reviews: 134,
    category: "vegetables",
    ecoPoints: 9,
    inStock: true,
    deliveryTime: "30 mins",
    distance: "0.7 km",
    organic: true,
  },
  {
    id: "7",
    name: "Fresh Coriander",
    image: "/placeholder.svg?height=300&width=400&text=Fresh+Coriander",
    price: 15,
    unit: "per bunch",
    seller: "Green Herbs",
    rating: 4.3,
    reviews: 78,
    category: "vegetables",
    ecoPoints: 4,
    inStock: true,
    deliveryTime: "20 mins",
    distance: "0.3 km",
    organic: true,
  },
  {
    id: "8",
    name: "Fresh Carrots",
    image: "/placeholder.svg?height=300&width=400&text=Fresh+Carrots",
    price: 35,
    unit: "per kg",
    seller: "Farm Fresh",
    rating: 4.1,
    reviews: 92,
    category: "vegetables",
    ecoPoints: 5,
    inStock: true,
    deliveryTime: "35 mins",
    distance: "1.1 km",
  },

  // Spices
  {
    id: "11",
    name: "Red Chili Powder",
    image: "/placeholder.svg?height=300&width=400&text=Red+Chili+Powder",
    price: 150,
    unit: "per kg",
    seller: "Spice Master",
    rating: 4.8,
    reviews: 245,
    category: "spices",
    ecoPoints: 12,
    inStock: true,
    deliveryTime: "25 mins",
    distance: "0.6 km",
    bulk: true,
  },
  {
    id: "12",
    name: "Turmeric Powder",
    image: "/placeholder.svg?height=300&width=400&text=Turmeric+Powder",
    price: 180,
    unit: "per kg",
    seller: "Golden Spices",
    rating: 4.7,
    reviews: 198,
    category: "spices",
    ecoPoints: 15,
    inStock: true,
    deliveryTime: "30 mins",
    distance: "0.8 km",
    organic: true,
    bulk: true,
  },

  // Oils
  {
    id: "16",
    name: "Cooking Oil",
    image: "/placeholder.svg?height=300&width=400&text=Cooking+Oil",
    price: 120,
    unit: "per liter",
    seller: "Oil Mills",
    rating: 4.3,
    reviews: 289,
    category: "oils",
    ecoPoints: 8,
    inStock: true,
    deliveryTime: "40 mins",
    distance: "1.2 km",
    bulk: true,
  },

  // Grains
  {
    id: "25",
    name: "Basmati Rice",
    image: "/placeholder.svg?height=300&width=400&text=Basmati+Rice",
    price: 80,
    unit: "per kg",
    seller: "Rice Mills",
    rating: 4.4,
    reviews: 345,
    category: "grains",
    ecoPoints: 12,
    inStock: true,
    deliveryTime: "45 mins",
    distance: "1.5 km",
    bulk: true,
  },
]

export default function MarketplacePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [priceRange, setPriceRange] = useState([0, 500])
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState("relevance")
  const [cart, setCart] = useState<{ [key: string]: number }>({})
  const [showOrganic, setShowOrganic] = useState(false)
  const [showBulk, setShowBulk] = useState(false)

  const categories = [
    { id: "all", name: "All Products", count: products.length },
    { id: "vegetables", name: "Vegetables", count: products.filter((p) => p.category === "vegetables").length },
    { id: "spices", name: "Spices", count: products.filter((p) => p.category === "spices").length },
    { id: "oils", name: "Oils", count: products.filter((p) => p.category === "oils").length },
    { id: "grains", name: "Grains", count: products.filter((p) => p.category === "grains").length },
  ]

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.seller.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
    const matchesOrganic = !showOrganic || product.organic
    const matchesBulk = !showBulk || product.bulk

    return matchesSearch && matchesCategory && matchesPrice && matchesOrganic && matchesBulk
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "distance":
        return Number.parseFloat(a.distance) - Number.parseFloat(b.distance)
      default:
        return 0
    }
  })

  const addToCart = (productId: string) => {
    setCart((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }))
  }

  const removeFromCart = (productId: string) => {
    setCart((prev) => {
      const newCart = { ...prev }
      if (newCart[productId] > 1) {
        newCart[productId]--
      } else {
        delete newCart[productId]
      }
      return newCart
    })
  }

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, quantity) => sum + quantity, 0)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">GalliBites Marketplace</h1>
            <div className="flex items-center gap-4">
              <EcoPointsDisplay points={1250} />
              <Button className="relative">
                <ShoppingCart className="h-5 w-5" />
                {getTotalItems() > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search products, sellers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="distance">Nearest First</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Price Range (₹)</label>
                  <Slider value={priceRange} onValueChange={setPriceRange} max={500} step={10} className="w-full" />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>₹{priceRange[0]}</span>
                    <span>₹{priceRange[1]}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="organic" checked={showOrganic} onCheckedChange={setShowOrganic} />
                    <label htmlFor="organic" className="text-sm">
                      Organic Only
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="bulk" checked={showBulk} onCheckedChange={setShowBulk} />
                    <label htmlFor="bulk" className="text-sm">
                      Bulk Available
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Categories Sidebar */}
          <div className="lg:w-64">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-4 py-2 hover:bg-gray-50 flex justify-between items-center ${
                        selectedCategory === category.id ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600" : ""
                      }`}
                    >
                      <span className="capitalize">{category.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {category.count}
                      </Badge>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Featured Products */}
            <div className="mt-6">
              <ProductShowcase />
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                Showing {sortedProducts.length} of {products.length} products
              </p>
              <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="lg:hidden">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="vegetables">Veg</TabsTrigger>
                  <TabsTrigger value="spices">Spices</TabsTrigger>
                  <TabsTrigger value="oils">Oils</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
                <Card key={product.id} className="group hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    {product.organic && (
                      <Badge className="absolute top-2 left-2 bg-green-500">
                        <Leaf className="h-3 w-3 mr-1" />
                        Organic
                      </Badge>
                    )}
                    {product.originalPrice && (
                      <Badge className="absolute top-2 right-2 bg-red-500">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                      </Badge>
                    )}
                  </div>

                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">{product.name}</h3>
                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          <span className="text-xl font-bold text-green-600">₹{product.price}</span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                          )}
                        </div>
                        <span className="text-sm text-gray-500">{product.unit}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm ml-1">{product.rating}</span>
                      </div>
                      <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
                    </div>

                    <p className="text-sm text-gray-600 mb-2">{product.seller}</p>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {product.deliveryTime}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {product.distance}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1">
                        <Leaf className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-green-600">+{product.ecoPoints} EcoPoints</span>
                      </div>
                      {product.bulk && (
                        <Badge variant="outline" className="text-xs">
                          Bulk Available
                        </Badge>
                      )}
                    </div>

                    <div className="flex gap-2">
                      {cart[product.id] ? (
                        <div className="flex items-center gap-2 flex-1">
                          <Button size="sm" variant="outline" onClick={() => removeFromCart(product.id)}>
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="font-medium">{cart[product.id]}</span>
                          <Button size="sm" variant="outline" onClick={() => addToCart(product.id)}>
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <Button onClick={() => addToCart(product.id)} className="flex-1" disabled={!product.inStock}>
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Add to Cart
                        </Button>
                      )}

                      <PriceComparison product={product} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {sortedProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedCategory("all")
                    setPriceRange([0, 500])
                    setShowOrganic(false)
                    setShowBulk(false)
                  }}
                  className="mt-4"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
