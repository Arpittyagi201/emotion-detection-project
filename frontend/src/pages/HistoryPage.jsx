import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

const typeColors = {
  text: "bg-emerald-500/20 text-emerald-300 ring-emerald-500/40",
  voice: "bg-cyan-500/20 text-cyan-300 ring-cyan-500/40",
  image: "bg-fuchsia-500/20 text-fuchsia-300 ring-fuchsia-500/40"
};

const HistoryPage = () => {
  const { api } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    api
      .get("/detection/history")
      .then((res) => {
        if (!isMounted) return;
        if (res.data && res.data.success) {
          setItems(res.data.data || []);
        } else {
          setError("Unexpected response from server.");
        }
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(err?.response?.data?.message || "Failed to load history.");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [api]);

  return (
    <div className="page-container">
      <Navbar />
      <main className="page-inner space-y-6">
        <section className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-slate-500">
            Test history
          </p>
          <h1 className="text-xl font-semibold tracking-tight text-slate-50 sm:text-2xl">
            Your recent depression detection sessions.
          </h1>
          <p className="max-w-2xl text-xs text-slate-400 sm:text-sm">
            Each entry corresponds to a completed run of the text, voice, or image model. Use this
            view to explore trends, but always pair results with professional guidance.
          </p>
        </section>

        <section className="glass-card rounded-3xl p-5">
          {loading && (
            <p className="text-xs text-slate-300">Loading your detection history...</p>
          )}

          {error && !loading && (
            <p className="rounded-2xl border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-xs text-rose-200">
              {error}
            </p>
          )}

          {!loading && !error && items.length === 0 && (
            <p className="text-xs text-slate-400">
              No detections yet. Run a text, voice, or image assessment to populate your history.
            </p>
          )}

          {!loading && !error && items.length > 0 && (
            <div className="mt-3 divide-y divide-slate-800/80 text-xs">
              {items.map((item) => {
                const typeClass = typeColors[item.type] || "bg-slate-700/40 text-slate-200";
                const createdAt = item.createdAt
                  ? new Date(item.createdAt).toLocaleString()
                  : "Unknown time";
                const displayConfidence =
                  item.confidence != null ? `${Math.round(Number(item.confidence) * 100)}%` : "N/A";

                return (
                  <div
                    key={item._id}
                    className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex flex-1 items-start gap-3">
                      <span
                        className={`mt-0.5 inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ring-1 ${typeClass}`}
                      >
                        {item.type.toUpperCase()}
                      </span>
                      <div className="space-y-1">
                        <p className="text-[11px] text-slate-400">
                          Status:{" "}
                          <span className="font-semibold text-slate-100">
                            {item.status || "Unknown"}
                          </span>{" "}
                          · Confidence:{" "}
                          <span className="font-semibold text-emerald-300">
                            {displayConfidence}
                          </span>
                        </p>
                        {item.inputReference && (
                          <p className="max-w-xl text-[11px] text-slate-500">
                            Input snippet:{" "}
                            <span className="font-mono text-[10px] text-slate-400">
                              {item.inputReference.length > 120
                                ? `${item.inputReference.slice(0, 120)}…`
                                : item.inputReference}
                            </span>
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-[11px] text-slate-500 sm:text-right">{createdAt}</div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default HistoryPage;

