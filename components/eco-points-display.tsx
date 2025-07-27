"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Leaf, Gift, TrendingUp, History, Info, Star, Coffee, ShoppingBag, Truck, Percent, Award } from "lucide-react"

interface EcoPointsDisplayProps {
  points?: number
}

export default function EcoPointsDisplay({ points = 1250 }: EcoPointsDisplayProps) {
  const [isOpen, setIsOpen] = useState(false)

  const nextMilestone = 1500
  const progress = (points / nextMilestone) * 100

  const rewards = [
    {
      id: 1,
      name: "Free Delivery",
      points: 100,
      icon: Truck,
      category: "Shipping",
      description: "Get free delivery on your next order",
      available: points >= 100,
    },
    {
      id: 2,
      name: "5% Discount",
      points: 250,
      icon: Percent,
      category: "Discount",
      description: "5% off on orders above ₹500",
      available: points >= 250,
    },
    {
      id: 3,
      name: "Premium Badge",
      points: 500,
      icon: Award,
      category: "Status",
      description: "Get premium member badge and benefits",
      available: points >= 500,
    },
    {
      id: 4,
      name: "Eco Starter Kit",
      points: 750,
      icon: Leaf,
      category: "Products",
      description: "Free eco-friendly starter kit worth ₹200",
      available: points >= 750,
    },
    {
      id: 5,
      name: "Coffee Voucher",
      points: 1000,
      icon: Coffee,
      category: "Voucher",
      description: "₹100 voucher for local coffee shops",
      available: points >= 1000,
    },
    {
      id: 6,
      name: "Shopping Spree",
      points: 1500,
      icon: ShoppingBag,
      category: "Voucher",
      description: "₹500 shopping voucher for marketplace",
      available: points >= 1500,
    },
  ]

  const recentActivity = [
    { date: "Today", action: "Purchased organic tomatoes", points: 15 },
    { date: "Yesterday", action: "Used eco-friendly packaging", points: 25 },
    { date: "2 days ago", action: "Bought from local vendor", points: 10 },
    { date: "3 days ago", action: "Recycled containers", points: 20 },
    { date: "1 week ago", action: "Bulk purchase discount", points: 30 },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 bg-transparent">
          <Leaf className="h-4 w-4 text-green-600" />
          <span className="font-semibold text-green-600">{points}</span>
          <span className="text-sm text-gray-600">EcoPoints</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Leaf className="h-5 w-5 text-green-600" />
            EcoPoints Dashboard
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="rewards">Rewards</TabsTrigger>
            <TabsTrigger value="earn">How to Earn</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-green-600 mb-2">{points}</div>
                  <p className="text-gray-600">Total EcoPoints</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress to next milestone</span>
                    <span>
                      {points}/{nextMilestone}
                    </span>
                  </div>
                  <Progress value={progress} className="h-2" />
                  <p className="text-xs text-gray-500 text-center">
                    {nextMilestone - points} points to unlock Shopping Spree reward
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <TrendingUp className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <div className="text-lg font-semibold">125</div>
                  <p className="text-xs text-gray-600">Points this month</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Gift className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                  <div className="text-lg font-semibold">3</div>
                  <p className="text-xs text-gray-600">Rewards available</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="rewards" className="space-y-4">
            <div className="grid gap-3">
              {rewards.map((reward) => (
                <Card key={reward.id} className={reward.available ? "border-green-200" : "opacity-60"}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${reward.available ? "bg-green-100" : "bg-gray-100"}`}>
                          <reward.icon className={`h-5 w-5 ${reward.available ? "text-green-600" : "text-gray-400"}`} />
                        </div>
                        <div>
                          <h4 className="font-semibold">{reward.name}</h4>
                          <p className="text-sm text-gray-600">{reward.description}</p>
                          <Badge variant="outline" className="text-xs mt-1">
                            {reward.category}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-green-600">{reward.points} pts</div>
                        <Button size="sm" disabled={!reward.available} className="mt-2">
                          {reward.available ? "Redeem" : "Locked"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="earn" className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  Ways to Earn EcoPoints
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>• Purchase organic products</span>
                    <Badge variant="secondary">+5-15 pts</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>• Use eco-friendly packaging</span>
                    <Badge variant="secondary">+10-25 pts</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>• Buy from local vendors</span>
                    <Badge variant="secondary">+5-10 pts</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>• Recycle containers</span>
                    <Badge variant="secondary">+15-20 pts</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>• Bulk purchases</span>
                    <Badge variant="secondary">+20-30 pts</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>• Refer friends</span>
                    <Badge variant="secondary">+50 pts</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Info className="h-4 w-4 text-blue-500" />
                  Tips to Maximize Points
                </h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Choose organic products when available</li>
                  <li>• Opt for eco-friendly packaging options</li>
                  <li>• Support local vendors in your area</li>
                  <li>• Return containers for recycling</li>
                  <li>• Make bulk purchases to reduce packaging</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <History className="h-4 w-4 text-gray-600" />
                  Recent Activity
                </h3>
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0"
                    >
                      <div>
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-xs text-gray-500">{activity.date}</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">+{activity.points} pts</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2">Terms & Conditions</h4>
                <div className="text-xs text-gray-600 space-y-1">
                  <p>• EcoPoints expire after 12 months of inactivity</p>
                  <p>• Points are awarded within 24 hours of purchase</p>
                  <p>• Rewards are subject to availability</p>
                  <p>• Points cannot be transferred or exchanged for cash</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
