import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
export function InvestmentsList({ investments }) {
    return (_jsxs(Card, { className: "card-gradient", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Investments" }) }), _jsx(CardContent, { children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: "Symbol" }), _jsx(TableHead, { children: "Name" }), _jsx(TableHead, { children: "Quantity" }), _jsx(TableHead, { children: "Purchase Price" }), _jsx(TableHead, { children: "Current Price" }), _jsx(TableHead, { children: "Total Value" }), _jsx(TableHead, { children: "Gain/Loss" })] }) }), _jsx(TableBody, { children: investments.map((investment) => {
                                const totalValue = investment.quantity * investment.currentPrice;
                                const gainLoss = totalValue - (investment.quantity * investment.purchasePrice);
                                const gainLossPercent = (gainLoss / (investment.quantity * investment.purchasePrice)) * 100;
                                return (_jsxs(TableRow, { children: [_jsx(TableCell, { className: "font-medium", children: investment.symbol }), _jsx(TableCell, { children: investment.name }), _jsx(TableCell, { children: investment.quantity }), _jsxs(TableCell, { children: ["$", investment.purchasePrice.toFixed(2)] }), _jsxs(TableCell, { children: ["$", investment.currentPrice.toFixed(2)] }), _jsxs(TableCell, { children: ["$", totalValue.toFixed(2)] }), _jsxs(TableCell, { className: gainLoss >= 0 ? "text-green-500" : "text-red-500", children: ["$", gainLoss.toFixed(2), " (", gainLossPercent.toFixed(2), "%)"] })] }, investment.id));
                            }) })] }) })] }));
}
