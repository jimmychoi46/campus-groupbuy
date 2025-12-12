import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { createListing } from "../api";

export default function NewListing() {
  const { user } = useAuth();
  const nav = useNavigate();

  const [type, setType] = useState("USED");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(10000);
  const [campus, setCampus] = useState("강릉캠퍼스");
  const [desc, setDesc] = useState("");
  const [target, setTarget] = useState(10);
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const created = await createListing({
        type,
        title: title.trim(),
        price: Number(price),
        campus,
        desc: desc.trim(),
        groupTarget: type === "GROUP" ? Number(target) : null,
        ownerEmail: user.email,
        ownerName: user.nickname,
      });
      nav(`/listings/${created.id}`);
    } catch (e2) {
      setErr(e2.message || "등록 실패");
    }
  };

  return (
    <div className="card">
      <h2>글 등록 (DB 저장)</h2>
      <form className="form" onSubmit={submit}>
        <label>
          유형
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="USED">중고</option>
            <option value="GROUP">공동구매</option>
          </select>
        </label>

        <label>
          제목
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>

        <label>
          캠퍼스
          <select value={campus} onChange={(e) => setCampus(e.target.value)}>
            <option>강릉캠퍼스</option>
            <option>원주캠퍼스</option>
          </select>
        </label>

        <label>
          가격(원)
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} min="0" />
        </label>

        {type === "GROUP" && (
          <label>
            목표 인원
            <input type="number" value={target} onChange={(e) => setTarget(e.target.value)} min="2" />
          </label>
        )}

        <label>
          설명
          <textarea value={desc} onChange={(e) => setDesc(e.target.value)} rows={4} />
        </label>

        {err && <div className="error">{err}</div>}
        <button className="btn primary" type="submit">등록하기</button>
      </form>
    </div>
  );
}
