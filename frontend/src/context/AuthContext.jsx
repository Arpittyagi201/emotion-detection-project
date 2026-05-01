import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";

const AuthContext = createContext(null);

const API_BASE =
  import.meta.env.VITE_API_URL ||
  (window.location.origin.includes("localhost")
    ? "http://localhost:5000/api"
    : `${window.location.origin}/api`);

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("dd_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    localStorage.removeItem("dd_token");
    setUser(null);
  };

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        logout();
      }
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    const token = localStorage.getItem("dd_token");
    if (!token) {
      setLoading(false);
      return;
    }

    api
      .get("/auth/me")
      .then((res) => {
        if (res.data && res.data.success) {
          setUser(res.data.data);
        }
      })
      .catch(() => {
        logout();
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    if (res.data && res.data.success) {
      localStorage.setItem("dd_token", res.data.data.token);
      setUser(res.data.data.user);
    }
    return res.data;
  };

  const register = async (name, email, password) => {
    const res = await api.post("/auth/register", { name, email, password });
    if (res.data && res.data.success) {
      localStorage.setItem("dd_token", res.data.data.token);
      setUser(res.data.data.user);
    }
    return res.data;
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      register,
      logout,
      api
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
};

