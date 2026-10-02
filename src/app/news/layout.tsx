import NewsHeader from "@/components/news-header"

export const metadata = {
  title: "Bản Tin Kinh Tế & Tài Chính | KeiChan Financial Intelligence",
  description: "Điểm tin kinh tế vĩ mô, chính sách tiền tệ, thị trường chứng khoán, vàng, dầu mỏ và dữ liệu tăng trưởng kinh tế xác minh độc lập.",
}

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NewsHeader />
      {children}
    </>
  )
}
