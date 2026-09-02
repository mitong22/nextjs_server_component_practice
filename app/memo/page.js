
'use client';

import { useRef, useState } from "react";

const storageKey = "nextjs-components-memo";

export default function Memo() {
  const [memo, setMemo] = useState("");
  const [message, setMessage] = useState("아직 브라우저 저장소를 읽지 않았습니다.");

  const textareaRef = useRef(null);

  function loadMemo() {
    const savedMemo = window.localStorage.getItem(storageKey) ?? "";
    
    setMemo(savedMemo);
    setMessage(savedMemo ? "저장된 메모를 불러왔습니다." : "저장된 메모가 없습니다");
    
    textareaRef.current?.focus();
  }
  
  function saveMemo() {
    window.localStorage.setItem(storageKey, memo);
    setMessage("메모를 브라우저 저장소에 저장했습니다.");
  }
  
  function clearMemo() {
    window.localStorage.removeItem(storageKey);
    setMemo("");
    setMessage("메모를 브라우저 저장소에서 삭제했습니다.");
    textareaRef.current?.focus();
  } 

  return (
    <>
      <h2>브라우저 메모</h2>
      <p>
        <strong>Client Component 페이지</strong>
        / 상태 / 이벤트 / localStorage 
      </p>
      <p>
        <code>
          &quot;use client&quot; → useState/ useRef → browser event → localStorage
        </code>
      </p>

      <label>
        메모
        <textarea ref={textareaRef} className="memo-area" value={memo}
          onChange={(e) => setMemo(e.target.value)}
          placeholder="이 내용은 서버 DB가 아니라 현재 브라우저에 저장됩니다.">
        </textarea>
      </label>

      <div className="button-row">
        <button type="button" onClick={loadMemo}>불러오기</button>
        <button type="button" onClick={saveMemo}>저장하기</button>
        <button type="button" onClick={clearMemo}>삭제하기</button>
      </div>
      <p aria-live="polite">{message}</p>
    </>
  )
}



