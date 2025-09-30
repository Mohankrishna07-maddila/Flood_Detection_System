"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, CheckCircle, XCircle, Bell, Phone, Mail } from "lucide-react"

interface Alert {
  id: string
  type: "safe" | "warning" | "critical"
  message: string
  timestamp: Date
  acknowledged: boolean
}

interface AlertPanelProps {
  alerts: Alert[]
  onAcknowledge: (id: string) => void
  onNotifyManager: () => void
}

export function AlertPanel({ alerts, onAcknowledge, onNotifyManager }: AlertPanelProps) {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case "safe":
        return <CheckCircle className="w-4 h-4" />
      case "warning":
        return <AlertTriangle className="w-4 h-4" />
      case "critical":
        return <XCircle className="w-4 h-4" />
    }
  }

  const getAlertColor = (type: string) => {
    switch (type) {
      case "safe":
        return "bg-[hsl(var(--safe-green))]/10 text-[hsl(var(--safe-green))] border-[hsl(var(--safe-green))]/20"
      case "warning":
        return "bg-[hsl(var(--warning-yellow))]/10 text-[hsl(var(--warning-yellow))] border-[hsl(var(--warning-yellow))]/20"
      case "critical":
        return "bg-[hsl(var(--critical-red))]/10 text-[hsl(var(--critical-red))] border-[hsl(var(--critical-red))]/20"
    }
  }

  const criticalAlerts = alerts.filter((a) => a.type === "critical" && !a.acknowledged)

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Alert System
          </CardTitle>
          {criticalAlerts.length > 0 && (
            <Badge className="bg-[hsl(var(--critical-red))]/10 text-[hsl(var(--critical-red))] animate-pulse">
              {criticalAlerts.length} Critical
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Emergency Actions */}
        {criticalAlerts.length > 0 && (
          <div className="p-4 bg-[hsl(var(--critical-red))]/5 border border-[hsl(var(--critical-red))]/20 rounded-lg">
            <h4 className="font-semibold text-[hsl(var(--critical-red))] mb-2">Emergency Response Required</h4>
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={onNotifyManager}
                className="bg-[hsl(var(--critical-red))] hover:bg-[hsl(var(--critical-red))]/90"
              >
                <Phone className="w-3 h-3 mr-1" />
                Call Manager
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={onNotifyManager}
                className="border-[hsl(var(--critical-red))]/20 text-[hsl(var(--critical-red))] bg-transparent"
              >
                <Mail className="w-3 h-3 mr-1" />
                Send Alert
              </Button>
            </div>
          </div>
        )}

        {/* Alert List */}
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {alerts.slice(0, 10).map((alert) => (
            <div
              key={alert.id}
              className={`p-3 rounded-lg border ${getAlertColor(alert.type)} ${alert.acknowledged ? "opacity-60" : ""}`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2 flex-1">
                  {getAlertIcon(alert.type)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{alert.message}</p>
                    <p className="text-xs opacity-70 mt-1">{alert.timestamp.toLocaleString()}</p>
                  </div>
                </div>
                {!alert.acknowledged && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onAcknowledge(alert.id)}
                    className="text-xs h-6 px-2"
                  >
                    Ack
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        {alerts.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <CheckCircle className="w-8 h-8 mx-auto mb-2 text-[hsl(var(--safe-green))]" />
            <p>All systems normal</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
