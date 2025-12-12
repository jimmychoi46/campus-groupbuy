const API = "http://127.0.0.1:4000/api";

export async function fetchListings({ type = "ALL", q = "" } = {}) {
  const params = new URLSearchParams();
  if (type !== "ALL") params.set("type", type);
  if (q) params.set("q", q);
  const res = await fetch(`${API}/listings?${params.toString()}`);
  return res.json();
}

export async function fetchListing(id) {
  const res = await fetch(`${API}/listings/${id}`);
  return res.json();
}

export async function createListing(payload) {
  const res = await fetch(`${API}/listings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error((await res.json()).message || "create failed");
  return res.json();
}

export async function joinGroup(id) {
  const res = await fetch(`${API}/listings/${id}/join`, { method: "POST" });
  if (!res.ok) throw new Error((await res.json()).message || "join failed");
  return res.json();
}

export async function toggleListing(id) {
  const res = await fetch(`${API}/listings/${id}/toggle`, { method: "POST" });
  return res.json();
}
