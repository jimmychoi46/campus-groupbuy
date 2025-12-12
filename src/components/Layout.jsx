import React from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";

export default function Layout() {
  const { user, logout, ALLOWED_DOMAIN } = useAuth();
  const nav = useNavigate();

  return (
    <div className="app">
      <header className="header">
        <Link to="/" className="logo">Campus Market</Link>

        <nav className="nav">
          <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>홈</NavLink>
          <NavLink to="/listings" className={({ isActive }) => (isActive ? "active" : "")}>게시글</NavLink>
          <NavLink to="/listings/new" className={({ isActive }) => (isActive ? "active" : "")}>등록</NavLink>
        </nav>

        <div className="right">
          {user ? (
            <>
              <span className="badge">{user.nickname}</span>
              <button
                className="btn"
                onClick={() => {
                  logout();
                  nav("/");
                }}
              >
                로그아웃
              </button>
            </>
          ) : (
            <Link className="btn" to="/login">로그인</Link>
          )}
        </div>
      </header>

      <main className="main">
        <Outlet />
      </main>

      <footer className="footer">
        <small>캠퍼스 한정: @{ALLOWED_DOMAIN} 이메일만 접근 가능</small>
      </footer>
    </div>
  );
}
