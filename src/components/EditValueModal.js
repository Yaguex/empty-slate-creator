import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
export function EditValueModal({ isOpen, onClose, onSave, initialValue, initialNetFlow }) {
    const [value, setValue] = useState(initialValue.toString());
    const [netFlow, setNetFlow] = useState(initialNetFlow.toString());
    const handleSave = () => {
        const numValue = parseFloat(value);
        const numNetFlow = parseFloat(netFlow);
        onSave(isNaN(numValue) ? initialValue : numValue, isNaN(numNetFlow) ? initialNetFlow : numNetFlow);
        onClose();
    };
    return (_jsx(Dialog, { open: isOpen, onOpenChange: onClose, children: _jsxs(DialogContent, { children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { children: "Edit Portfolio Values" }) }), _jsxs("div", { className: "py-4 space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("label", { htmlFor: "portfolio-value", className: "text-sm font-medium", children: "End of Month portfolio value" }), _jsx(Input, { id: "portfolio-value", type: "text", value: value, onChange: (e) => setValue(e.target.value), placeholder: "Enter portfolio value" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { htmlFor: "net-flow", className: "text-sm font-medium", children: "Net deposits and withdraws" }), _jsx(Input, { id: "net-flow", type: "text", value: netFlow, onChange: (e) => setNetFlow(e.target.value), placeholder: "Enter net deposits/withdraws" })] })] }), _jsxs(DialogFooter, { children: [_jsx(Button, { variant: "outline", onClick: onClose, children: "Cancel" }), _jsx(Button, { onClick: handleSave, children: "Save" })] })] }) }));
}
