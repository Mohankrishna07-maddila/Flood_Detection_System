"use client"

import { Camera, Activity, Settings, AlertTriangle, BarChart3, Waves } from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const menuItems = [
    { id: "overview", label: "Overview", icon: Activity },
    { id: "camera", label: "Camera Feed", icon: Camera },
    { id: "alerts", label: "Alert System", icon: AlertTriangle },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  return (
    <div className="w-64 bg-card border-r border-border h-screen flex flex-col">
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-water-blue/20 rounded-lg flex items-center justify-center">
            <Waves className="w-5 h-5 text-[hsl(var(--water-blue))]" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">AquaWatch</h1>
            <p className="text-xs text-muted-foreground">Water Level Monitor</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                  activeSection === item.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent",
                )}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </button>
            )
          })}
        </div>
      </nav>

      <div className="p-4 border-t border-border">
        <div className="text-xs text-muted-foreground">
          <div>System Status: Online</div>
          <div>Last Update: {new Date().toLocaleTimeString()}</div>
        </div>
      </div>
    </div>
  )
}
