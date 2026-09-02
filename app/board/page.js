
import { getDb } from "@/lib/mongodb";
import { connection } from "next/server";
import PostForm from "./PostForm.js";

export default async function BoardPage({ params }) {
  await connection();
  
  const db = await getDb();
  const data = await db.collection("posts").find({}).sort({createdAt: -1}).limit(20).toArray();


  return (
    <>
      <PostForm />

      <h3>글 목록</h3>
      <ul>
        {data.map((item) => (
          <li key={item._id.toString()}>
            <strong>{item.title} | {item.author}</strong>
            <p>{item.content}</p>
            <small>{item.createdAt.toLocaleString("ko-KR")}</small>
            <br/>
            <small>{item.createdAt.toString()}</small>
          </li>
        ))}
      </ul>
    </>
  )
}
