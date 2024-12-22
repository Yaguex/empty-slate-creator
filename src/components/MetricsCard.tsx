import { Card } from "@/components/ui/card";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

interface MetricsCardProps {
  title: string;
  value: string;
  trend?: "up" | "down";
  valueColor?: string;
}

export function MetricsCard({ title, value, trend, valueColor }: MetricsCardProps) {
  return (
    <Card className="card-gradient p-6">
      <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
      <div className="mt-2 flex items-center justify-between">
        <div className={`text-2xl font-bold ${valueColor}`}>{value}</div>
        {trend && (
          <div
            className={`flex items-center ${
              trend === "up" ? "text-green-600" : "text-red-600"
            }`}
          >
            {trend === "up" ? (
              <ArrowUpIcon className="h-4 w-4" />
            ) : (
              <ArrowDownIcon className="h-4 w-4" />
            )}
          </div>
        )}
      </div>
    </Card>
  );
}