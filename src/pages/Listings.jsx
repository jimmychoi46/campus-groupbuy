import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { fetchListings, toggleListing } from "../api";

export default function Listings() {
  const [list, setList] = useState([]);
  const [q, setQ] = useState("");
  const [type, setType] = useState("ALL");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const data = await fetchListings({ type, q });
    setList(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, [type]);

  const filtered = useMemo(() => {
    const qq = q.trim().toLowerCase();
    return list.filter((x) => (qq ? x.title.toLowerCase().includes(qq) : true));
  }, [list, q]);

  const onToggle = async (id) => {
    await toggleListing(id);
    await load();
  };

  return (
    <div className="stack">
      <div className="card">
        <div className="row space">
          <h2>게시글)</h2>
          <Link className="btn primary" to="/listings/new">+ 글 등록</Link>
        </div>

        <div className="row">
          <input className="grow" value={q} onChange={(e) => setQ(e.target.value)} placeholder="검색: 제목" />
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="ALL">전체</option>
            <option value="USED">중고</option>
            <option value="GROUP">공동구매</option>
          </select>
          <button className="btn" onClick={load}>검색</button>
        </div>
      </div>

      {loading ? (
        <div className="card">불러오는 중...</div>
      ) : (
        <div className="grid">
          {filtered.map((x) => (
            <div key={x.id} className="card">
              <div className="row space">
                <span className={`pill ${x.type === "GROUP" ? "pill2" : ""}`}>
                  {x.type === "GROUP" ? "공동구매" : "중고"}
                </span>
                <span className={`pill ${x.status === "OPEN" ? "ok" : "no"}`}>
                  {x.status === "OPEN" ? "진행중" : "마감"}
                </span>
              </div>

              <h3 style={{ marginTop: 8 }}>{x.title}</h3>
              <p className="muted">
                {x.campus} · {x.ownerName} · {Number(x.price).toLocaleString()}원
                {x.type === "USED" && (
                  <> · 협상 {x.negotiable ? "가능" : "불가"}</>
                )}
              </p>

              {x.type === "GROUP" && (
                <> 
                  <p className="muted"> 
                    참여 {x.groupJoined}/{x.groupTarget} 
                  </p> 
                  {x.deadline && (
                    <p className="muted"> 
                      마감일 {new Date(x.deadline).toLocaleDateString()} 
                    </p>
                  )} 
                </> 
              )}

              <div className="row space" style={{ marginTop: 12 }}>
                <Link className="btn" to={`/listings/${x.id}`}>상세</Link>
                <button className="btn" onClick={() => onToggle(x.id)}>
                  {x.status === "OPEN" ? "마감" : "재오픈"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
