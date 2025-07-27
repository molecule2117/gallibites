"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Package, Truck, CheckCircle, Clock, Phone, Download } from "lucide-react"
import Link from "next/link"

export default function OrdersPage() {
  const [orders] = useState([
    {
      id: "ORD001",
      date: "2024-01-15",
      status: "delivered",
      total: 610,
      items: [
        { name: "Fresh Onions", quantity: 10, price: 250 },
        { name: "Red Chili Powder", quantity: 2, price: 360 },
      ],
      seller: "Ramesh Wholesale",
      deliveryAddress: "Shop 15, Main Market, Sector 12",
      trackingSteps: [
        { status: "confirmed", time: "10:30 AM", completed: true },
        { status: "packed", time: "11:15 AM", completed: true },
        { status: "out_for_delivery", time: "2:45 PM", completed: true },
        { status: "delivered", time: "4:20 PM", completed: true },
      ],
    },
    {
      id: "ORD002",
      date: "2024-01-16",
      status: "out_for_delivery",
      total: 890,
      items: [
        { name: "Cooking Oil", quantity: 5, price: 700 },
        { name: "Paper Plates", quantity: 2, price: 190 },
      ],
      seller: "Green Supplies",
      deliveryAddress: "Shop 15, Main Market, Sector 12",
      trackingSteps: [
        { status: "confirmed", time: "9:15 AM", completed: true },
        { status: "packed", time: "10:30 AM", completed: true },
        { status: "out_for_delivery", time: "1:20 PM", completed: true },
        { status: "delivered", time: "", completed: false },
      ],
    },
    {
      id: "ORD003",
      date: "2024-01-17",
      status: "confirmed",
      total: 450,
      items: [{ name: "Tomatoes", quantity: 15, price: 450 }],
      seller: "Fresh Mart",
      deliveryAddress: "Shop 15, Main Market, Sector 12",
      trackingSteps: [
        { status: "confirmed", time: "8:45 AM", completed: true },
        { status: "packed", time: "", completed: false },
        { status: "out_for_delivery", time: "", completed: false },
        { status: "delivered", time: "", completed: false },
      ],
    },
  ])

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-blue-100 text-blue-800"
      case "packed":
        return "bg-yellow-100 text-yellow-800"
      case "out_for_delivery":
        return "bg-purple-100 text-purple-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed":
        return <Clock className="w-4 h-4" />
      case "packed":
        return <Package className="w-4 h-4" />
      case "out_for_delivery":
        return <Truck className="w-4 h-4" />
      case "delivered":
        return <CheckCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const activeOrders = orders.filter((order) => order.status !== "delivered")
  const completedOrders = orders.filter((order) => order.status === "delivered")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center space-x-3">
            <Link href="/vendor/marketplace">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold">My Orders</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="active" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="active">Active Orders ({activeOrders.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedOrders.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            {activeOrders.length === 0 ? (
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No active orders</h3>
                <p className="text-gray-600 mb-6">Your active orders will appear here</p>
                <Link href="/vendor/marketplace">
                  <Button>Start Shopping</Button>
                </Link>
              </div>
            ) : (
              activeOrders.map((order) => (
                <Card key={order.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                        <CardDescription>
                          {order.date} • {order.seller}
                        </CardDescription>
                      </div>
                      <Badge className={getStatusColor(order.status)}>
                        {getStatusIcon(order.status)}
                        <span className="ml-1 capitalize">{order.status.replace("_", " ")}</span>
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Order Items */}
                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>
                            {item.name} x {item.quantity}
                          </span>
                          <span>₹{item.price}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between font-semibold pt-2 border-t">
                      <span>Total</span>
                      <span>₹{order.total}</span>
                    </div>

                    {/* Tracking */}
                    <div className="space-y-3">
                      <h4 className="font-semibold">Order Tracking</h4>
                      <div className="space-y-2">
                        {order.trackingSteps.map((step, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <div
                              className={`w-4 h-4 rounded-full ${step.completed ? "bg-green-500" : "bg-gray-300"}`}
                            />
                            <div className="flex-1">
                              <div className={`text-sm ${step.completed ? "text-gray-900" : "text-gray-500"}`}>
                                {step.status.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                              </div>
                              {step.time && <div className="text-xs text-gray-500">{step.time}</div>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-2 pt-4">
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        <Phone className="w-4 h-4 mr-2" />
                        Call Seller
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        Track Order
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {completedOrders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                      <CardDescription>
                        {order.date} • {order.seller}
                      </CardDescription>
                    </div>
                    <Badge className={getStatusColor(order.status)}>
                      {getStatusIcon(order.status)}
                      <span className="ml-1">Delivered</span>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>
                          {item.name} x {item.quantity}
                        </span>
                        <span>₹{item.price}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between font-semibold pt-2 border-t">
                    <span>Total</span>
                    <span>₹{order.total}</span>
                  </div>

                  <div className="flex space-x-2 pt-4">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      <Download className="w-4 h-4 mr-2" />
                      Download Invoice
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      Reorder
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
