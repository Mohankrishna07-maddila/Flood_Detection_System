"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { CameraFeed } from "@/components/camera-feed"
import { AlertPanel } from "@/components/alert-panel"
import { StatsOverview } from "@/components/stats-overview"
import { WaterLevelChart } from "@/components/water-level-chart"
import { SettingsPanel } from "@/components/settings-panel"
import { useWaterMonitoring } from "@/hooks/use-water-monitoring"

export default function WaterMonitoringDashboard() {
  const [activeSection, setActiveSection] = useState("overview")
  const {
    waterLevel,
    status,
    trend,
    alerts,
    historicalData,
    settings,
    acknowledgeAlert,
    notifyManager,
    updateSettings,
    lastUpdate,
  } = useWaterMonitoring()

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return (
          <div className="space-y-6">
            <StatsOverview waterLevel={waterLevel} status={status} trend={trend} lastUpdate={lastUpdate} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CameraFeed waterLevel={waterLevel} status={status} />
              <AlertPanel alerts={alerts} onAcknowledge={acknowledgeAlert} onNotifyManager={notifyManager} />
            </div>
            <WaterLevelChart data={historicalData} />
          </div>
        )
      case "camera":
        return (
          <div className="space-y-6">
            <CameraFeed waterLevel={waterLevel} status={status} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-card p-4 rounded-lg border border-border">
                <h3 className="font-semibold mb-2">Camera Settings</h3>
                <div className="space-y-2 text-sm">
                  <div>Resolution: 1920x1080</div>
                  <div>Frame Rate: 30 FPS</div>
                  <div>Night Vision: Enabled</div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg border border-border">
                <h3 className="font-semibold mb-2">Detection Zone</h3>
                <div className="space-y-2 text-sm">
                  <div>Reference Scale: Active</div>
                  <div>Calibration: Complete</div>
                  <div>Accuracy: ±0.5%</div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg border border-border">
                <h3 className="font-semibold mb-2">Processing</h3>
                <div className="space-y-2 text-sm">
                  <div>Algorithm: OpenCV</div>
                  <div>Update Rate: 3s</div>
                  <div>CPU Usage: 12%</div>
                </div>
              </div>
            </div>
          </div>
        )
      case "alerts":
        return (
          <div className="space-y-6">
            <AlertPanel alerts={alerts} onAcknowledge={acknowledgeAlert} onNotifyManager={notifyManager} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="font-semibold mb-4">Alert Thresholds</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Critical High:</span>
                    <span className="text-[hsl(var(--critical-red))]">{settings.criticalHigh}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Warning High:</span>
                    <span className="text-[hsl(var(--warning-yellow))]">{settings.warningHigh}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Warning Low:</span>
                    <span className="text-[hsl(var(--warning-yellow))]">{settings.warningLow}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Critical Low:</span>
                    <span className="text-[hsl(var(--critical-red))]">{settings.criticalLow}%</span>
                  </div>
                </div>
              </div>
              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="font-semibold mb-4">Notification Methods</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>SMS Alerts:</span>
                    <span className="text-[hsl(var(--safe-green))]">Active</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Email Notifications:</span>
                    <span className="text-[hsl(var(--safe-green))]">Active</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Push Notifications:</span>
                    <span className="text-[hsl(var(--safe-green))]">Active</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Auto Manager Call:</span>
                    <span className="text-[hsl(var(--safe-green))]">Enabled</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case "analytics":
        return (
          <div className="space-y-6">
            <WaterLevelChart data={historicalData} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="font-semibold mb-4">24h Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Average Level:</span>
                    <span>42.3%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Peak Level:</span>
                    <span>67.8%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Lowest Level:</span>
                    <span>28.1%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Alerts Triggered:</span>
                    <span>{alerts.length}</span>
                  </div>
                </div>
              </div>
              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="font-semibold mb-4">System Health</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Uptime:</span>
                    <span className="text-[hsl(var(--safe-green))]">99.8%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Data Quality:</span>
                    <span className="text-[hsl(var(--safe-green))]">Excellent</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Connection:</span>
                    <span className="text-[hsl(var(--safe-green))]">Stable</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Maintenance:</span>
                    <span>2 days ago</span>
                  </div>
                </div>
              </div>
              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="font-semibold mb-4">Predictions</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Next Hour:</span>
                    <span className="text-[hsl(var(--safe-green))]">Stable</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Next 6 Hours:</span>
                    <span className="text-[hsl(var(--warning-yellow))]">Rising</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Weather Impact:</span>
                    <span>Low</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Risk Level:</span>
                    <span className="text-[hsl(var(--safe-green))]">Low</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case "settings":
        return (
          <div className="max-w-2xl">
            <SettingsPanel settings={settings} onSave={updateSettings} />
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
            </h1>
            <p className="text-muted-foreground">Real-time water level monitoring and alert system</p>
          </div>
          {renderContent()}
        </div>
      </main>
    </div>
  )
}
