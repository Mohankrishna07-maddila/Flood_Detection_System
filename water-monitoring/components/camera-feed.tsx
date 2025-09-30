import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Camera, Wifi, Circle } from "lucide-react"

interface CameraFeedProps {
  waterLevel: number
  status: "safe" | "warning" | "critical"
}

export function CameraFeed({ waterLevel, status }: CameraFeedProps) {
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

  const getStatusBg = () => {
    switch (status) {
      case "safe":
        return "bg-[hsl(var(--safe-green))]/10 text-[hsl(var(--safe-green))]"
      case "warning":
        return "bg-[hsl(var(--warning-yellow))]/10 text-[hsl(var(--warning-yellow))]"
      case "critical":
        return "bg-[hsl(var(--critical-red))]/10 text-[hsl(var(--critical-red))]"
    }
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Camera className="w-5 h-5" />
            Live Camera Feed
          </CardTitle>
          <div className="flex items-center gap-2">
            <Circle className="w-2 h-2 fill-[hsl(var(--safe-green))] text-[hsl(var(--safe-green))]" />
            <span className="text-xs text-muted-foreground">Live</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Camera Feed Simulation */}
        <div className="relative bg-gradient-to-b from-slate-800 to-slate-900 rounded-lg overflow-hidden h-64">
          {/* Sky/Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-700 to-slate-800"></div>

          {/* Water Level Visualization */}
          <div
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[hsl(var(--water-blue))] to-[hsl(var(--water-blue))]/70 transition-all duration-1000"
            style={{ height: `${waterLevel}%` }}
          >
            {/* Water surface animation */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
          </div>

          {/* Reference Scale */}
          <div className="absolute right-4 top-4 bottom-4 w-8 bg-white/10 rounded">
            {[100, 80, 60, 40, 20, 0].map((mark) => (
              <div
                key={mark}
                className="absolute right-0 w-full flex items-center justify-end pr-2"
                style={{ bottom: `${mark}%` }}
              >
                <div className="w-2 h-px bg-white/50"></div>
                <span className="text-xs text-white/70 ml-1">{mark}</span>
              </div>
            ))}
          </div>

          {/* Status Overlay */}
          <div className="absolute top-4 left-4">
            <Badge className={getStatusBg()}>{status.toUpperCase()}</Badge>
          </div>
        </div>

        {/* Camera Info */}
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <div className="text-muted-foreground">Water Level</div>
            <div className={`font-semibold ${getStatusColor()}`}>{waterLevel.toFixed(1)}%</div>
          </div>
          <div>
            <div className="text-muted-foreground">Connection</div>
            <div className="flex items-center gap-1 text-[hsl(var(--safe-green))]">
              <Wifi className="w-3 h-3" />
              Strong
            </div>
          </div>
          <div>
            <div className="text-muted-foreground">Resolution</div>
            <div className="text-foreground">1920x1080</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
