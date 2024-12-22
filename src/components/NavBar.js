import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/supabaseClient"; // Adjusted import
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
export const NavBar = () => {
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await supabase.auth.signOut();
            toast.success("Logged out successfully");
            navigate("/login");
        }
        catch (error) {
            console.error("Error logging out:", error);
            toast.error("Error logging out");
        }
    };
    return (_jsxs("nav", { className: "fixed top-0 left-0 right-0 z-50 bg-blue-500 border-b border-blue-600 px-4 py-2 flex justify-between items-center", children: [_jsx("div", { className: "flex items-center", children: _jsx("span", { className: "text-xl font-bold text-white", children: "Investment Portfolio" }) }), _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "ghost", size: "icon", className: "text-white hover:bg-blue-600", children: _jsx(Menu, { className: "h-6 w-6" }) }) }), _jsxs(DropdownMenuContent, { align: "end", className: "w-48 bg-white", children: [_jsx(DropdownMenuItem, { onClick: () => navigate("/dashboard"), children: "Dashboard" }), _jsx(DropdownMenuItem, { onClick: () => navigate("/trade-log"), children: "Trade Log" }), _jsx(DropdownMenuItem, { onClick: () => navigate("/allocation"), children: "Allocation" }), _jsx(DropdownMenuItem, { onClick: handleLogout, children: "Logout" })] })] })] }));
};
