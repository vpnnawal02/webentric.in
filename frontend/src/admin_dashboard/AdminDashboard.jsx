import React, { useEffect, useMemo, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import StatsCards from "./StatsCards";
import SearchFilters from "./SearchFilters";
import LeadsTable from "./LeadsTable";
import LeadModal from "./LeadModal";

const STATUS_OPTIONS = ["new", "contacted", "negotiation", "closed", "lost"];

export default function AdminDashboard() {
    // 🔥 ALL HOOKS FIRST - NO EXCEPTIONS
    const navigate = useNavigate();
    const [session, setSession] = useState(null);
    const [leads, setLeads] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [selectedLead, setSelectedLead] = useState(null);
    const [loading, setLoading] = useState(true);

    // 🔥 useMemos ALWAYS RUN - even during loading
    const filteredLeads = useMemo(() => {
        if (loading || leads.length === 0) return [];
        return leads.filter((lead) => {
            const term = searchTerm.trim().toLowerCase();
            const matchesSearch =
                !term ||
                lead.name?.toLowerCase().includes(term) ||
                lead.email?.toLowerCase().includes(term) ||
                lead.phone?.toLowerCase().includes(term);
            const matchesStatus =
                statusFilter === "all" || (lead.status || "new") === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [leads, searchTerm, statusFilter, loading]);

    const stats = useMemo(() => {
        if (loading || leads.length === 0) return { total: 0, newLeads: 0, contacted: 0, closed: 0 };
        const total = leads.length;
        return {
            total,
            newLeads: leads.filter((l) => (l.status || "new") === "new").length,
            contacted: leads.filter((l) => l.status === "contacted").length,
            closed: leads.filter((l) => l.status === "closed").length,
        };
    }, [leads, loading]);

    // Auth + data
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (!session) {
                navigate("/admin/login", { replace: true });
                return;
            }
            setSession(session);

            supabase
                .from("quote_requests")
                .select("*")
                .order("created_at", { ascending: false })
                .then(({ data, error }) => {
                    if (!error && data) setLeads(data);
                    setLoading(false);
                });
        });

        // Realtime (ignore websocket error for now - doesn't break anything)
        const channel = supabase
            .channel("quote_requests")
            .on("postgres_changes", { event: "INSERT", schema: "public", table: "quote_requests" }, (payload) => {
                setLeads((prev) => [payload.new, ...prev]);
            })
            .subscribe();

        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            if (!session) navigate("/admin/login", { replace: true });
        });

        return () => {
            supabase.removeChannel(channel);
            authListener.subscription.unsubscribe();
        };
    }, [navigate]);

    const handleRefresh = useCallback(async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("quote_requests")
            .select("*")
            .order("created_at", { ascending: false });
        if (!error && data) setLeads(data);
        setLoading(false);
    }, []);

    const handleDelete = useCallback(async (id) => {
        const prev = leads;
        setLeads((current) => current.filter((lead) => lead.id !== id));
        const { error } = await supabase.from("quote_requests").delete().eq("id", id);
        if (error) setLeads(prev);
    }, [leads]);

    const handleStatusUpdate = useCallback(async (id, status) => {
        const prev = leads;
        setLeads((current) => current.map((lead) => (lead.id === id ? { ...lead, status } : lead)));
        const { error } = await supabase.from("quote_requests").update({ status }).eq("id", id);
        if (error) setLeads(prev);
    }, [leads]);

    const handleLogout = useCallback(() => {
        supabase.auth.signOut().then(() => navigate("/admin/login", { replace: true }));
    }, [navigate]);

    // 🔥 NO EARLY RETURNS - Render everything always
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            <div className="mx-auto max-w-6xl px-4 py-6">
                <header className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-semibold tracking-tight">
                            Webentric Admin Dashboard
                        </h1>
                        <p className="mt-1 text-xs text-gray-500">
                            {session?.user?.email || "Loading..."}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleRefresh}
                            disabled={loading}
                            className="inline-flex items-center rounded-sm border border-gray-300 px-2.5 py-1 text-xs font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                        >
                            {loading ? "Loading..." : "Refresh"}
                        </button>
                        <button
                            onClick={handleLogout}
                            className="inline-flex items-center rounded-sm border border-gray-300 px-2.5 py-1 text-xs font-medium text-gray-700 hover:bg-gray-100"
                        >
                            Logout
                        </button>
                    </div>
                </header>

                {loading ? (
                    <div className="text-center py-12">
                        <div className="text-lg mb-2 animate-pulse">Loading dashboard...</div>
                        <div className="text-sm text-gray-500">Please wait</div>
                    </div>
                ) : (
                    <>
                        <StatsCards stats={stats} />
                        <SearchFilters
                            searchTerm={searchTerm}
                            onSearchChange={setSearchTerm}
                            statusFilter={statusFilter}
                            onStatusFilterChange={setStatusFilter}
                            statusOptions={["all", ...STATUS_OPTIONS]}
                        />
                        <div className="mt-6">
                            <LeadsTable
                                leads={filteredLeads}
                                onView={(lead) => setSelectedLead(lead)}
                                onDelete={handleDelete}
                                onStatusChange={handleStatusUpdate}
                            />
                        </div>
                    </>
                )}
            </div>

            {selectedLead && (
                <LeadModal
                    lead={selectedLead}
                    onClose={() => setSelectedLead(null)}
                    onStatusChange={handleStatusUpdate}
                    statusOptions={STATUS_OPTIONS}
                />
            )}
        </div>
    );
}
