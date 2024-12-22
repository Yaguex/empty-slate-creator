import { format } from "date-fns";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ChartData {
  date: string; // Date string in YYYY-MM-DD format
  value: number;
}

interface Props {
  data: ChartData[];
}

export const PortfolioValueChart = ({ data }: Props) => {
  console.log("PortfolioValueChart - Initial data:", data);

  if (!data || !data.length) {
    console.warn("PortfolioValueChart - No data to display.");
    return <div>No data available to display.</div>;
  }

  // Sort data in ascending order (oldest to newest)
  const sortedData = [...data].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  console.log("PortfolioValueChart - Sorted data (ascending):", sortedData);

  // Enrich data with formatted labels
  const enrichedData = sortedData.map((point) => {
    const dateObj = new Date(point.date);
    return {
      ...point,
      formattedDate: format(dateObj, "MMM yyyy"),
      formattedValue: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(point.value),
    };
  });
  console.log("PortfolioValueChart - Enriched Data:", enrichedData);

  // Calculate Y-axis domain with padding
  const maxValue = Math.max(...enrichedData.map((d) => d.value));
  const minValue = Math.min(...enrichedData.map((d) => d.value));
  const padding = (maxValue - minValue) * 0.1;
  const yDomain = [minValue - padding, maxValue + padding];

  // Custom Tooltip Component
  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: any }) => {
    if (!active || !payload?.[0]) return null;

    const data = payload[0].payload;

    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 min-w-[200px]">
        <div className="space-y-2">
          <p className="text-sm font-medium">{data.formattedDate}</p>
          <p className="text-sm">Value: {data.formattedValue}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-[400px] mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={enrichedData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis
            dataKey="formattedDate"
            stroke="rgb(100 116 139)"
            fontSize={12}
            type="category"
          />
          <YAxis
            stroke="rgb(100 116 139)"
            fontSize={12}
            tickFormatter={(value) =>
              new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                notation: "compact",
                maximumFractionDigits: 1,
              }).format(value)
            }
            domain={yDomain}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#2563eb"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};