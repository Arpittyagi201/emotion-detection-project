import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { MessageSquare, Mic, ScanFace, ArrowRight, ShieldCheck, Activity } from "lucide-react";

const LandingPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="page-container overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-indigo-500/10 to-transparent pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 -left-40 w-[500px] h-[500px] rounded-full bg-secondary/5 blur-[100px] pointer-events-none" />

      <Navbar />
      
      <main className="page-inner relative z-10 pt-16 sm:pt-24 lg:pt-32">
        <motion.section 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid flex-1 gap-16 lg:grid-cols-[1.1fr,1fr] lg:items-center"
        >
          <div className="space-y-8">
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1.5 text-xs font-semibold text-indigo-300 shadow-glow backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              Clinical-Grade AI Screening
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              <h1 className="text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.1]">
                Understand emotional wellbeing through{" "}
                <span className="bg-gradient-to-r from-indigo-400 via-primary to-secondary bg-clip-text text-transparent">
                  multi-modal signals.
                </span>
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-zinc-400">
                This platform analyzes conversations, speech prosody, and facial
                expressions using advanced deep learning to estimate depression risk in a private,
                secure environment.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-2">
              <Link to="/register" className="btn-primary h-12 px-8 text-sm group">
                Start Assessment
                <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/login"
                className="inline-flex h-12 items-center gap-2 rounded-xl border border-zinc-700/50 bg-zinc-800/30 px-6 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white"
              >
                Sign In
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} className="grid gap-4 sm:grid-cols-3 pt-6 border-t border-zinc-800/50">
              <div className="space-y-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
                  <MessageSquare size={16} />
                </div>
                <p className="font-semibold text-zinc-200 text-sm">Text Analysis</p>
                <p className="text-xs text-zinc-500">
                  Detect linguistic markers from journals or chats.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400">
                  <Mic size={16} />
                </div>
                <p className="font-semibold text-zinc-200 text-sm">Voice Signals</p>
                <p className="text-xs text-zinc-500">
                  Capture prosodic features and tone variations.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                  <ScanFace size={16} />
                </div>
                <p className="font-semibold text-zinc-200 text-sm">Facial Affect</p>
                <p className="text-xs text-zinc-500">
                  Assess micro-expressions from static images.
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="relative w-full max-w-lg mx-auto lg:ml-auto">
            <div className="glass-card rounded-2xl p-6 shadow-2xl shadow-indigo-500/10">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-800">
                    <Activity size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-100">Live Status</h3>
                    <p className="text-xs text-zinc-500">Real-time aggregate</p>
                  </div>
                </div>
                <div className="rounded-full bg-emerald-500/10 px-3 py-1 border border-emerald-500/20">
                  <p className="text-xs font-semibold text-emerald-400">72% Stable</p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { label: "Text Sentiment", value: "Low Risk", color: "text-emerald-400", bg: "bg-emerald-500/20" },
                  { label: "Voice Prosody", value: "Moderate", color: "text-amber-400", bg: "bg-amber-500/20", width: "w-[60%]" },
                  { label: "Facial Affect", value: "Neutral", color: "text-zinc-300", bg: "bg-zinc-500/20", width: "w-[80%]" }
                ].map((stat, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium text-zinc-400">{stat.label}</span>
                      <span className={`font-semibold ${stat.color}`}>{stat.value}</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
                      <div className={`h-full rounded-full ${stat.bg} ${stat.width || 'w-[20%]'}`} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex items-center gap-3 rounded-xl bg-zinc-900/80 p-3 border border-zinc-800">
                <ShieldCheck size={18} className="text-zinc-500" />
                <p className="text-[11px] text-zinc-400 leading-tight">
                  End-to-end encryption. Models run securely via dedicated API boundaries.
                </p>
              </div>
            </div>

            {/* Decorative floating elements */}
            <motion.div 
              animate={{ y: [0, -10, 0] }} 
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-6 -bottom-6 glass-card p-4 rounded-xl shadow-xl flex items-center gap-3 border border-zinc-700/50"
            >
               <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                 <span className="text-white text-xs font-bold">AI</span>
               </div>
               <div>
                 <p className="text-xs font-bold text-white">Models Active</p>
                 <p className="text-[10px] text-zinc-400">All systems operational</p>
               </div>
            </motion.div>
          </motion.div>
        </motion.section>
      </main>
    </div>
  );
};

export default LandingPage;

