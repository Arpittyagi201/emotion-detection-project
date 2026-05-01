import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { MessageSquare, Mic, ScanFace, ArrowRight, History } from "lucide-react";

const DashboardPage = () => {
  const { user } = useAuth();

  const cards = [
    {
      title: "Text Analysis",
      description:
        "Paste free-form text, journal entries, or chat logs to estimate depression risk from language patterns.",
      to: "/test/text",
      accent: "from-indigo-500/40 to-cyan-500/40",
      icon: <MessageSquare size={24} className="text-indigo-400" />
    },
    {
      title: "Voice Prosody",
      description:
        "Upload or record spoken audio to analyze acoustic markers, tone, and speech patterns linked to mood.",
      to: "/test/voice",
      accent: "from-violet-500/40 to-fuchsia-500/40",
      icon: <Mic size={24} className="text-violet-400" />
    },
    {
      title: "Facial Affect",
      description:
        "Capture or upload a portrait-style image to assess facial expressions and emotional state.",
      to: "/test/image",
      accent: "from-emerald-500/40 to-teal-500/40",
      icon: <ScanFace size={24} className="text-emerald-400" />
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } }
  };

  return (
    <div className="page-container overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-[400px] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
      <Navbar />
      
      <main className="page-inner space-y-12 relative z-10 pt-10">
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/50 px-3 py-1.5 text-[11px] font-semibold tracking-widest text-zinc-400 uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Workspace Active
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Hello, {user?.name?.split(" ")[0] || "there"}.
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-zinc-400">
              Select an assessment mode below to begin. Your secure data is processed privately using our Python APIs.
            </p>
          </div>
          
          <Link to="/history" className="btn-secondary h-11 shrink-0 group">
            <History size={16} className="mr-2 text-zinc-400 transition-colors group-hover:text-zinc-200" />
            Detection History
          </Link>
        </motion.section>

        <motion.section 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-6 md:grid-cols-3"
        >
          {cards.map((card) => (
            <motion.div key={card.title} variants={itemVariants}>
              <Link
                to={card.to}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-zinc-800/60 bg-zinc-900/30 p-6 shadow-glass backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-zinc-800/40 hover:border-zinc-700 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
              >
                {/* Glow effect on hover */}
                <div
                  className={`pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br ${card.accent} opacity-0 blur-[80px] transition-opacity duration-500 group-hover:opacity-100`}
                />
                
                <div className="relative flex flex-col h-full space-y-4 z-10">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-800/80 border border-zinc-700/50 shadow-inner group-hover:scale-110 transition-transform duration-300">
                    {card.icon}
                  </div>
                  
                  <div className="space-y-2 flex-1">
                    <h2 className="text-lg font-bold text-zinc-100 group-hover:text-white transition-colors">
                      {card.title}
                    </h2>
                    <p className="text-sm leading-relaxed text-zinc-400 group-hover:text-zinc-300 transition-colors">
                      {card.description}
                    </p>
                  </div>
                  
                  <div className="pt-6 mt-auto flex items-center justify-between border-t border-zinc-800/50">
                    <span className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">
                      Secure API
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-transform duration-300 group-hover:translate-x-1 group-hover:text-indigo-400">
                      Start
                      <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.section>
      </main>
    </div>
  );
};

export default DashboardPage;

