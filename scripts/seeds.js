import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017";
const dbName = process.env.MONGODB_DB ?? "nextjs_components";

const products = [
  {
    name: "무선 키보드",
    category: "digital",
    price: 89000,
    description: "여러 기기를 전환할 수 있는 텐키리스 키보드",
  },
  {
    name: "USB-C 허브",
    category: "digital",
    price: 46000,
    description: "HDMI와 USB 포트를 제공하는 휴대용 허브",
  },
  {
    name: "스탠드 노트",
    category: "stationery",
    price: 4500,
    description: "책상 위에 세워두는 작은 메모 노트",
  },
  {
    name: "황동 펜",
    category: "stationery",
    price: 12000,
    description: "묵직한 필기감을 가진 황동 볼펜",
  },
  {
    name: "드립 주전자",
    category: "kitchen",
    price: 42000,
    description: "물줄기를 조절하기 쉬운 커피용 주전자",
  },
  {
    name: "도자기 머그",
    category: "kitchen",
    price: 15000,
    description: "350ml 크기의 단순한 흰색 머그",
  },
];

const posts = [
  {
    author: "김초보",
    title: "Server Component 첫인상",
    content: "컴포넌트 안에서 DB를 바로 조회할 수 있다는 점이 새로웠습니다.",
    createdAt: new Date("2026-08-29T09:00:00+09:00"),
  },
  {
    author: "이리액트",
    title: "use client 범위 질문",
    content: "이벤트가 필요한 작은 컴포넌트에만 선언하는 이유를 연습하고 있습니다.",
    createdAt: new Date("2026-08-30T14:30:00+09:00"),
  },
  {
    author: "박넥스트",
    title: "Server Action form 연습",
    content: "별도 API 호출 코드를 작성하지 않고 form을 서버 함수에 연결했습니다.",
    createdAt: new Date("2026-08-31T10:15:00+09:00"),
  },
];

const books = [
  {
    title: "브라우저에서 시작한 React",
    author: "한프론트",
    topic: "React",
    description: "SPA의 렌더링과 상태 흐름을 복습하는 입문서",
  },
  {
    title: "서버에서 만나는 컴포넌트",
    author: "윤서버",
    topic: "Next.js",
    description: "Server Component의 역할과 데이터 조회를 다루는 예제집",
  },
  {
    title: "경계를 넘는 데이터",
    author: "최직렬",
    topic: "Next.js",
    description: "서버 데이터를 직렬화하여 Client Component에 전달하는 방법",
  },
  {
    title: "폼에서 서버까지",
    author: "정액션",
    topic: "Server Action",
    description: "HTML form과 Server Action의 요청 흐름을 설명하는 안내서",
  },
  {
    title: "경로로 읽는 상품 분류",
    author: "오파람",
    topic: "Routing",
    description: "Dynamic Segment와 params로 URL 값을 읽는 작은 실습서",
  },
];

const client = new MongoClient(uri);

try {
  await client.connect();
  const db = client.db(dbName);

  await Promise.all([
    db.collection("products").deleteMany({}),
    db.collection("posts").deleteMany({}),
    db.collection("books").deleteMany({}),
  ]);

  await db.collection("products").insertMany(products);
  await db.collection("posts").insertMany(posts);
  await db.collection("books").insertMany(books);

  await db.collection("products").createIndex({ category: 1, name: 1 });
  await db.collection("posts").createIndex({ createdAt: -1 });

  console.log(`Seed complete: ${dbName}`);
  console.log(`products=${products.length}, posts=${posts.length}, books=${books.length}`);
} finally {
  await client.close();
}