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
    ytdReturn?: number;
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

  // Calculate domain padding (10% above max and below min)
  const domainPadding = React.useMemo(() => {
    if (!data.length) return { min: 0, max: 0 };
    
    const values = data.map(d => d.value);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    const range = maxValue - minValue;
    
    return {
      min: minValue - (range * 0.1),
      max: maxValue + (range * 0.1)
    };
  }, [data]);

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
              <CartesianGrid 
                vertical={false}
                strokeDasharray="3 3" 
              />
              <XAxis
                dataKey="formattedDate"
                tick={{ fill: '#888888', fontSize: 11 }}
              />
              <YAxis
                domain={[domainPadding.min, domainPadding.max]}
                tick={{ fill: '#888888', fontSize: 11 }}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
              />
              <Tooltip
                formatter={(value: number, name: string, props: any) => {
                  if (name === 'value') {
                    return [
                      new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }).format(value),
                      "Value"
                    ];
                  }
                  // Handle YTD Return
                  if (name === 'ytdReturn') {
                    return [`${value.toFixed(2)}%`, "YTD Return"];
                  }
                  return [value, name];
                }}
                labelFormatter={(label) => label}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#8884d8"
                strokeWidth={2}
                dot={{ fill: '#8884d8' }}
              />
              <Line
                type="monotone"
                dataKey="ytdReturn"
                stroke="transparent"
                hide={true}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}