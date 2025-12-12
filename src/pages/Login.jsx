import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";

export default function Login() {
  const { login, ALLOWED_DOMAIN } = useAuth();
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [err, setErr] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    setErr("");
    try {
      login(email.trim(), nickname.trim() || "학생");
      nav("/listings");
    } catch (ex) {
      setErr(ex.message || "로그인 실패");
    }
  };

  return (
    <div className="card">
      <h2>로그인 (캠퍼스 한정)</h2>
      <p className="muted">학교 이메일 도메인: <b>@{ALLOWED_DOMAIN}</b></p>

      <form className="form" onSubmit={onSubmit}>
        <label>
          학교 이메일
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder={`example@${ALLOWED_DOMAIN}`} />
        </label>

        <label>
          닉네임
          <input value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder="예: 김운성" />
        </label>

        {err && <div className="error">{err}</div>}

        <button className="btn primary" type="submit">로그인</button>
      </form>
    </div>
  );
}
