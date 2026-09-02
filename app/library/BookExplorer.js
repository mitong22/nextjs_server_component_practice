
'use client'

import { useState } from "react";

// page.js에서 DB 조회 결과를 initialBooks라는 이름으로 전달받음
export default function BookExplorer({ initialBooks }) {
  console.log("data!!!!", JSON.stringify(initialBooks));

  // 검색어 쿼리
  const [query, setQuery] = useState("");
  // 주제 select optipn에 대한 상태 변화 함수
  const [topic, setTopic] = useState("");

  // input에서 입력받은 text를 앞뒤 공백과 영어 대소문자가 검색 결과에 영향을 주지 않도록 변환
  const normalizedQuery = query.trim().toLowerCase(); // 
  console.log("normalizedQuery: ", normalizedQuery);

  // 전달받은 전체 도서 목록에서 검색어와 주제 조건에 맞는 도서만 가져옴
  const books = initialBooks.filter((data) => {
    // 검색어가 없거나, 책 제목 또는 저자에 검색어가 포함되어 있으면 true
    const matchesQuery = normalizedQuery === "" || 
                        data.title.toLowerCase().includes(normalizedQuery) || 
                        data.author.toLowerCase().includes(normalizedQuery);
                        
    // 선택한 주제가 없거나, 책의 주제와 선택한 주제가 같으면 true
    const matchesTopic = topic === "" || data.topic === topic;

    // 검색어 조건과 주제 조건을 모두 만족하는 도서만 남김
    return matchesQuery && matchesTopic;
  });

  // 주제 선택 목록을 만들기 위해 중복된 주제를 Set으로 제거한 뒤 다시 배열로 변환
  const topics = [...new Set(initialBooks.map((data) => data.topic))];

  return (
    <>
      <div>
        <label>
          제목 또는 저자
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="입력 즉시 필터링"/>
        </label>
        <label>
          주제
          <select value={topic} onChange={(e) => setTopic(e.target.value)}>
            <option value="">전체</option>
            {topics.map((data) => (
              <option key={data} value={data}>{data}</option>
            ))}
          </select>
        </label>
      </div>

      <p>브라우저에서 표시 중: {books.length} 권</p>
      <div>
        {books.map((data) => (
          <article key={data.title}>
            <h3>{data.title}</h3>
            <p>{data.author} / {data.topic}</p>
            <small>{data.description}</small>
          </article>
        ))}
      </div>
    </>  
  )
}
