import Link from "next/link"

export default function home () {
  return(
    <div>
      <h1>TOPページ</h1>
      <Link href="/blog/">
        ブログ一覧へ
      </Link>
    </div>
  )
}