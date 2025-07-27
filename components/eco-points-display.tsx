"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Leaf, Truck, Percent, Star } from "lucide-react"

interface EcoPointsDisplayProps {
  points: number
  onRedeemPoints: (reward: string, pointsCost: number) => void
}

export function EcoPointsDisplay({ points, onRedeemPoints }: EcoPointsDisplayProps) {
  const [isOpen, setIsOpen] = useState(false)

  const rewards = [
    {
      id: "free_delivery",
      title: "Free Delivery",
      description: "Get free delivery on your next order",
      points: 50,
      icon: Truck,
      color: "bg-blue-100 text-blue-800",
    },
    {
      id: "discount_5",
      title: "5% Discount",
      description: "Get 5% off on your next purchase",
      points: 100,
      icon: Percent,
      color: "bg-green-100 text-green-800",
    },
    {
      id: "discount_10",
      title: "10% Discount",
      description: "Get 10% off on your next purchase",
      points: 200,
      icon: Percent,
      color: "bg-purple-100 text-purple-800",
    },
    {
      id: "premium_support",
      title: "Premium Support",
      description: "Get priority customer support for 1 month",
      points: 150,
      icon: Star,
      color: "bg-yellow-100 text-yellow-800",
    },
  ]

  const nextReward = rewards.find((reward) => points < reward.points)
  const progressToNext = nextReward ? (points / nextReward.points) * 100 : 100

  return (
    <div className="flex items-center space-x-2">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="bg-green-50 border-green-200 hover:bg-green-100">
            <Leaf className="w-4 h-4 mr-1 text-green-600" />
            <span className="text-green-700 font-semibold">{points} EcoPoints</span>
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Leaf className="w-5 h-5 mr-2 text-green-600" />
              EcoPoints Rewards
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Current Points */}
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-green-700 mb-1">{points}</div>
                <div className="text-sm text-green-600">EcoPoints Available</div>
              </CardContent>
            </Card>

            {/* Progress to Next Reward */}
            {nextReward && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress to {nextReward.title}</span>
                  <span>
                    {points}/{nextReward.points}
                  </span>
                </div>
                <Progress value={progressToNext} className="h-2" />
                <div className="text-xs text-gray-500 text-center">{nextReward.points - points} more points needed</div>
              </div>
            )}

            {/* Available Rewards */}
            <div className="space-y-3">
              <h4 className="font-semibold">Available Rewards</h4>
              {rewards.map((reward) => {
                const canRedeem = points >= reward.points
                const RewardIcon = reward.icon

                return (
                  <Card key={reward.id} className={`${canRedeem ? "border-green-200" : "border-gray-200 opacity-60"}`}>
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${reward.color}`}>
                            <RewardIcon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-medium">{reward.title}</div>
                            <div className="text-xs text-gray-600">{reward.description}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold">{reward.points} pts</div>
                          {canRedeem ? (
                            <Button
                              size="sm"
                              onClick={() => {
                                onRedeemPoints(reward.id, reward.points)
                                setIsOpen(false)
                              }}
                              className="mt-1"
                            >
                              Redeem
                            </Button>
                          ) : (
                            <Badge variant="secondary" className="mt-1">
                              Need {reward.points - points}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* How to Earn Points */}
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">How to Earn EcoPoints</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-1 text-xs text-blue-700">
                  <div>🌱 Buy eco-friendly products: +5 points</div>
                  <div>♻️ Buy recycled items: +10 points</div>
                  <div>📦 Use minimal packaging: +3 points</div>
                  <div>👥 Join group eco orders: +15 points</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
