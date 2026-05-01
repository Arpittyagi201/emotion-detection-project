import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

const TextTestPage = () => {
  const { api } = useAuth();
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    if (!text.trim()) {
      setError("Please enter some text to analyze.");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/detection/text", { text });
      if (res.data && res.data.success) {
        setResult(res.data.data);
      } else {
        setError("Unexpected response from server.");
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to run text detection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <Navbar />
      <main className="page-inner space-y-6">
        <section className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-slate-500">
            Test 1 · Text input
          </p>
          <h1 className="text-xl font-semibold tracking-tight text-slate-50 sm:text-2xl">
            Analyze depressive patterns in written language.
          </h1>
          <p className="max-w-2xl text-xs text-slate-400 sm:text-sm">
            Paste a journal entry, social media message, or open-ended text describing recent mood.
            The model runs sentiment and affective feature extraction to estimate depression risk.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-[3fr,2fr]">
          <form onSubmit={handleSubmit} className="glass-card flex flex-col rounded-3xl p-5">
            <label className="mb-2 text-xs font-medium text-slate-200" htmlFor="text">
              Input text
            </label>
            <textarea
              id="text"
              rows={10}
              className="min-h-[220px] flex-1 resize-none rounded-2xl border border-slate-700/80 bg-slate-950/80 px-3 py-2.5 text-sm text-slate-50 outline-none ring-primary/40 placeholder:text-slate-500 focus:border-primary focus:ring-1"
              placeholder="For example, describe how you have been feeling over the last two weeks..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <p className="mt-2 text-[11px] text-slate-500">
              Avoid including personal identifiers. This tool is for research and awareness only,
              not a clinical diagnosis.
            </p>

            {error && (
              <p className="mt-3 rounded-2xl border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-xs text-rose-200">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary mt-4 h-11 w-full sm:w-auto px-6"
            >
              {loading ? "Analyzing..." : "Run text detection"}
            </button>
          </form>

          <div className="space-y-4">
            <div className="glass-card rounded-3xl p-5">
              <h2 className="text-sm font-semibold text-slate-50">Detection result</h2>
              {!result && (
                <p className="mt-2 text-xs text-slate-400">
                  Run an analysis to see predicted depression status and confidence from the Python
                  model.
                </p>
              )}

              {result && (
                <div className="mt-4 space-y-4 text-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-slate-400">Depression status</p>
                      <p className="mt-1 text-lg font-semibold text-slate-50">
                        {result.status || "Unknown"}
                      </p>
                    </div>
                    <div className="rounded-2xl bg-slate-900/80 px-3 py-2 text-right text-xs">
                      <p className="text-[11px] text-slate-400">Confidence</p>
                      <p className="text-base font-semibold text-emerald-400">
                        {result.confidence != null
                          ? `${Math.round(Number(result.confidence) * 100)}%`
                          : "N/A"}
                      </p>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500">
                    The prediction is computed by the external Python ML API and stored in your
                    account history for longitudinal analysis.
                  </p>
                </div>
              )}
            </div>

            <div className="glass-card rounded-3xl p-4 text-[11px] text-slate-400">
              <p className="font-semibold text-slate-200">How it works</p>
              <ul className="mt-2 space-y-1.5 list-disc pl-4">
                <li>Securely sends your text to the Python emotion/depression detection API.</li>
                <li>Applies preprocessing, sentiment analysis, and deep affective modeling.</li>
                <li>Stores prediction, confidence, and timestamp in MongoDB under your user ID.</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default TextTestPage;

