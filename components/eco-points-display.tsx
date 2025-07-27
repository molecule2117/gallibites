"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Leaf, Gift, TrendingUp, Award, ShoppingBag, Recycle } from "lucide-react"

interface EcoPointsDisplayProps {
  currentPoints: number
  totalEarned: number
}

export default function EcoPointsDisplay({ currentPoints, totalEarned }: EcoPointsDisplayProps) {
  const [isOpen, setIsOpen] = useState(false)

  const nextTierPoints = 1000
  const progressPercentage = (currentPoints / nextTierPoints) * 100

  const rewards = [
    { id: "1", name: "₹50 Discount Voucher", points: 500, available: true },
    { id: "2", name: "Free Delivery (3 orders)", points: 300, available: true },
    { id: "3", name: "₹100 Discount Voucher", points: 1000, available: false },
    { id: "4", name: "Organic Product Bundle", points: 800, available: false },
    { id: "5", name: "Premium Membership (1 month)", points: 1500, available: false },
  ]

  const activities = [
    { action: "Purchased Organic Tomatoes", points: 10, date: "2 hours ago" },
    { action: "Referred a friend", points: 100, date: "1 day ago" },
    { action: "Purchased Eco-friendly packaging", points: 25, date: "3 days ago" },
    { action: "First organic purchase bonus", points: 50, date: "1 week ago" },
    { action: "Account signup bonus", points: 100, date: "2 weeks ago" },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-green-50 border-green-200 hover:bg-green-100">
          <Leaf className="w-4 h-4 mr-2 text-green-600" />
          <span className="text-green-700 font-medium">{currentPoints} EcoPoints</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Leaf className="w-6 h-6 mr-2 text-green-600" />
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

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-6 text-center">
                  <Leaf className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-green-600">{currentPoints}</div>
                  <div className="text-sm text-gray-600">Current Points</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-blue-600">{totalEarned}</div>
                  <div className="text-sm text-gray-600">Total Earned</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Award className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-purple-600">Gold</div>
                  <div className="text-sm text-gray-600">Current Tier</div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Progress to Next Tier</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Current: {currentPoints} points</span>
                    <span>Next tier: {nextTierPoints} points</span>
                  </div>
                  <Progress value={progressPercentage} className="h-3" />
                  <p className="text-sm text-gray-600">
                    {nextTierPoints - currentPoints} more points to reach Platinum tier
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">Environmental Impact</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">CO₂ Saved:</span>
                  <span className="text-green-700 ml-2">12.5 kg</span>
                </div>
                <div>
                  <span className="font-medium">Plastic Avoided:</span>
                  <span className="text-green-700 ml-2">2.3 kg</span>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="rewards" className="space-y-4">
            <div className="grid gap-4">
              {rewards.map((reward) => (
                <Card key={reward.id} className={`${reward.available ? "" : "opacity-60"}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Gift className="w-6 h-6 text-purple-600" />
                        <div>
                          <h4 className="font-semibold">{reward.name}</h4>
                          <p className="text-sm text-gray-600">{reward.points} EcoPoints required</p>
                        </div>
                      </div>
                      <Button
                        variant={reward.available ? "default" : "outline"}
                        disabled={!reward.available}
                        className={reward.available ? "bg-green-600 hover:bg-green-700" : ""}
                      >
                        {reward.available ? "Redeem" : "Locked"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="earn" className="space-y-4">
            <div className="grid gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <ShoppingBag className="w-6 h-6 text-green-600" />
                    <div>
                      <h4 className="font-semibold">Purchase Products</h4>
                      <p className="text-sm text-gray-600">Earn 1 point per ₹10 spent</p>
                    </div>
                    <Badge variant="secondary">+1-5 points</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Leaf className="w-6 h-6 text-green-600" />
                    <div>
                      <h4 className="font-semibold">Buy Organic Products</h4>
                      <p className="text-sm text-gray-600">Extra points for eco-friendly choices</p>
                    </div>
                    <Badge variant="secondary">+5-15 points</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Recycle className="w-6 h-6 text-green-600" />
                    <div>
                      <h4 className="font-semibold">Use Eco Packaging</h4>
                      <p className="text-sm text-gray-600">Choose sustainable packaging options</p>
                    </div>
                    <Badge variant="secondary">+10-25 points</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Award className="w-6 h-6 text-green-600" />
                    <div>
                      <h4 className="font-semibold">Refer Friends</h4>
                      <p className="text-sm text-gray-600">Get points when friends make their first purchase</p>
                    </div>
                    <Badge variant="secondary">+100 points</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <div className="space-y-3">
              {activities.map((activity, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{activity.action}</h4>
                        <p className="text-sm text-gray-600">{activity.date}</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">+{activity.points} points</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
