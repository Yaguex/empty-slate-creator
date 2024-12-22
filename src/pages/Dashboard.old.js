import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MetricsCard } from "@/components/MetricsCard";
import { PortfolioHistoryTable } from "@/components/PortfolioHistoryTable";
import { PortfolioValueChart } from "@/components/PortfolioValueChart";
const MOCK_DATA = {
    portfolioValue: 125000,
    historicalValues: [
        { date: '2024-04', value: 125000 },
        { date: '2024-03', value: 122000 },
        { date: '2024-02', value: 118000 },
        { date: '2024-01', value: 115000 },
        { date: '2023-12', value: 110000 },
        { date: '2023-11', value: 105000 },
        { date: '2023-10', value: 100000 },
        { date: '2023-09', value: 98000 },
        { date: '2023-08', value: 95000 },
        { date: '2023-07', value: 90000 },
        { date: '2023-06', value: 87500 },
        { date: '2023-05', value: 85000 },
        { date: '2023-04', value: 65000 },
        { date: '2023-03', value: 62000 },
        { date: '2023-02', value: 60000 },
        { date: '2023-01', value: 58000 },
        { date: '2022-12', value: 55000 },
        { date: '2022-11', value: 52000 },
        { date: '2022-10', value: 50000 },
        { date: '2022-09', value: 48000 },
        { date: '2022-08', value: 45000 },
        { date: '2022-07', value: 42000 },
        { date: '2022-06', value: 40000 },
        { date: '2022-05', value: 38000 },
        { date: '2022-04', value: 35000 },
        { date: '2022-03', value: 32000 },
        { date: '2022-02', value: 30000 },
        { date: '2022-01', value: 28000 },
        { date: '2021-12', value: 25000 },
        { date: '2021-11', value: 22000 },
        { date: '2021-10', value: 20000 },
        { date: '2021-09', value: 18000 },
        { date: '2021-08', value: 15000 },
        { date: '2021-07', value: 12000 },
    ]
};
const Dashboard = () => {
    // Get the latest month's data (first entry in sorted data)
    const latestMonthData = [...MOCK_DATA.historicalValues]
        .sort((a, b) => b.date.localeCompare(a.date))[0];
    // Calculate YTD values for the latest month
    const startOfYearValue = MOCK_DATA.historicalValues.find(entry => entry.date === `${new Date().getFullYear()}-01`)?.value ?? latestMonthData.value;
    const ytdGain = latestMonthData.value - startOfYearValue;
    const ytdReturn = ((ytdGain / startOfYearValue) * 100);
    return (_jsxs("div", { className: "container mx-auto py-4 px-4", children: [_jsx("h1", { className: "text-4xl font-bold mb-8", children: "Dashboard" }), _jsxs("div", { className: "grid gap-4 md:grid-cols-3 mb-8", children: [_jsx(MetricsCard, { title: "Portfolio Value", value: `$${MOCK_DATA.portfolioValue.toLocaleString()}` }), _jsx(MetricsCard, { title: "YTD Gain", value: `${ytdGain >= 0 ? '+' : '-'}$${Math.abs(ytdGain).toLocaleString()}`, trend: ytdGain >= 0 ? "up" : "down", valueColor: ytdGain >= 0 ? "text-green-600" : "text-red-600" }), _jsx(MetricsCard, { title: "YTD Return", value: `${ytdReturn >= 0 ? '+' : ''}${ytdReturn.toFixed(2)}%`, trend: ytdReturn >= 0 ? "up" : "down", valueColor: ytdReturn >= 0 ? "text-green-600" : "text-red-600" })] }), _jsx("div", { className: "mb-8", children: _jsx(PortfolioValueChart, { data: MOCK_DATA.historicalValues }) }), _jsx("div", { className: "mb-8", children: _jsx(PortfolioHistoryTable, { data: MOCK_DATA.historicalValues }) })] }));
};
export default Dashboard;
