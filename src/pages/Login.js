import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/supabaseClient"; // Adjusted import
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Auth } from "@supabase/auth-ui-react";
const Login = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                navigate("/");
            }
        };
        checkUser();
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session) {
                navigate("/");
            }
        });
        return () => subscription.unsubscribe();
    }, [navigate]);
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "max-w-md w-full space-y-8", children: [_jsxs("div", { children: [_jsx("h2", { className: "mt-6 text-center text-3xl font-extrabold text-gray-900", children: "Welcome to Portfolio Tracker!" }), _jsx("p", { className: "mt-2 text-center text-sm text-gray-600", children: "Sign in to manage your investment portfolio" })] }), _jsx("div", { className: "mt-8", children: _jsx(Auth, { supabaseClient: supabase, appearance: {
                            theme: ThemeSupa,
                            extend: true,
                            className: {
                                message: 'text-red-600 text-sm',
                                button: 'bg-green-500 hover:bg-green-600 text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-300',
                                input: 'bg-white text-gray-900 border-gray-300',
                                label: 'text-gray-700'
                            }
                        }, theme: "light", localization: {
                            variables: {
                                sign_up: {
                                    password_label: 'Password (minimum 6 characters)',
                                    email_label: 'Email',
                                    button_label: 'Sign up',
                                    password_input_placeholder: 'Your password (min 6 characters)',
                                },
                                sign_in: {
                                    password_label: 'Password',
                                    email_label: 'Email',
                                }
                            }
                        }, providers: [] }) }), _jsx("div", { className: "mt-4", children: _jsxs("p", { className: "text-sm text-gray-500 text-center", children: ["Password requirements:", _jsx("br", {}), "\u2022 Minimum 6 characters"] }) })] }) }));
};
export default Login;
