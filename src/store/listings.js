export const seedListings = [
  {
    id: "1",
    type: "USED",
    title: "아이패드 키보드 케이스",
    price: 30000,
    campus: "강릉캠퍼스",
    status: "OPEN",
    negotiable: true,
    deadline: null,
    groupTarget: null,
    groupJoined: null,
    desc: "상태 A급, 직거래 우선",
    owner: "운성",
    createdAt: Date.now() - 1000 * 60 * 60 * 5,
  },
  {
    id: "2",
    type: "GROUP",
    title: "에어팟 프로 이어팁 공동구매",
    price: 12000,
    campus: "원주캠퍼스",
    status: "OPEN",
    negotiable: false,
    deadline: Date.now() + 1000 * 60 * 60 * 24 * 10,
    groupTarget: 10,
    groupJoined: 6,
    desc: "목표 인원 10명 모이면 구매 진행!",
    owner: "민지",
    createdAt: Date.now() - 1000 * 60 * 60 * 24,
  },
];

export function loadListings() {
  const saved = localStorage.getItem("campus_listings");
  if (saved) return JSON.parse(saved);
  localStorage.setItem("campus_listings", JSON.stringify(seedListings));
  return seedListings;
}

export function saveListings(list) {
  localStorage.setItem("campus_listings", JSON.stringify(list));
}
