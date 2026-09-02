
import Link from "next/link";

export default function Header (){

  return(
    <>
    <header>
      <h1>Next.js Components</h1>
      <p>
        Server Component를 기본으로, 필요한 부분만 Client Component로 구성합니다.
      </p>
      <nav aria-label="주요 페이지">
      <Link href="/">안내</Link>
      <Link href="/products/all">상품 분류</Link>
      <Link href="/board">게시판</Link>
      <Link href="/memo">브라우저 메모</Link>
      <Link href="/library">도서관</Link>

      </nav>
    </header>
    </>
  )

}