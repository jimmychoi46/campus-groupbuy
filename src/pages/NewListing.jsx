import React, { useState, useEffect } from "react";
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
  const [deadline, setDeadline] = useState(""); 
  const [negotiable, setNegotiable] = useState(false);
  const [target, setTarget] = useState(10);
  const [err, setErr] = useState("");

 useEffect(() => {
   if (type === "USED") {
     setDeadline(""); 
     setTarget(10); 
   } 
   
   if (type === "GROUP") {
     setNegotiable(false); 
   } 
 }, [type]);

  const submit = async (e) => {
    e.preventDefault();
    setErr("");

    if (type === "GROUP" && !deadline) {
      setErr("공동구매는 마감일이 지정되어야 합니다. 마감일을 선택해 주세요."); 
      return; 
    }
    try {
      const created = await createListing({
        type,
        title: title.trim(),
        price: Number(price),
        campus,
        desc: desc.trim(),
        deadline: type === "GROUP" && deadline ? new Date(deadline).toISOString() : null, 
        negotiable: type === "USED" ? negotiable : false,
        groupTarget: type === "GROUP" ? Number(target) : null,
        ownerId: user.id     });
      nav(`/listings/${created.id}`);
    } catch (e2) {
      setErr(e2.message || "등록 실패");
    }
  };

  return (
    <div className="card">
      <h2>글 등록)</h2>
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
         <>
           <label>
            마감일
            <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
           </label>
           <label>
            목표 인원
            <input type="number" value={target} onChange={(e) => setTarget(e.target.value)} min="2" />
           </label>
         </>
        )}


        <label>
          설명
          <textarea value={desc} onChange={(e) => setDesc(e.target.value)} rows={4} />
        </label>
{type === "USED" && ( 
  <div style={{ marginTop: 12, display: "flex", justifyContent: "flex-start", alignItems: "center" }}> 
    <span style={{ fontWeight: "bold", marginRight: 8 }}>가격 협상 가능 여부</span> 
     <input 
       type="checkbox" 
       checked={negotiable} onChange={(e) => setNegotiable(e.target.checked)} 
       /> 
  </div> 
)}




        {err && <div className="error">{err}</div>}
        <button className="btn primary" type="submit">등록하기</button>
      </form>
    </div>
  );
}
