import React, { createContext, useContext, useMemo, useState } from "react";

const AuthCtx = createContext(null);

// 학교 이메일 도메인
const ALLOWED_DOMAIN = "gwnu.ac.kr";

function isAllowedCampusEmail(email) {
  const at = email.lastIndexOf("@");
  if (at < 0) return false;
  const domain = email.slice(at + 1).toLowerCase();
  return domain === ALLOWED_DOMAIN;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("campus_user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email, nickname) => {
    if (!isAllowedCampusEmail(email)) {
      throw new Error(`학교 이메일(@${ALLOWED_DOMAIN})만 로그인 가능해요.`);
    }
    const next = { email, nickname };
    setUser(next);
    localStorage.setItem("campus_user", JSON.stringify(next));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("campus_user");
  };

  const value = useMemo(() => ({ user, login, logout, ALLOWED_DOMAIN }), [user]);
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  return useContext(AuthCtx);
}
