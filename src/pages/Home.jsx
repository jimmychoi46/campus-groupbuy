import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../store/auth";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="card">
      <h1>캠퍼스 한정 중고·공동구매 플랫폼</h1>
      <p className="muted">
        같은 학교 학생끼리만 거래/공구를 할 수 있는 중고거래 플랫폼입니다.
      </p>

      {!user ? (
        <div className="row">
          <Link className="btn primary" to="/login">학교 이메일로 로그인</Link>
        </div>
      ) : (
        <div className="row">
          <Link className="btn primary" to="/listings">게시글 보러가기</Link>
          <Link className="btn" to="/listings/new">글 등록</Link>
        </div>
      )}

      <div className="grid2" style={{ marginTop: 16 }}>
        <div className="mini">
          <h3>중고 거래</h3>
          <p className="muted">가격/캠퍼스 기준으로 빠르게 매칭</p>
        </div>
        <div className="mini">
          <h3>공동구매</h3>
          <p className="muted">목표 인원 달성 시 자동 마감</p>
        </div>
      </div>
    </div>
  );
}
