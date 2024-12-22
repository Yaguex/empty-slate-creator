import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { TableHead, TableHeader, TableRow, } from "@/components/ui/table";
export function PortfolioTableHeader() {
    return (_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: "Date" }), _jsx(TableHead, { className: "text-right", children: "Portfolio Value" }), _jsx(TableHead, { className: "text-right", children: "Net Flow" }), _jsx(TableHead, { className: "text-right", children: "MoM Gain" }), _jsx(TableHead, { className: "text-right", children: "MoM Return" }), _jsx(TableHead, { className: "text-right", children: "YTD Gain" }), _jsx(TableHead, { className: "text-right", children: "YTD Return" }), _jsx(TableHead, { className: "w-[100px]" })] }) }));
}
