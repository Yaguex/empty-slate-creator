import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
export function AddTransactionModal({ isOpen, onClose, onSave }) {
    const [value, setValue] = useState('');
    const handleSave = () => {
        const numValue = parseFloat(value);
        onSave(isNaN(numValue) ? 0 : numValue);
        onClose();
    };
    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setValue(inputValue);
    };
    return (_jsx(Dialog, { open: isOpen, onOpenChange: onClose, children: _jsxs(DialogContent, { children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { children: "Deposit or Withdraw cash" }) }), _jsx("div", { className: "py-4", children: _jsx(Input, { type: "text", value: value, onChange: handleInputChange, placeholder: "Enter amount (negative for withdrawal)" }) }), _jsxs(DialogFooter, { children: [_jsx(Button, { variant: "outline", onClick: onClose, children: "Cancel" }), _jsx(Button, { onClick: handleSave, children: "Save" })] })] }) }));
}
