import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/supabaseClient"; // Adjusted import
import { NavBar } from "@/components/NavBar";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setIsAuthenticated(!!session);
        };

        checkAuth();

        const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
            setIsAuthenticated(!!session);
        });

        return () => subscription?.unsubscribe();
    }, []);

    if (isAuthenticated === null) {
        return _jsx("div", { children: "Loading..." });
    }

    return isAuthenticated ? (
        _jsxs(_Fragment, { children: [
            _jsx(NavBar, {}),
            _jsx("div", { className: "pt-16", children: children })
        ] })
    ) : (
        _jsx(Navigate, { to: "/login" })
    );
};

const App = () => (
    _jsx(QueryClientProvider, { client: queryClient, children: 
        _jsxs(TooltipProvider, { children: [
            _jsx(Toaster, {}),
            _jsx(Sonner, {}),
            _jsx(BrowserRouter, { children: 
                _jsxs(Routes, { children: [
                    _jsx(Route, { path: "/login", element: _jsx(Login, {}) }),
                    _jsx(Route, { path: "/", element: _jsx(ProtectedRoute, { children: _jsx(Index, {}) }) }),
                    _jsx(Route, { path: "/dashboard", element: _jsx(ProtectedRoute, { children: _jsx(Dashboard, {}) }) })
                ] })
            })
        ] })
    })
);

export default App;