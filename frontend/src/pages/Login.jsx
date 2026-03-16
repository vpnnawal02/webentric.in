import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
        } else {
            // Redirect to dashboard
            navigate("/admin", { replace: true });
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="max-w-md w-full space-y-8 bg-white rounded-sm border border-gray-200 p-8">
                <div>
                    <h2 className="mt-6 text-center text-2xl font-semibold text-gray-900">
                        Webentric Admin
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Sign in to your admin account
                    </p>
                </div>

                <form className="mt-8 space-y-4" onSubmit={handleLogin}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-xs border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none focus:ring-0"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-xs border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none focus:ring-0"
                            required
                        />
                    </div>

                    {error && (
                        <p className="text-red-600 text-xs text-center">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gray-900 text-white py-2 px-4 rounded-xs text-sm font-medium hover:bg-gray-800 disabled:opacity-50"
                    >
                        {loading ? "Signing in..." : "Sign in"}
                    </button>
                </form>
            </div>
        </div>
    );
}
