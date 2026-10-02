import { getAllNews } from "@/lib/news"
import NewsList from "@/components/news-list"

export const metadata = {
  title: "Bản Tin Kinh Tế & Tài Chính Hàng Ngày | KeiChan",
  description: "Tổng hợp và phân tích dữ liệu kinh tế vĩ mô, GDP, thị trường ngoại hối, vàng, dầu mỏ và chính sách tiền tệ với nguồn kiểm chứng độc lập.",
}

export default function NewsPage() {
  const news = getAllNews()

  return (
    <main className="mx-auto max-w-5xl px-4 sm:px-6 pt-24 sm:pt-28 pb-16">
      <NewsList news={news} />
    </main>
  )
}
