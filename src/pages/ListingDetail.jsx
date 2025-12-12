import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchListing, joinGroup } from "../api";

export default function ListingDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const data = await fetchListing(id);
    setItem(data?.id ? data : null);
    setLoading(false);
  };

  useEffect(() => { load(); }, [id]);

  const onJoin = async () => {
    try {
      await joinGroup(id);
      setMsg("공동구매 참여 완료!");
      await load();
      setTimeout(() => setMsg(""), 2000);
    } catch (e) {
      setMsg(e.message);
      setTimeout(() => setMsg(""), 2500);
    }
  };

  if (loading) return <div className="card">불러오는 중...</div>;
  if (!item) {
    return (
      <div className="card">
        <h2>게시글을 찾을 수 없어요.</h2>
        <Link className="btn" to="/listings">목록</Link>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="row space">
        <h2>{item.title}</h2>
        <Link className="btn" to="/listings">목록</Link>
      </div>

      <p className="muted">
        {item.type === "GROUP" ? "공동구매" : "중고"} · {item.campus} · {item.ownerName}
      </p>

      <div className="divider" />

      <p><b>가격</b> : {Number(item.price).toLocaleString()}원</p>
      <p><b>상태</b> : {item.status === "OPEN" ? "진행중" : "마감"}</p>

      {item.type === "GROUP" && (
        <p><b>참여</b> : {item.groupJoined}/{item.groupTarget}</p>
      )}

      <p style={{ marginTop: 10 }}><b>설명</b></p>
      <p className="muted">{item.desc}</p>

      {msg && <div className="okbox">{msg}</div>}

      {item.type === "GROUP" && (
        <div className="row" style={{ marginTop: 12 }}>
          <button className="btn primary" onClick={onJoin} disabled={item.status !== "OPEN"}>
            공동구매 참여하기
          </button>
        </div>
      )}
    </div>
  );
}
