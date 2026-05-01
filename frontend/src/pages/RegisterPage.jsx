import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { User, Mail, Lock, AlertCircle, ArrowRight } from "lucide-react";

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(name, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />
      <Navbar />

      <main className="page-inner flex items-center justify-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-md relative"
        >
          {/* Decorative background blur */}
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-primary/30 to-secondary/30 blur-2xl opacity-50 pointer-events-none" />
          
          <div className="glass-card rounded-3xl p-8 sm:p-10 border border-zinc-700/50">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold tracking-tight text-white">
                Create an account
              </h1>
              <p className="mt-2 text-sm text-zinc-400">
                Join InsightAI to start your secure screening.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold tracking-wide text-zinc-300 uppercase" htmlFor="name">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                    <User size={18} />
                  </div>
                  <input
                    id="name"
                    type="text"
                    required
                    className="input-modern pl-10"
                    placeholder="Jane Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold tracking-wide text-zinc-300 uppercase" htmlFor="email">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                    <Mail size={18} />
                  </div>
                  <input
                    id="email"
                    type="email"
                    required
                    className="input-modern pl-10"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold tracking-wide text-zinc-300 uppercase" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                    <Lock size={18} />
                  </div>
                  <input
                    id="password"
                    type="password"
                    required
                    minLength={6}
                    className="input-modern pl-10"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }} 
                  animate={{ opacity: 1, height: 'auto' }}
                  className="flex items-center gap-2 rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-300"
                >
                  <AlertCircle size={16} className="shrink-0" />
                  <p>{error}</p>
                </motion.div>
              )}

              <button type="submit" disabled={loading} className="btn-primary w-full h-12 mt-4 group">
                {loading ? "Creating account..." : "Sign up"}
                {!loading && <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-zinc-400">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold text-primary transition-colors hover:text-indigo-400">
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default RegisterPage;

