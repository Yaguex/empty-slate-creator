import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Investment } from "@/types/portfolio";

interface PortfolioChartProps {
  investments: Investment[];
}

export function PortfolioChart({ investments }: PortfolioChartProps) {
  const data = investments.map((investment) => ({
    name: investment.symbol,
    value: investment.quantity * investment.currentPrice,
  }));

  const COLORS = ['#9b87f5', '#7E69AB', '#6E59A5', '#D6BCFA', '#E5DEFF'];

  return (
    <Card className="card-gradient h-[400px]">
      <CardHeader>
        <CardTitle>Portfolio Allocation</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}