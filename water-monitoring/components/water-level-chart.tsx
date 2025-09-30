import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine } from "recharts"

interface WaterLevelChartProps {
  data: Array<{
    time: string
    level: number
    status: "safe" | "warning" | "critical"
  }>
}

export function WaterLevelChart({ data }: WaterLevelChartProps) {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Water Level Trend</CardTitle>
        <p className="text-sm text-muted-foreground">Last 12 hours</p>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={[0, 100]} />
              {/* Reference lines for thresholds */}
              <ReferenceLine y={80} stroke="hsl(var(--critical-red))" strokeDasharray="5 5" />
              <ReferenceLine y={20} stroke="hsl(var(--critical-red))" strokeDasharray="5 5" />
              <ReferenceLine y={70} stroke="hsl(var(--warning-yellow))" strokeDasharray="3 3" />
              <ReferenceLine y={30} stroke="hsl(var(--warning-yellow))" strokeDasharray="3 3" />

              <Line
                type="monotone"
                dataKey="level"
                stroke="hsl(var(--water-blue))"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--water-blue))", strokeWidth: 2, r: 3 }}
                activeDot={{ r: 5, fill: "hsl(var(--water-blue))" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-px bg-[hsl(var(--critical-red))]"></div>
            <span className="text-muted-foreground">Critical (80%/20%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-px bg-[hsl(var(--warning-yellow))]"></div>
            <span className="text-muted-foreground">Warning (70%/30%)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
