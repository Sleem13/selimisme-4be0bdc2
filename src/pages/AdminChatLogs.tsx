import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, ChevronLeft, ChevronRight, MessageSquare, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface ChatLog {
  id: string;
  session_id: string;
  user_message: string;
  assistant_response: string | null;
  created_at: string;
}

const AdminChatLogs = () => {
  const [logs, setLogs] = useState<ChatLog[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const pageSize = 20;

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page) });
      if (search) params.set("search", search);

      const { data, error } = await supabase.functions.invoke("chat-logs", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        body: undefined,
      });

      // supabase.functions.invoke doesn't support query params easily, use fetch
      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat-logs?${params.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch logs");
      const result = await res.json();
      setLogs(result.logs || []);
      setTotal(result.total || 0);
    } catch (e) {
      console.error("Failed to fetch chat logs:", e);
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const handleSearch = () => {
    setPage(1);
    setSearch(searchInput);
  };

  const totalPages = Math.ceil(total / pageSize);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const truncate = (text: string | null, len = 80) => {
    if (!text) return "—";
    return text.length > len ? text.slice(0, len) + "…" : text;
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <MessageSquare className="h-6 w-6 text-primary" />
              Chatbot Logs
            </h1>
            <p className="text-sm text-muted-foreground">
              {total} conversation{total !== 1 ? "s" : ""} logged
            </p>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search messages, responses, or session IDs..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="pl-9"
                />
              </div>
              <Button onClick={handleSearch}>Search</Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="w-full">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[160px]">Time</TableHead>
                    <TableHead className="w-[140px]">Session</TableHead>
                    <TableHead>User Message</TableHead>
                    <TableHead>AI Response</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                        Loading…
                      </TableCell>
                    </TableRow>
                  ) : logs.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                        No logs found
                      </TableCell>
                    </TableRow>
                  ) : (
                    logs.map((log) => (
                      <TableRow
                        key={log.id}
                        className="cursor-pointer"
                        onClick={() => setExpandedId(expandedId === log.id ? null : log.id)}
                      >
                        <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                          {formatDate(log.created_at)}
                        </TableCell>
                        <TableCell className="font-mono text-xs text-muted-foreground">
                          {log.session_id.slice(0, 8)}…
                        </TableCell>
                        <TableCell className="max-w-[300px]">
                          <p className={expandedId === log.id ? "" : "line-clamp-2"}>
                            {log.user_message}
                          </p>
                        </TableCell>
                        <TableCell className="max-w-[300px]">
                          <p className={expandedId === log.id ? "" : "line-clamp-2"}>
                            {log.assistant_response || "—"}
                          </p>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </ScrollArea>

            {totalPages > 1 && (
              <div className="flex items-center justify-between px-4 py-3 border-t">
                <p className="text-sm text-muted-foreground">
                  Page {page} of {totalPages}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page <= 1}
                    onClick={() => setPage((p) => p - 1)}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page >= totalPages}
                    onClick={() => setPage((p) => p + 1)}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminChatLogs;
