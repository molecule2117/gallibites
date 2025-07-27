"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Plus, Edit, Trash2, Eye, TrendingUp, Package, Users, IndianRupee, Star, Upload } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function SellerDashboard() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Fresh Onions",
      price: 25,
      unit: "kg",
      stock: 500,
      image: "/placeholder.svg?height=100&width=100",
      category: "Vegetables",
      status: "active",
      orders: 45,
      rating: 4.5,
    },
    {
      id: 2,
      name: "Red Chili Powder",
      price: 180,
      unit: "kg",
      stock: 50,
      image: "/placeholder.svg?height=100&width=100",
      category: "Spices",
      status: "active",
      orders: 23,
      rating: 4.8,
    },
    {
      id: 3,
      name: "Turmeric Powder",
      price: 220,
      unit: "kg",
      stock: 40,
      image: "/placeholder.svg?height=100&width=100",
      category: "Spices",
      status: "active",
      orders: 18,
      rating: 4.7,
    },
    {
      id: 4,
      name: "Fresh Tomatoes",
      price: 35,
      unit: "kg",
      stock: 300,
      image: "/placeholder.svg?height=100&width=100",
      category: "Vegetables",
      status: "active",
      orders: 32,
      rating: 4.4,
    },
  ])

  const [orders] = useState([
    {
      id: "ORD001",
      buyer: "Ravi Kumar",
      product: "Fresh Onions",
      quantity: 10,
      total: 250,
      status: "pending",
      date: "2024-01-17",
    },
    {
      id: "ORD002",
      buyer: "Sunita Devi",
      product: "Red Chili Powder",
      quantity: 2,
      total: 360,
      status: "confirmed",
      date: "2024-01-16",
    },
  ])

  const [showAddProduct, setShowAddProduct] = useState(false)
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    unit: "kg",
    stock: "",
    category: "Vegetables",
    description: "",
  })

  const stats = {
    totalProducts: products.length,
    totalOrders: orders.length,
    totalEarnings: 15420,
    avgRating: 4.6,
  }

  const addProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.stock) {
      const product = {
        id: products.length + 1,
        ...newProduct,
        price: Number.parseFloat(newProduct.price),
        stock: Number.parseInt(newProduct.stock),
        image: "/placeholder.svg?height=100&width=100&query=" + newProduct.name.toLowerCase(),
        status: "active",
        orders: 0,
        rating: 0,
      }
      setProducts([...products, product])
      setNewProduct({
        name: "",
        price: "",
        unit: "kg",
        stock: "",
        category: "Vegetables",
        description: "",
      })
      setShowAddProduct(false)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "confirmed":
        return "bg-blue-100 text-blue-800"
      case "packed":
        return "bg-purple-100 text-purple-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

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
              <h1 className="text-xl font-bold">Seller Dashboard</h1>
            </div>
            <Button onClick={() => setShowAddProduct(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <Package className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{stats.totalProducts}</div>
              <div className="text-sm text-gray-600">Products</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{stats.totalOrders}</div>
              <div className="text-sm text-gray-600">Orders</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <IndianRupee className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">₹{stats.totalEarnings}</div>
              <div className="text-sm text-gray-600">Earnings</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Star className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{stats.avgRating}</div>
              <div className="text-sm text-gray-600">Rating</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="products">My Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-4">
            {products.map((product) => (
              <Card key={product.id}>
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
                        <h3 className="font-semibold text-lg">{product.name}</h3>
                        <Badge
                          className={
                            product.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                          }
                        >
                          {product.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="text-gray-600">Price</div>
                          <div className="font-semibold">
                            ₹{product.price}/{product.unit}
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-600">Stock</div>
                          <div className="font-semibold">
                            {product.stock} {product.unit}
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-600">Orders</div>
                          <div className="font-semibold">{product.orders}</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Rating</div>
                          <div className="font-semibold flex items-center">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                            {product.rating || "N/A"}
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2 mt-4">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                          <Trash2 className="w-4 h-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="orders" className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold">Order #{order.id}</h3>
                      <p className="text-sm text-gray-600">
                        {order.buyer} • {order.date}
                      </p>
                    </div>
                    <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm mb-4">
                    <div>
                      <div className="text-gray-600">Product</div>
                      <div className="font-semibold">{order.product}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Quantity</div>
                      <div className="font-semibold">{order.quantity}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Total</div>
                      <div className="font-semibold">₹{order.total}</div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {order.status === "pending" && (
                      <>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          Accept Order
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 bg-transparent">
                          Reject
                        </Button>
                      </>
                    )}
                    {order.status === "confirmed" && <Button size="sm">Mark as Packed</Button>}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sales Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>This Month</span>
                      <span className="font-semibold">₹8,420</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Month</span>
                      <span className="font-semibold">₹7,000</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span>Growth</span>
                      <span className="font-semibold flex items-center">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        +20.3%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {products.slice(0, 3).map((product) => (
                      <div key={product.id} className="flex justify-between">
                        <span>{product.name}</span>
                        <span className="font-semibold">{product.orders} orders</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Product Modal */}
      {showAddProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Add New Product</CardTitle>
              <CardDescription>Fill in the details to add a new product</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  placeholder="Enter product name"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label htmlFor="unit">Unit</Label>
                  <select
                    id="unit"
                    value={newProduct.unit}
                    onChange={(e) => setNewProduct({ ...newProduct, unit: e.target.value })}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="kg">kg</option>
                    <option value="liter">liter</option>
                    <option value="piece">piece</option>
                    <option value="pack">pack</option>
                  </select>
                </div>
              </div>
              <div>
                <Label htmlFor="stock">Stock Quantity</Label>
                <Input
                  id="stock"
                  type="number"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="Vegetables">Vegetables</option>
                  <option value="Spices">Spices</option>
                  <option value="Packaging">Packaging</option>
                  <option value="Equipment">Equipment</option>
                  <option value="Cleaning">Cleaning</option>
                </select>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  placeholder="Enter product description"
                />
              </div>
              <div>
                <Label>Product Image</Label>
                <Button variant="outline" className="w-full bg-transparent">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Image
                </Button>
              </div>
              <div className="flex space-x-2 pt-4">
                <Button onClick={addProduct} className="flex-1">
                  Add Product
                </Button>
                <Button variant="outline" onClick={() => setShowAddProduct(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
