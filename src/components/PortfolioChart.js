import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
export function PortfolioChart({ investments }) {
    const data = investments.map((investment) => ({
        name: investment.symbol,
        value: investment.quantity * investment.currentPrice,
    }));
    const COLORS = ['#9b87f5', '#7E69AB', '#6E59A5', '#D6BCFA', '#E5DEFF'];
    return (_jsxs(Card, { className: "card-gradient h-[400px]", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Portfolio Allocation" }) }), _jsx(CardContent, { children: _jsx(ResponsiveContainer, { width: "100%", height: 300, children: _jsxs(PieChart, { children: [_jsx(Pie, { data: data, cx: "50%", cy: "50%", labelLine: false, outerRadius: 100, fill: "#8884d8", dataKey: "value", children: data.map((entry, index) => (_jsx(Cell, { fill: COLORS[index % COLORS.length] }, `cell-${index}`))) }), _jsx(Tooltip, {}), _jsx(Legend, {})] }) }) })] }));
}
