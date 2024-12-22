import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

interface PortfolioValueChartProps {
  data: Array<{
    date: string;
    value: number;
  }>;
}

export function PortfolioValueChart({ data }: PortfolioValueChartProps) {
  console.log("PortfolioValueChart - Raw Data:", data);

  const formattedData = React.useMemo(() => {
    return data.map((item) => ({
      ...item,
      formattedDate: format(new Date(item.date), 'MMM yyyy'),
      formattedValue: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(item.value),
    }));
  }, [data]);

  console.log("PortfolioValueChart - Formatted Data:", formattedData);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Portfolio Value Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={formattedData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="formattedDate"
                tick={{ fill: '#888888' }}
              />
              <YAxis
                tick={{ fill: '#888888' }}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
              />
              <Tooltip
                formatter={(value: number) => [
                  new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }).format(value),
                  "Value"
                ]}
                labelFormatter={(label) => label}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#8884d8"
                strokeWidth={2}
                dot={{ fill: '#8884d8' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}