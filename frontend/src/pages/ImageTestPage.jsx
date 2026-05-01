import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

const ImageTestPage = () => {
  const { api } = useAuth();
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    setError("");
    setResult(null);
    const selected = e.target.files[0];
    setFile(selected || null);
    if (selected) {
      setPreviewUrl(URL.createObjectURL(selected));
    } else {
      setPreviewUrl("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    if (!file) {
      setError("Please capture or upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const res = await api.post("/detection/image", formData, {
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
      setError(err?.response?.data?.message || "Unable to run image detection.");
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
            Test 3 · Facial image
          </p>
          <h1 className="text-xl font-semibold tracking-tight text-slate-50 sm:text-2xl">
            Estimate affect from facial expression.
          </h1>
          <p className="max-w-2xl text-xs text-slate-400 sm:text-sm">
            Capture a portrait or upload an image where your face is clearly visible. The Python
            model runs face detection and emotion analysis to infer depressive affect.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-[3fr,2fr]">
          <form onSubmit={handleSubmit} className="glass-card flex flex-col rounded-3xl p-5">
            <label className="mb-2 text-xs font-medium text-slate-200" htmlFor="image">
              Image file
            </label>
            <input
              id="image"
              type="file"
              accept="image/*"
              capture="user"
              onChange={handleFileChange}
              className="block w-full text-xs text-slate-300 file:mr-3 file:rounded-full file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white file:hover:bg-indigo-500"
            />
            <p className="mt-2 text-[11px] text-slate-500">
              Use a clear, front-facing image with good lighting. On mobile, the picker can use your
              camera for a live capture.
            </p>

            {previewUrl && (
              <div className="mt-4 flex items-center gap-4">
                <div className="h-20 w-20 overflow-hidden rounded-2xl border border-slate-700/70">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <p className="text-xs text-emerald-300">
                  Selected file: <span className="font-medium">{file?.name}</span>
                </p>
              </div>
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
              {loading ? "Analyzing..." : "Run image detection"}
            </button>
          </form>

          <div className="space-y-4">
            <div className="glass-card rounded-3xl p-5">
              <h2 className="text-sm font-semibold text-slate-50">Detection result</h2>
              {!result && (
                <p className="mt-2 text-xs text-slate-400">
                  Upload an image to see the predicted depression status and confidence from the
                  facial emotion model.
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
                    Only derived features and predictions are stored; raw images should be handled
                    according to your deployment&apos;s data retention policies.
                  </p>
                </div>
              )}
            </div>

            <div className="glass-card rounded-3xl p-4 text-[11px] text-slate-400">
              <p className="font-semibold text-slate-200">Ethical note</p>
              <p className="mt-2">
                Facial affect is just one signal and can be heavily influenced by culture,
                lighting, and context. Results are probabilistic and should never be used as a sole
                basis for clinical decision-making.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ImageTestPage;

