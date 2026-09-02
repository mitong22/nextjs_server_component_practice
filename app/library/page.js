
import { connection } from "next/server";
import { getDb } from "@/lib/mongodb";
import BookExplorer from "./BookExplorer.js";

export default async function LibraryPage() {
  await connection(); // 서버에서 실행되는 함수라서, DB 연결을 위해 connection() 함수를 호출해야함

  // books 컬렉션에서 데이터를 가져오기 위해 getDb() 함수를 호출해서 db 객체를 가져옴
  const db = await getDb();
  // const data = await db.collection("books").find({}).sort({title: 1}).toArray(); 
  const data = await db.collection("books").find({}, { projection: { _id: 0 } }).sort({ title: 1 }).toArray(); 

  console.log("************book data****************")
  console.log(data)

  return (
    <>
      <h3>도서 목록</h3>
      {/* db에서 조회해온 books 컬렉션 data를 직접 전달 */}
      <BookExplorer initialBooks={data} />
    </>
  )   
}