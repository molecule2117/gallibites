"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingCart, Store, Leaf, Users, Globe, Phone } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [selectedLanguage, setSelectedLanguage] = useState("English")

  const languages = ["English", "हिंदी", "தமிழ்", "বাংলা"]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <Store className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-green-700">GalliBites</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4 text-gray-600" />
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="text-sm border rounded px-2 py-1"
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Empowering Street Vendors Through Simple Digital Tools
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Connect with wholesalers, find the best deals, and grow your street food business with our easy-to-use
          platform
        </p>

        {/* Role Selection Cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-green-500">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl">I'm a Vendor</CardTitle>
              <CardDescription className="text-lg">
                Street food vendor looking to buy raw materials affordably
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/vendor/marketplace">
                <Button className="w-full text-lg py-6 bg-blue-600 hover:bg-blue-700">Start Shopping</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-green-500">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Store className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl">I'm a Seller</CardTitle>
              <CardDescription className="text-lg">Wholesaler, recycler, or household selling items</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/seller/dashboard">
                <Button className="w-full text-lg py-6 bg-green-600 hover:bg-green-700">Start Selling</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Quick Login */}
        <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
          <h3 className="text-lg font-semibold mb-4">Quick Login</h3>
          <div className="space-y-3">
            <Button variant="outline" className="w-full flex items-center justify-center space-x-2 bg-transparent">
              <Phone className="w-4 h-4" />
              <span>Login with Phone OTP</span>
            </Button>
            <Button variant="outline" className="w-full bg-transparent">
              Login with Email
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products Preview */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-center mb-12">Popular Products</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="text-center group cursor-pointer">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gray-100 group-hover:scale-105 transition-transform">
              <img
                src="/placeholder.svg?height=96&width=96"
                alt="Fresh Onions"
                className="w-full h-full object-cover"
              />
            </div>
            <h4 className="font-semibold">Fresh Onions</h4>
            <p className="text-green-600 font-bold">₹25/kg</p>
          </div>

          <div className="text-center group cursor-pointer">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gray-100 group-hover:scale-105 transition-transform">
              <img
                src="/placeholder.svg?height=96&width=96"
                alt="Red Chili Powder"
                className="w-full h-full object-cover"
              />
            </div>
            <h4 className="font-semibold">Chili Powder</h4>
            <p className="text-green-600 font-bold">₹180/kg</p>
          </div>

          <div className="text-center group cursor-pointer">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gray-100 group-hover:scale-105 transition-transform">
              <img
                src="/placeholder.svg?height=96&width=96"
                alt="Fresh Tomatoes"
                className="w-full h-full object-cover"
              />
            </div>
            <h4 className="font-semibold">Fresh Tomatoes</h4>
            <p className="text-green-600 font-bold">₹35/kg</p>
          </div>

          <div className="text-center group cursor-pointer">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gray-100 group-hover:scale-105 transition-transform">
              <img
                src="/placeholder.svg?height=96&width=96"
                alt="Eco Paper Plates"
                className="w-full h-full object-cover"
              />
            </div>
            <h4 className="font-semibold">Eco Plates</h4>
            <p className="text-green-600 font-bold">₹120/pack</p>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link href="/vendor/marketplace">
            <Button size="lg" className="bg-green-600 hover:bg-green-700">
              View All Products
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">Why Choose GalliBites?</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Group Orders</h4>
              <p className="text-gray-600">Join with nearby vendors for bulk discounts and shared delivery</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Go Eco ♻</h4>
              <p className="text-gray-600">Buy recycled and surplus items to reduce waste and save money</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Multi-Language</h4>
              <p className="text-gray-600">Available in Hindi, Tamil, Bengali and more local languages</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
              <Store className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold">GalliBites</span>
          </div>
          <p className="text-gray-400">Empowering Street Vendors Through Simple Digital Tools</p>
        </div>
      </footer>
    </div>
  )
}
