'use server';

import { getDb } from "@/lib/mongodb";
import { refresh } from "next/cache";

export async function createPost(_previousState, formData) {
  // 화면 상에서 submit이 호출이 되면, 이 함수가 실행이되서 
  // 제목과 본문 등 데이터를 전달 받아서 DB에 insert 해줌
  
  const values = {
    author: formData.get("author")?.toString() ?? "",
    title: formData.get("title")?.toString() ?? "",
    content: formData.get("content")?.toString() ?? "",
  };
  const { author, title, content } = values;

  const missing =
    !author ? "작성자" :
    !title ? "제목" :
    !content ? "내용" :
    null;

  if (missing) {
    return {
      success: false,
      message: `${missing} 데이터를 입력해주세요`,
      values,
    };
  }

  try {
    const db = await getDb();

    await db.collection("posts").insertOne({
      author,
      title,
      content,
      createdAt: new Date(),
    });

    refresh(); // 서버에서 실행되는 함수라서, 화면을 새로고침 시켜주는 refresh()를 호출해야함

    return {
      success: true,
      message: "저장되었습니다.",
      values: { author: "", title: "", content: "" },
    };
  } catch (error) {
    return {
      success: false,
      message: "저장에 실패했습니다.",
      values,
    };
  }
}
