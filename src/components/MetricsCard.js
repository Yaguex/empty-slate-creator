import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card } from "@/components/ui/card";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
export function MetricsCard({ title, value, trend, valueColor }) {
    return (_jsxs(Card, { className: "card-gradient p-6", children: [_jsx("h3", { className: "text-sm font-medium text-muted-foreground", children: title }), _jsxs("div", { className: "mt-2 flex items-center justify-between", children: [_jsx("div", { className: `text-2xl font-bold ${valueColor}`, children: value }), trend && (_jsx("div", { className: `flex items-center ${trend === "up" ? "text-green-600" : "text-red-600"}`, children: trend === "up" ? (_jsx(ArrowUpIcon, { className: "h-4 w-4" })) : (_jsx(ArrowDownIcon, { className: "h-4 w-4" })) }))] })] }));
}
