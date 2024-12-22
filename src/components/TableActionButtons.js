import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger, } from "@/components/ui/tooltip";
export function TableActionButtons({ onEdit }) {
    return (_jsx("div", { className: "invisible group-hover:visible absolute right-4 top-1/2 -translate-y-1/2 flex gap-2", children: _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, children: _jsx(Button, { variant: "ghost", size: "icon", className: "h-8 w-8 text-blue-500 hover:text-blue-700", onClick: onEdit, children: _jsx(Edit2, { className: "h-4 w-4" }) }) }), _jsx(TooltipContent, { children: _jsx("p", { children: "Edit row" }) })] }) }));
}
