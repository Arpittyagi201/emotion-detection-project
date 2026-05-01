import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

const VoiceTestPage = () => {
  const { api } = useAuth();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    setError("");
    setResult(null);
    const selected = e.target.files[0];
    setFile(selected || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    if (!file) {
      setError("Please upload or record an audio file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const res = await api.post("/detection/voice", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      if (res.data && res.data.success) {
        setResult(res.data.data);
      } else {
        setError("Unexpected response from server.");
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to run voice detection.");
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
            Test 2 · Voice input
          </p>
          <h1 className="text-xl font-semibold tracking-tight text-slate-50 sm:text-2xl">
            Analyze acoustic markers from speech.
          </h1>
          <p className="max-w-2xl text-xs text-slate-400 sm:text-sm">
            Record a short audio reflection or upload a voice note. The Python model analyzes pitch,
            energy, and spectral features often associated with depressive symptoms.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-[3fr,2fr]">
          <form onSubmit={handleSubmit} className="glass-card flex flex-col rounded-3xl p-5">
            <label className="mb-2 text-xs font-medium text-slate-200" htmlFor="audio">
              Audio file
            </label>
            <input
              id="audio"
              type="file"
              accept="audio/*"
              capture
              onChange={handleFileChange}
              className="block w-full text-xs text-slate-300 file:mr-3 file:rounded-full file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white file:hover:bg-indigo-500"
            />
            <p className="mt-2 text-[11px] text-slate-500">
              Supported formats: WAV, MP3, WEBM (up to 10MB). On mobile, the file picker can use
              your microphone to capture live audio.
            </p>

            {file && (
              <p className="mt-3 text-xs text-emerald-300">
                Selected file: <span className="font-medium">{file.name}</span>
              </p>
            )}

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
              {loading ? "Analyzing..." : "Run voice detection"}
            </button>
          </form>

          <div className="space-y-4">
            <div className="glass-card rounded-3xl p-5">
              <h2 className="text-sm font-semibold text-slate-50">Detection result</h2>
              {!result && (
                <p className="mt-2 text-xs text-slate-400">
                  Upload or record an audio sample to view depression status and confidence from the
                  voice model.
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
                    The audio is streamed securely to the Python API for feature extraction; only
                    derived predictions and metadata are persisted.
                  </p>
                </div>
              )}
            </div>

            <div className="glass-card rounded-3xl p-4 text-[11px] text-slate-400">
              <p className="font-semibold text-slate-200">Recording tips</p>
              <ul className="mt-2 space-y-1.5 list-disc pl-4">
                <li>Speak for at least 15–30 seconds about your recent mood or routine.</li>
                <li>Record in a quiet environment to improve model robustness.</li>
                <li>
                  Avoid sharing names or identifiers; recordings are used purely for model inference
                  in this project.
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default VoiceTestPage;

