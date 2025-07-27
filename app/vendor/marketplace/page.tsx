"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, ShoppingCart, Filter, Star, MapPin, Users, Leaf, ArrowLeft, BarChart3 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { ProductShowcase } from "@/components/product-showcase"
import { PriceComparison } from "@/components/price-comparison"
import { EcoPointsDisplay } from "@/components/eco-points-display"

export default function VendorMarketplace() {
  const [cart, setCart] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [ecoPoints, setEcoPoints] = useState(125)
  const [activeRewards, setActiveRewards] = useState([])

  const categories = [
    { name: "Vegetables", icon: "🥬", count: 85 },
    { name: "Spices", icon: "🌶️", count: 64 },
    { name: "Packaging", icon: "📦", count: 45 },
    { name: "Equipment", icon: "🔧", count: 28 },
    { name: "Cleaning", icon: "🧽", count: 22 },
    { name: "Oils", icon: "🫒", count: 18 },
    { name: "Grains", icon: "🌾", count: 35 },
    { name: "Dairy", icon: "🥛", count: 15 },
  ]

  const products = [
    // Vegetables - Multiple sellers for same products
    {
      id: 1,
      name: "Fresh Onions",
      price: 25,
      unit: "kg",
      image: "/placeholder.svg?height=200&width=200",
      seller: "Ramesh Wholesale",
      rating: 4.5,
      stock: 500,
      location: "2.3 km away",
      category: "Vegetables",
      isEco: false,
    },
    {
      id: 2,
      name: "Fresh Onions",
      price: 28,
      unit: "kg",
      image: "/placeholder.svg?height=200&width=200",
      seller: "Veggie King",
      rating: 4.3,
      stock: 300,
      location: "3.1 km away",
      category: "Vegetables",
      isEco: false,
    },
    {
      id: 3,
      name: "Fresh Onions",
      price: 22,
      unit: "kg",
      image: "/placeholder.svg?height=200&width=200",
      seller: "Farm Direct",
      rating: 4.7,
      stock: 800,
      location: "1.8 km away",
      category: "Vegetables",
      isEco: true,
    },
    {
      id: 4,
      name: "Fresh Tomatoes",
      price: 35,
      unit: "kg",
      image: "/placeholder.svg?height=200&width=200",
      seller: "Veggie Fresh",
      rating: 4.4,
      stock: 300,
      location: "1.2 km away",
      category: "Vegetables",
      isEco: false,
    },
    {
      id: 5,
      name: "Fresh Tomatoes",
      price: 32,
      unit: "kg",
      image: "/placeholder.svg?height=200&width=200",
      seller: "Garden Fresh",
      rating: 4.6,
      stock: 250,
      location: "2.5 km away",
      category: "Vegetables",
      isEco: true,
    },
    {
      id: 6,
      name: "Fresh Tomatoes",
      price: 38,
      unit: "kg",
      image: "/placeholder.svg?height=200&width=200",
      seller: "Premium Veggies",
      rating: 4.8,
      stock: 150,
      location: "3.2 km away",
      category: "Vegetables",
      isEco: false,
    },
    {
      id: 7,
      name: "Fresh Potatoes",
      price: 20,
      unit: "kg",
      image: "/placeholder.svg?height=200&width=200",
      seller: "Farm Direct",
      rating: 4.3,
      stock: 800,
      location: "2.1 km away",
      category: "Vegetables",
      isEco: false,
    },
    {
      id: 8,
      name: "Fresh Potatoes",
      price: 18,
      unit: "kg",
      image: "/placeholder.svg?height=200&width=200",
      seller: "Organic Farm",
      rating: 4.5,
      stock: 600,
      location: "2.8 km away",
      category: "Vegetables",
      isEco: true,
    },
    {
      id: 9,
      name: "Green Chilies",
      price: 80,
      unit: "kg",
      image: "/placeholder.svg?height=200&width=200",
      seller: "Spice Garden",
      rating: 4.4,
      stock: 50,
      location: "1.9 km away",
      category: "Vegetables",
      isEco: false,
    },
    {
      id: 10,
      name: "Fresh Ginger",
      price: 120,
      unit: "kg",
      image: "/placeholder.svg?height=200&width=200",
      seller: "Herb House",
      rating: 4.6,
      stock: 40,
      location: "2.4 km away",
      category: "Vegetables",
      isEco: false,
    },
    {
      id: 11,
      name: "Fresh Garlic",
      price: 200,
      unit: "kg",
      image: "/placeholder.svg?height=200&width=200",
      seller: "Herb House",
      rating: 4.7,
      stock: 30,
      location: "2.4 km away",
      category: "Vegetables",
      isEco: false,
    },
    {
      id: 12,
      name: "Fresh Coriander",
      price: 40,
      unit: "kg",
      image: "/placeholder.svg?height=200&width=200",
      seller: "Green Herbs",
      rating: 4.2,
      stock: 25,
      location: "1.7 km away",
      category: "Vegetables",
      isEco: true,
    },
    {
      id: 13,
      name: "Fresh Carrots",
      price: 45,
      unit: "kg",
      image: "/placeholder.svg?height=200&width=200",
      seller: "Farm Direct",
      rating: 4.4,
      stock: 200,
      location: "2.1 km away",
      category: "Vegetables",
      isEco: false,
    },
    {
      id: 14,
      name: "Fresh Cauliflower",
      price: 30,
      unit: "kg",
      image: "/placeholder.svg?height=200&width=200",
      seller: "Veggie Fresh",
      rating: 4.3,
      stock: 100,
      location: "1.2 km away",
      category: "Vegetables",
      isEco: false,
    },
    {
      id: 15,
      name: "Fresh Cabbage",
      price: 25,
      unit: "kg",
      image: "/placeholder.svg?height=200&width=200",
      seller: "Garden Fresh",
      rating: 4.1,
      stock: 150,
      location: "2.5 km away",
      category: "Vegetables",
      isEco: true,
    },

    // Spices - Multiple sellers
    {
      id: 16,
      name: "Red Chili Powder",
      price: 180,
      unit: "kg",
      image: "/placeholder.svg?height=200&width=200",
      seller: "Spice King",
      rating: 4.8,
      stock: 50,
      location: "1.8 km away",
      category: "Spices",
      isEco: false,
    },
    {
      id: 17,
      name: "Red Chili Powder",
      price: 175,
      unit: "kg",
      image: "/placeholder.svg?height=200&width=200",
      seller: "Masala House",
      rating: 4.6,
      stock: 40,
      location: "2.2 km away",
      category: "Spices",
      isEco: false,
    },
    {
      id: 18,
      name: "Red Chili Powder",
      price: 185,
      unit: "kg",
      image: "/placeholder.svg?height=200&width=200",
      seller: "Premium Spices",
      rating: 4.9,
      stock: 30,
      location: "3.5 km away",
      category: "Spices",
      isEco: false,
    },
    {
      id: 19,
      name: "Turmeric Powder",
      price: 220,
      unit: "kg",
      image: "/placeholder.svg?height=200&width=200",
      seller: "Spice King",
      rating: 4.7,
      stock: 40,
      location: "1.8 km away",
      category: "Spices",
      isEco: false,
    },
    {
      id: 20,
      name: "Turmeric Powder",
      price: 210,
      unit: "kg",
      image: "/placeholder.svg?height=200&width=200",
      seller: "Organic Spices",
      rating: 4.8,
      stock: 35,
      location: "2.6 km away",
      category: "Spices",
      isEco: true,
    },
    {
      id: 21,
      name: "Garam Masala",
      price: 320,
      unit: "kg",
      image: "/placeholder.svg?height=200&width=200",
      seller: "Masala House",
      rating: 4.9,
      stock: 25,
      location: "3.5 km away",
      category: "Spices",
      isEco: false,
    },
    {
      id: 22,
      name: "Coriander Powder",
      price: 160,
      unit: "kg",
      image: "/placeholder.svg?height=200&width=200",
      seller: "Spice Garden",
      rating: 4.4,
      stock: 60,
      location: "2.7 km away",
      category: "Spices",
      isEco: false,
    },
    {
      id: 23,
      name: "Cumin Powder",
      price: 280,
      unit: "kg",
      image: "/placeholder.svg?height=200&width=200",
      seller: "Spice King",
      rating: 4.6,
      stock: 45,
      location: "1.8 km away",
      category: "Spices",
      isEco: false,
    },

    // Oils
    {
      id: 24,
      name: "Cooking Oil",
      price: 140,
      unit: "liter",
      image: "/placeholder.svg?height=200&width=200",
      seller: "Oil Mart",
      rating: 4.6,
      stock: 80,
      location: "1.5 km away",
      category: "Oils",
      isEco: false,
    },
    {
      id: 25,
      name: "Cooking Oil",
      price: 135,
      unit: "liter",
      image: "/placeholder.svg?height=200&width=200",
      seller: "Pure Oil Co",
      rating: 4.4,
      stock: 100,
      location: "2.8 km away",
      category: "Oils",
      isEco: false,
    },
    {
      id: 26,
      name: "Mustard Oil",
      price: 160,
      unit: "liter",
      image: "/placeholder.svg?height=200&width=200",
      seller: "Traditional Oils",
      rating: 4.7,
      stock: 60,
      location: "2.3 km away",
      category: "Oils",
      isEco: false,
    },
    {
      id: 27,
      name: "Coconut Oil",
      price: 180,
      unit: "liter",
      image: "/placeholder.svg?height=200&width=200",
      seller: "Pure Oil Co",
      rating: 4.8,
      stock: 40,
      location: "2.8 km away",
      category: "Oils",
      isEco: true,
    },

    // Packaging
    {
      id: 28,
      name: "Eco Paper Plates",
      price: 120,
      unit: "pack of 100",
      image: "/placeholder.svg?height=200&width=200",
      seller: "Green Supplies",
      rating: 4.3,
      stock: 200,
      location: "3.1 km away",
      category: "Packaging",
      isEco: true,
    },
    {
      id: 29,
      name: "Recycled Plastic Containers",
      price: 85,
      unit: "pack of 50",
      image: "/placeholder.svg?height=200&width=200",
      seller: "Eco Pack Solutions",
      rating: 4.2,
      stock: 150,
      location: "2.8 km away",
      category: "Packaging",
      isEco: true,
    },
    {
      id: 30,
      name: "Aluminum Foil Rolls",
      price: 95,
      unit: "pack of 10",
      image: "/placeholder.svg?height=200&width=200",
      seller: "Kitchen Supplies Co",
      rating: 4.5,
      stock: 120,
      location: "1.9 km away",
      category: "Packaging",
      isEco: false,
    },
    {
      id: 31,
      name: "Surplus Banana Leaves",
      price: 15,
      unit: "pack of 20",
      image: "/placeholder.svg?height=200&width=200",
      seller: "Nature's Best",
      rating: 4.6,
      stock: 80,
      location: "1.5 km away",
      category: "Packaging",
      isEco: true,
    },
    {
      id: 32,
      name: "Paper Bags",
      price: 45,
      unit: "pack of 100",
      image: "/placeholder.svg?height=200&width=200",
      seller: "Eco Pack Solutions",
      rating: 4.4,
      stock: 300,
      location: "2.8 km away",
      category: "Packaging",
      isEco: true,
    },
    {
      id: 33,
      name: "Plastic Food Containers",
      price: 150,
      unit: "pack of 50",
      image: "/placeholder.svg?height=200&width=200",
      seller: "Kitchen Supplies Co",
      rating: 4.3,
      stock: 200,
      location: "1.9 km away",
      category: "Packaging",
      isEco: false,
    },

    // Grains
    {
      id: 34,
      name: "Basmati Rice",
      price: 80,
      unit: "kg",
      image: "/placeholder.svg?height=200&width=200",
      seller: "Grain House",
      rating: 4.7,
      stock: 500,
      location: "2.1 km away",
      category: "Grains",
      isEco: false,
    },
    {
      id: 35,
      name: "Wheat Flour",
      price: 35,
      unit: "kg",
      image: "/placeholder.svg?height=200&width=200",
      seller: "Mill Direct",
      rating: 4.5,
      stock: 800,
      location: "1.8 km away",
      category: "Grains",
      isEco: false,
    },
    {
      id: 36,
      name: "Organic Quinoa",
      price: 450,
      unit: "kg",
      image: "/placeholder.svg?height=200&width=200",
      seller: "Health Grains",
      rating: 4.8,
      stock: 50,
      location: "3.5 km away",
      category: "Grains",
      isEco: true,
    },
    {
      id: 37,
      name: "Lentils (Dal)",
      price: 120,
      unit: "kg",
      image: "/placeholder.svg?height=200&width=200",
      seller: "Grain House",
      rating: 4.6,
      stock: 300,
      location: "2.1 km away",
      category: "Grains",
      isEco: false,
    },

    // Equipment
    {
      id: 38,
      name: "Steel Tawa",
      price: 450,
      unit: "piece",
      image: "/placeholder.svg?height=200&width=200",
      seller: "Kitchen Pro",
      rating: 4.5,
      stock: 25,
      location: "2.5 km away",
      category: "Equipment",
      isEco: false,
    },
    {
      id: 39,
      name: "Gas Stove Burner",
      price: 1200,
      unit: "piece",
      image: "/placeholder.svg?height=200&width=200",
      seller: "Equipment Hub",
      rating: 4.7,
      stock: 15,
      location: "3.2 km away",
      category: "Equipment",
      isEco: false,
    },
    {
      id: 40,
      name: "Steel Ladle Set",
      price: 280,
      unit: "set of 5",
      image: "/placeholder.svg?height=200&width=200",
      seller: "Kitchen Pro",
      rating: 4.4,
      stock: 40,
      location: "2.5 km away",
      category: "Equipment",
      isEco: false,
    },

    // Cleaning
    {
      id: 41,
      name: "Dish Soap",
      price: 85,
      unit: "liter",
      image: "/placeholder.svg?height=200&width=200",
      seller: "Clean Pro",
      rating: 4.3,
      stock: 100,
      location: "2.2 km away",
      category: "Cleaning",
      isEco: false,
    },
    {
      id: 42,
      name: "Eco-Friendly Detergent",
      price: 95,
      unit: "liter",
      image: "/placeholder.svg?height=200&width=200",
      seller: "Green Clean",
      rating: 4.6,
      stock: 80,
      location: "2.8 km away",
      category: "Cleaning",
      isEco: true,
    },
    {
      id: 43,
      name: "Scrub Pads",
      price: 25,
      unit: "pack of 10",
      image: "/placeholder.svg?height=200&width=200",
      seller: "Clean Pro",
      rating: 4.2,
      stock: 150,
      location: "2.2 km away",
      category: "Cleaning",
      isEco: false,
    },
  ]

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prev, { ...product, quantity: 1 }]
    })

    // Award EcoPoints for eco-friendly purchases
    if (product.isEco) {
      setEcoPoints((prev) => prev + 5)
    }
  }

  const redeemPoints = (rewardId: string, pointsCost: number) => {
    if (ecoPoints >= pointsCost) {
      setEcoPoints((prev) => prev - pointsCost)
      setActiveRewards((prev) => [...prev, rewardId])
      // Here you would typically update the user's account with the reward
      console.log(`Redeemed ${rewardId} for ${pointsCost} points`)
    }
  }

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  // Group products by name for price comparison
  const productGroups = products.reduce((groups, product) => {
    const key = product.name
    if (!groups[key]) {
      groups[key] = []
    }
    groups[key].push(product)
    return groups
  }, {})

  // Get unique products for display (lowest price variant)
  const uniqueProducts = Object.values(productGroups).map((group) => group.sort((a, b) => a.price - b.price)[0])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <h1 className="text-xl font-bold text-green-700">Marketplace</h1>
            </div>
            <div className="flex items-center space-x-2">
              <EcoPointsDisplay points={ecoPoints} onRedeemPoints={redeemPoints} />
              <Link href="/vendor/cart">
                <Button variant="outline" size="icon" className="relative bg-transparent">
                  <ShoppingCart className="w-5 h-5" />
                  {cartCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 w-5 h-5 rounded-full p-0 flex items-center justify-center text-xs">
                      {cartCount}
                    </Badge>
                  )}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-12 py-3 text-lg"
          />
          <Button
            variant="outline"
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent"
          >
            <Filter className="w-4 h-4" />
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="mb-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All Products</TabsTrigger>
            <TabsTrigger value="eco" className="flex items-center space-x-1">
              <Leaf className="w-4 h-4" />
              <span>Go Eco</span>
            </TabsTrigger>
            <TabsTrigger value="group" className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>Group Orders</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            {/* Categories */}
            <div className="grid grid-cols-4 md:grid-cols-8 gap-3 mb-6">
              {categories.map((category) => (
                <Card key={category.name} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-3 text-center">
                    <div className="text-2xl mb-1">{category.icon}</div>
                    <div className="text-xs font-medium">{category.name}</div>
                    <div className="text-xs text-gray-500">{category.count}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Featured Products Showcase */}
            <div className="space-y-6 mb-8">
              <ProductShowcase products={uniqueProducts} title="🔥 Trending Products" />
              <ProductShowcase products={uniqueProducts} title="🌱 Eco-Friendly Options" showEcoOnly={true} />
              <ProductShowcase
                products={uniqueProducts.filter((p) => p.category === "Vegetables")}
                title="🥬 Fresh Vegetables"
              />
              <ProductShowcase
                products={uniqueProducts.filter((p) => p.category === "Spices")}
                title="🌶️ Premium Spices"
              />
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {uniqueProducts.map((product) => {
                const productVariants = productGroups[product.name] || [product]
                const hasMultipleVariants = productVariants.length > 1

                return (
                  <Card key={product.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="p-0">
                      <div className="relative">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          width={300}
                          height={200}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                        {product.isEco && (
                          <Badge className="absolute top-2 left-2 bg-green-600">
                            <Leaf className="w-3 h-3 mr-1" />
                            Eco +5pts
                          </Badge>
                        )}
                        {hasMultipleVariants && (
                          <Badge className="absolute top-2 right-2 bg-blue-600">
                            <BarChart3 className="w-3 h-3 mr-1" />
                            {productVariants.length} sellers
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-lg">{product.name}</h3>
                        <div className="text-right">
                          <div className="text-lg font-bold text-green-600">₹{product.price}</div>
                          <div className="text-xs text-gray-500">per {product.unit}</div>
                          {hasMultipleVariants && (
                            <div className="text-xs text-blue-600">
                              from ₹{Math.min(...productVariants.map((p) => p.price))}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 mb-2">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm ml-1">{product.rating}</span>
                        </div>
                        <div className="text-sm text-gray-500">•</div>
                        <div className="text-sm text-gray-600">{product.seller}</div>
                      </div>

                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="w-4 h-4 mr-1" />
                          {product.location}
                        </div>
                        <div className="text-sm text-gray-600">Stock: {product.stock}</div>
                      </div>

                      <div className="flex space-x-2">
                        <Button onClick={() => addToCart(product)} className="flex-1">
                          Add to Cart
                        </Button>
                        {hasMultipleVariants && (
                          <PriceComparison
                            productName={product.name}
                            products={productVariants}
                            onAddToCart={addToCart}
                          />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="eco">
            <div className="text-center py-12">
              <Leaf className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Go Eco ♻</h3>
              <p className="text-gray-600 mb-6">
                Discover recycled and surplus items from households and local recyclers
              </p>

              {/* EcoPoints Info */}
              <Card className="max-w-md mx-auto mb-8 bg-green-50 border-green-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Leaf className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-green-700">Earn 5-10 EcoPoints per purchase!</span>
                  </div>
                  <div className="text-sm text-green-600">
                    Use points for free delivery, discounts, and more rewards
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {uniqueProducts
                  .filter((p) => p.isEco)
                  .map((product) => (
                    <Card key={product.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader className="p-0">
                        <div className="relative">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            width={300}
                            height={200}
                            className="w-full h-48 object-cover rounded-t-lg"
                          />
                          <Badge className="absolute top-2 left-2 bg-green-600">
                            <Leaf className="w-3 h-3 mr-1" />
                            +5 EcoPoints
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                        <div className="text-lg font-bold text-green-600 mb-2">
                          ₹{product.price} per {product.unit}
                        </div>
                        <div className="flex items-center space-x-2 mb-3">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm ml-1">{product.rating}</span>
                          </div>
                          <div className="text-sm text-gray-500">•</div>
                          <div className="text-sm text-gray-600">{product.seller}</div>
                        </div>
                        <Badge className="bg-green-100 text-green-800 mb-3">
                          <Leaf className="w-3 h-3 mr-1" />
                          Eco Friendly
                        </Badge>
                        <Button onClick={() => addToCart(product)} className="w-full">
                          Add to Cart (+5 pts)
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="group">
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Group Orders</h3>
              <p className="text-gray-600 mb-6">Join with nearby vendors for bulk discounts and shared delivery</p>

              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>Active Group Order</CardTitle>
                    <CardDescription>Onions Bulk Purchase - Sector 15</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Target Quantity:</span>
                        <span className="font-semibold">500 kg</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Current Orders:</span>
                        <span className="font-semibold">320 kg</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Vendors Joined:</span>
                        <span className="font-semibold">8</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Discount:</span>
                        <span className="font-semibold text-green-600">15% off</span>
                      </div>
                      <Button className="w-full">Join Group Order</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Eco Group Order</CardTitle>
                    <CardDescription>Recycled Packaging - Area 12</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Target Quantity:</span>
                        <span className="font-semibold">200 packs</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Current Orders:</span>
                        <span className="font-semibold">150 packs</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Vendors Joined:</span>
                        <span className="font-semibold">5</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Discount:</span>
                        <span className="font-semibold text-green-600">20% off</span>
                      </div>
                      <div className="flex justify-between">
                        <span>EcoPoints:</span>
                        <span className="font-semibold text-green-600">+15 pts</span>
                      </div>
                      <Button className="w-full bg-green-600 hover:bg-green-700">Join Eco Group (+15 pts)</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Floating Cart Summary */}
      {cartCount > 0 && (
        <div className="fixed bottom-4 left-4 right-4 bg-green-600 text-white rounded-lg p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold">{cartCount} items in cart</div>
              <div className="text-sm">Total: ₹{cartTotal}</div>
            </div>
            <Link href="/vendor/cart">
              <Button variant="secondary">View Cart</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
