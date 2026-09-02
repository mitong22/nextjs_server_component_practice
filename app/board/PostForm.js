'use client';

import { useActionState, useEffect } from "react";
import { createPost } from "./actions.js";

export default function PostForm() {
  const [state, formAction] = useActionState(createPost, {
    success: false,
    message: "",
    values: { author: "", title: "", content: "" }
  });

  useEffect(() => {
    if (state.message) {
      alert(state.message);
    }
  }, [state]);

  return (
    <form action={formAction} noValidate>
      <label>
        작성자
        <input name="author" type="text" minLength="2" maxLength="100" required defaultValue={state.values.author}/>
      </label>
      <label>
        제목
        <input name="title" type="text" minLength="2" maxLength="100" required defaultValue={state.values.title}/>
      </label>
      <label>
        내용
        <textarea name="content" rows="4" minLength="2" maxLength="300" required defaultValue={state.values.content}/>
      </label>
      <button type="submit">서버에 저장</button>  
    </form>
  );
}
