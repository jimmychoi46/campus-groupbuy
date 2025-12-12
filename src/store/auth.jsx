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
    
    if (!email || email.trim() === "") {
      throw new Error("이메일을 입력해주세요.");
    }

    // 2. 비밀번호 입력 여부 확인
    if (!password || password.trim() === "") {
      throw new Error("비밀번호를 입력해주세요.");
    }
    
    if (!isAllowedCampusEmail(email)) {
      throw new Error(`학교 이메일(@${ALLOWED_DOMAIN})을 사용하여 로그인 해주세요.`);
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
