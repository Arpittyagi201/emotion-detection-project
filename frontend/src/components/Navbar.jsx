import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { Activity, LogOut, LayoutDashboard, History, User } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isAuthPage = ["/login", "/register"].includes(location.pathname);

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 border-b border-zinc-800/50 bg-darkBg/70 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        <Link to="/" className="group flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-white shadow-glow transition-transform duration-300 group-hover:scale-105">
            <Activity size={22} className="stroke-[2.5px]" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-wide text-zinc-50">
              InsightAI
            </span>
            <span className="text-[10px] font-medium tracking-widest text-zinc-400 uppercase">
              Mental Wellness
            </span>
          </div>
        </Link>

        <nav className="flex items-center gap-2 sm:gap-4 text-sm">
          {user && !isAuthPage && (
            <>
              <Link
                to="/dashboard"
                className="hidden items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:bg-zinc-800/60 hover:text-white sm:flex"
              >
                <LayoutDashboard size={14} />
                Dashboard
              </Link>
              <Link
                to="/history"
                className="hidden items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:bg-zinc-800/60 hover:text-white sm:flex"
              >
                <History size={14} />
                History
              </Link>
              <div className="h-4 w-px bg-zinc-800 mx-2 hidden sm:block"></div>
              <div className="hidden items-center gap-2 px-2 sm:flex">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-800 text-zinc-400">
                  <User size={14} />
                </div>
                <span className="text-xs font-medium text-zinc-300">
                  {user?.name?.split(" ")[0] || "User"}
                </span>
              </div>
              <button
                onClick={logout}
                className="flex items-center gap-1.5 rounded-full bg-zinc-800/80 border border-zinc-700/50 px-3 py-1.5 text-xs font-semibold text-zinc-300 transition-colors hover:bg-zinc-700 hover:text-white"
              >
                <LogOut size={14} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          )}

          {!user && !isAuthPage && (
            <>
              <Link
                to="/login"
                className="rounded-full px-4 py-2 text-xs font-medium text-zinc-300 transition-colors hover:text-white"
              >
                Sign In
              </Link>
              <Link to="/register" className="btn-primary py-2 px-5 text-xs rounded-full">
                Get Started
              </Link>
            </>
          )}
        </nav>
      </div>
    </motion.header>
  );
};

export default Navbar;

