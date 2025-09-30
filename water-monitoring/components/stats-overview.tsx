import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Minus, Droplets, Clock, Wifi } from "lucide-react"

interface StatsOverviewProps {
  waterLevel: number
  status: "safe" | "warning" | "critical"
  trend: "up" | "down" | "stable"
  lastUpdate: Date
}

export function StatsOverview({ waterLevel, status, trend, lastUpdate }: StatsOverviewProps) {
  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-[hsl(var(--safe-green))]" />
      case "down":
        return <TrendingDown className="w-4 h-4 text-[hsl(var(--critical-red))]" />
      case "stable":
        return <Minus className="w-4 h-4 text-[hsl(var(--warning-yellow))]" />
    }
  }

  const getStatusColor = () => {
    switch (status) {
      case "safe":
        return "text-[hsl(var(--safe-green))]"
      case "warning":
        return "text-[hsl(var(--warning-yellow))]"
      case "critical":
        return "text-[hsl(var(--critical-red))]"
    }
  }

  const stats = [
    {
      title: "Current Level",
      value: `${waterLevel.toFixed(1)}%`,
      icon: <Droplets className="w-4 h-4" />,
      color: getStatusColor(),
      trend: getTrendIcon(),
    },
    {
      title: "System Status",
      value: status.charAt(0).toUpperCase() + status.slice(1),
      icon: <Wifi className="w-4 h-4" />,
      color: getStatusColor(),
    },
    {
      title: "Last Update",
      value: lastUpdate.toLocaleTimeString(),
      icon: <Clock className="w-4 h-4" />,
      color: "text-foreground",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className={stat.color}>{stat.icon}</div>
                {stat.trend}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
