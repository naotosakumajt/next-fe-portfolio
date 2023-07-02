import Link from "next/link";
import Header from "@/components/Header";

export default function home() {
  return (
    <div>
      <Header />
      <h1>TOPページ</h1>
      <Link href="/blog/">ブログ一覧へ</Link>
    </div>
  );
}
