"use client"

import { useState, useEffect } from "react"

interface Alert {
  id: string
  type: "safe" | "warning" | "critical"
  message: string
  timestamp: Date
  acknowledged: boolean
}

interface WaterData {
  time: string
  level: number
  status: "safe" | "warning" | "critical"
}

interface Settings {
  criticalHigh: number
  criticalLow: number
  warningHigh: number
  warningLow: number
  alertsEnabled: boolean
  autoNotify: boolean
}

export function useWaterMonitoring() {
  const [waterLevel, setWaterLevel] = useState(45.2)
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [historicalData, setHistoricalData] = useState<WaterData[]>([])
  const [settings, setSettings] = useState<Settings>({
    criticalHigh: 80,
    criticalLow: 20,
    warningHigh: 70,
    warningLow: 30,
    alertsEnabled: true,
    autoNotify: true,
  })

  // Simulate water level changes
  useEffect(() => {
    const interval = setInterval(() => {
      setWaterLevel((prev) => {
        // Simulate realistic water level fluctuations
        const change = (Math.random() - 0.5) * 2
        const newLevel = Math.max(0, Math.min(100, prev + change))

        // Update historical data
        const now = new Date()
        const timeStr = now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
        })

        setHistoricalData((prevData) => {
          const newData = [
            ...prevData,
            {
              time: timeStr,
              level: newLevel,
              status: getStatus(newLevel),
            },
          ].slice(-50) // Keep last 50 data points
          return newData
        })

        return newLevel
      })
    }, 3000) // Update every 3 seconds

    return () => clearInterval(interval)
  }, [])

  // Generate alerts based on water level
  useEffect(() => {
    const status = getStatus(waterLevel)
    const now = new Date()

    if (settings.alertsEnabled) {
      let alertMessage = ""

      if (waterLevel >= settings.criticalHigh) {
        alertMessage = `CRITICAL: Water level extremely high at ${waterLevel.toFixed(1)}% - Flood risk!`
      } else if (waterLevel <= settings.criticalLow) {
        alertMessage = `CRITICAL: Water level critically low at ${waterLevel.toFixed(1)}% - Supply shortage!`
      } else if (waterLevel >= settings.warningHigh) {
        alertMessage = `WARNING: Water level high at ${waterLevel.toFixed(1)}% - Monitor closely`
      } else if (waterLevel <= settings.warningLow) {
        alertMessage = `WARNING: Water level low at ${waterLevel.toFixed(1)}% - Check supply`
      }

      if (alertMessage) {
        const alertId = `alert-${now.getTime()}`
        const newAlert: Alert = {
          id: alertId,
          type: status,
          message: alertMessage,
          timestamp: now,
          acknowledged: false,
        }

        setAlerts((prev) => {
          // Avoid duplicate alerts for same level
          const lastAlert = prev[0]
          if (lastAlert && lastAlert.type === status && now.getTime() - lastAlert.timestamp.getTime() < 30000) {
            return prev
          }
          return [newAlert, ...prev].slice(0, 20) // Keep last 20 alerts
        })
      }
    }
  }, [waterLevel, settings])

  const getStatus = (level: number): "safe" | "warning" | "critical" => {
    if (level >= settings.criticalHigh || level <= settings.criticalLow) {
      return "critical"
    } else if (level >= settings.warningHigh || level <= settings.warningLow) {
      return "warning"
    }
    return "safe"
  }

  const getTrend = (): "up" | "down" | "stable" => {
    if (historicalData.length < 2) return "stable"
    const recent = historicalData.slice(-5)
    const avg = recent.reduce((sum, d) => sum + d.level, 0) / recent.length
    const diff = waterLevel - avg

    if (diff > 1) return "up"
    if (diff < -1) return "down"
    return "stable"
  }

  const acknowledgeAlert = (alertId: string) => {
    setAlerts((prev) => prev.map((alert) => (alert.id === alertId ? { ...alert, acknowledged: true } : alert)))
  }

  const notifyManager = () => {
    // Simulate manager notification
    const notification = {
      id: `notification-${Date.now()}`,
      type: "safe" as const,
      message: "Manager has been notified via SMS and email",
      timestamp: new Date(),
      acknowledged: false,
    }
    setAlerts((prev) => [notification, ...prev])
  }

  const updateSettings = (newSettings: Settings) => {
    setSettings(newSettings)
  }

  return {
    waterLevel,
    status: getStatus(waterLevel),
    trend: getTrend(),
    alerts,
    historicalData,
    settings,
    acknowledgeAlert,
    notifyManager,
    updateSettings,
    lastUpdate: new Date(),
  }
}
