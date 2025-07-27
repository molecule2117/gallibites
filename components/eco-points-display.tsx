"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Leaf, Gift, TrendingUp, History, Award, ShoppingBag, Recycle, Star } from "lucide-react"

interface EcoPointsDisplayProps {
  points?: number
}

export default function EcoPointsDisplay({ points = 1250 }: EcoPointsDisplayProps) {
  const [selectedReward, setSelectedReward] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const rewards = [
    {
      id: "1",
      name: "₹50 Discount Voucher",
      points: 500,
      available: true,
      description: "Get ₹50 off on your next order",
      icon: Gift,
      category: "discount",
    },
    {
      id: "2",
      name: "Free Delivery (3 orders)",
      points: 300,
      available: true,
      description: "Free delivery for your next 3 orders",
      icon: ShoppingBag,
      category: "delivery",
    },
    {
      id: "3",
      name: "Organic Starter Pack",
      points: 800,
      available: true,
      description: "Curated selection of organic products",
      icon: Leaf,
      category: "product",
    },
    {
      id: "4",
      name: "₹100 Discount Voucher",
      points: 1000,
      available: true,
      description: "Get ₹100 off on orders above ₹500",
      icon: Gift,
      category: "discount",
    },
    {
      id: "5",
      name: "Premium Membership (1 month)",
      points: 1500,
      available: false,
      description: "Access to exclusive deals and early access",
      icon: Star,
      category: "membership",
    },
    {
      id: "6",
      name: "Eco-Friendly Kit",
      points: 2000,
      available: true,
      description: "Reusable bags, containers, and utensils",
      icon: Recycle,
      category: "product",
    },
  ]

  const recentActivity = [
    { date: "Today", action: "Purchased eco-friendly packaging", points: 25, type: "earned" },
    { date: "Yesterday", action: "Bought organic vegetables", points: 15, type: "earned" },
    { date: "2 days ago", action: "Used reusable bags", points: 10, type: "earned" },
    { date: "3 days ago", action: "Bulk purchase discount", points: 30, type: "earned" },
    { date: "1 week ago", action: "First organic purchase", points: 50, type: "earned" },
  ]

  const nextMilestone = 1500
  const progress = (points / nextMilestone) * 100

  const redeemReward = (rewardId: string) => {
    const reward = rewards.find((r) => r.id === rewardId)
    if (reward && reward.available && points >= reward.points) {
      setSelectedReward(rewardId)
      console.log(`Redeeming reward: ${reward.name}`)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
          <Leaf className="w-4 h-4 text-green-600" />
          <span className="font-semibold text-green-600">{points}</span>
          <span className="text-sm text-gray-600">EcoPoints</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Leaf className="w-5 h-5 text-green-600" />
            <span>EcoPoints Dashboard</span>
            <Badge className="bg-green-100 text-green-800 ml-auto">{points} points</Badge>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{points}</div>
                <div className="text-sm text-gray-600">Total Points</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">₹{Math.floor(points * 0.1)}</div>
                <div className="text-sm text-gray-600">Points Value</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{nextMilestone - points}</div>
                <div className="text-sm text-gray-600">To Next Reward</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress to Premium Membership</span>
                <span>
                  {points}/{nextMilestone}
                </span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center">
                  <Gift className="w-4 h-4 mr-2 text-green-600" />
                  Available Rewards
                </h3>
                <div className="space-y-2">
                  {rewards
                    .filter((r) => r.available && points >= r.points)
                    .slice(0, 3)
                    .map((reward) => (
                      <div key={reward.id} className="flex justify-between items-center text-sm">
                        <span>{reward.name}</span>
                        <Badge variant="outline">{reward.points} pts</Badge>
                      </div>
                    ))}
                </div>
              </div>

              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2 text-blue-600" />
                  Recent Activity
                </h3>
                <div className="space-y-2">
                  {recentActivity.slice(0, 3).map((activity, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <span className="truncate">{activity.action}</span>
                      <Badge variant="secondary">+{activity.points}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="rewards" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {rewards.map((reward) => {
                const Icon = reward.icon
                const canRedeem = reward.available && points >= reward.points
                const isRedeemed = selectedReward === reward.id

                return (
                  <Card
                    key={reward.id}
                    className={`${!canRedeem ? "opacity-50" : ""} ${isRedeemed ? "ring-2 ring-green-500" : ""}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3 mb-3">
                        <div
                          className={`p-2 rounded-lg ${
                            reward.category === "discount"
                              ? "bg-orange-100 text-orange-600"
                              : reward.category === "delivery"
                                ? "bg-blue-100 text-blue-600"
                                : reward.category === "product"
                                  ? "bg-green-100 text-green-600"
                                  : "bg-purple-100 text-purple-600"
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{reward.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">{reward.description}</p>
                        </div>
                        <Badge variant={canRedeem ? "default" : "secondary"}>{reward.points} pts</Badge>
                      </div>
                      <Button
                        size="sm"
                        className="w-full"
                        disabled={!canRedeem || isRedeemed}
                        onClick={() => redeemReward(reward.id)}
                      >
                        {isRedeemed
                          ? "Redeemed!"
                          : points < reward.points
                            ? `Need ${reward.points - points} more points`
                            : !reward.available
                              ? "Coming Soon"
                              : "Redeem"}
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="earn" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3 flex items-center">
                    <ShoppingBag className="w-4 h-4 mr-2 text-green-600" />
                    Shopping Actions
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Buy eco-friendly products</span>
                      <Badge variant="outline">+10-50 pts</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Use reusable packaging</span>
                      <Badge variant="outline">+5 pts</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Bulk purchases</span>
                      <Badge variant="outline">+15 pts</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Organic product purchases</span>
                      <Badge variant="outline">+20 pts</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3 flex items-center">
                    <Award className="w-4 h-4 mr-2 text-blue-600" />
                    Bonus Actions
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>First organic purchase</span>
                      <Badge variant="outline">+50 pts</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Weekly eco-challenge</span>
                      <Badge variant="outline">+100 pts</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Refer a friend</span>
                      <Badge variant="outline">+200 pts</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Monthly sustainability goal</span>
                      <Badge variant="outline">+300 pts</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">Terms & Conditions</h3>
                <div className="text-xs text-gray-600 space-y-1">
                  <p>• EcoPoints expire after 12 months of inactivity</p>
                  <p>• Points are awarded within 24 hours of qualifying actions</p>
                  <p>• Minimum redemption varies by reward</p>
                  <p>• Points cannot be transferred or exchanged for cash</p>
                  <p>• GalliBites reserves the right to modify the program</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Leaf className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{activity.action}</div>
                      <div className="text-xs text-gray-500">{activity.date}</div>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">+{activity.points} pts</Badge>
                </div>
              ))}
            </div>

            <div className="text-center py-4">
              <Button variant="outline" size="sm">
                <History className="w-4 h-4 mr-2" />
                View Full History
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
