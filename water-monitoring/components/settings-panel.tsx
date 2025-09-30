"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Settings, Save } from "lucide-react"
import { useState } from "react"

interface SettingsPanelProps {
  settings: {
    criticalHigh: number
    criticalLow: number
    warningHigh: number
    warningLow: number
    alertsEnabled: boolean
    autoNotify: boolean
  }
  onSave: (settings: any) => void
}

export function SettingsPanel({ settings, onSave }: SettingsPanelProps) {
  const [localSettings, setLocalSettings] = useState(settings)

  const handleSave = () => {
    onSave(localSettings)
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Settings className="w-5 h-5" />
          System Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Threshold Settings */}
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">Alert Thresholds</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="criticalHigh">Critical High (%)</Label>
              <Input
                id="criticalHigh"
                type="number"
                value={localSettings.criticalHigh}
                onChange={(e) =>
                  setLocalSettings({
                    ...localSettings,
                    criticalHigh: Number(e.target.value),
                  })
                }
                className="bg-input border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="criticalLow">Critical Low (%)</Label>
              <Input
                id="criticalLow"
                type="number"
                value={localSettings.criticalLow}
                onChange={(e) =>
                  setLocalSettings({
                    ...localSettings,
                    criticalLow: Number(e.target.value),
                  })
                }
                className="bg-input border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="warningHigh">Warning High (%)</Label>
              <Input
                id="warningHigh"
                type="number"
                value={localSettings.warningHigh}
                onChange={(e) =>
                  setLocalSettings({
                    ...localSettings,
                    warningHigh: Number(e.target.value),
                  })
                }
                className="bg-input border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="warningLow">Warning Low (%)</Label>
              <Input
                id="warningLow"
                type="number"
                value={localSettings.warningLow}
                onChange={(e) =>
                  setLocalSettings({
                    ...localSettings,
                    warningLow: Number(e.target.value),
                  })
                }
                className="bg-input border-border"
              />
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">Notifications</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="alertsEnabled">Enable Alerts</Label>
              <Switch
                id="alertsEnabled"
                checked={localSettings.alertsEnabled}
                onCheckedChange={(checked) =>
                  setLocalSettings({
                    ...localSettings,
                    alertsEnabled: checked,
                  })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="autoNotify">Auto-notify Manager</Label>
              <Switch
                id="autoNotify"
                checked={localSettings.autoNotify}
                onCheckedChange={(checked) =>
                  setLocalSettings({
                    ...localSettings,
                    autoNotify: checked,
                  })
                }
              />
            </div>
          </div>
        </div>

        <Button onClick={handleSave} className="w-full">
          <Save className="w-4 h-4 mr-2" />
          Save Settings
        </Button>
      </CardContent>
    </Card>
  )
}
