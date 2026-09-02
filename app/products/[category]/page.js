import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { getDb } from "@/lib/mongodb";

const categories = [ 
  {value: "all", label: "전체"},
  {value: "digital", label: "디지털"},
  {value: "stationery", label: "문구"},
  {value: "kitchen", label: "주방"},
]

export default async function CategoryPage({ params }) {
  const { category } = await params; // 파라미터로 받은 것 받음
  // nextjs가 page.js에 줄때 promies객체로 주는데 이름이 params 고정임.
  // 객체 구조 분해 문법을 사용해서 
  // { category: "all"} 로 들어오므로 params.category만 꺼내야함
  // 그게 const category가 아니고 const { category } = params; 로 해야함
  
  const checkCategory = categories.find((c) => c.value === category);

  if (!checkCategory) {
    notFound(); // 가장 가까운 곳에 위치한 notFound.js를 보여줌 
    // 존재하지 않는다면 nextjs가 제공하는 notFound()가 호출됨
    // return component를 할 수도 있지만, 그렇게되면 http는 200상태이며, 존재하는 정상 페이지로 취급.
    // notFound()의 경우 렌더링을 즉시 중단함. url자체가 유효하지 않을 때 사용
  }

  // category를 가지고 db에 data를 조회해옴
  await connection(); 
  
  const filter = category === "all" ? {} : { category: category };
  const db = await getDb();
  const data = await db.collection("products").find(filter).sort({name: 1}).toArray();
  
  console.log("data", data);

  return (
    <>
    {/* 카테고리 link 만들기 */}
    <nav aria-label="상품 카테고리">
      {categories.map((c) => (
        <Link key={c.value} href={`/products/${c.value}`}>
          {c.label}|
        </Link>
      ))}
    </nav>

    <h3>상품 {data.length}개</h3>
    <ul className="result-list">
      {data.map((item) => (
        <li key={item._id.toString()}>
          <strong>{item.name}</strong>
          {item.price.toLocaleString("ko-KR")}원
          <br/>
          <small>
            {item.category} / {item.description}
          </small>
        </li>
      ))}
    </ul>
    </>
  )

}
