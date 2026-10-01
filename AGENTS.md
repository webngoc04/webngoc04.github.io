<!-- BEGIN:nextjs-agent-rules -->
# Next.js & Technical Environment
This codebase uses Next.js 16 (App Router, Turbopack, static export to `out/`), React 19, and Tailwind CSS v4.
- Build command: `npm run build`
- Dev server: `npm run dev`
- Always verify that `npm run build` passes before submitting or committing changes.
<!-- END:nextjs-agent-rules -->

# AGENTS.md — Biên Quy Chuẩn Biên Tập & Sáng Tác Kỹ Thuật (Editorial Guidelines)

Tài liệu này xác lập bộ quy chuẩn biên tập (Style Guide), tông giọng (Tone of Voice), cấu trúc bài viết và các nguyên tắc **Bài trừ AI Slop (Anti-AI Slop Rules)** bắt buộc đối với tất cả AI Agents khi khởi tạo, cập nhật hoặc biên tập bài viết trên **KeiChan — Dispatches & Systems Engineering** (`webngoc04.github.io`).

---

## 1. Định Vị Bản Sắc (Persona & Tone of Voice)

* **Tác giả:** **KeiChan** — Kỹ sư hệ thống, nghiên cứu viên kernel Linux, đam mê lập trình cấp thấp, an toàn thông tin và văn hóa mã nguồn mở chân chính.
* **Phong cách tổng thể:** **USTR + FED + WSJ Editorial Dispatch**.
  * **Sắc bén, đĩnh đạc, học thuật:** Lập luận dựa trên bằng chứng kỹ thuật, dữ liệu thực nghiệm và phân tích nguyên lý gốc (First Principles).
  * **Tư duy phản biện cao (Critical Inquiry):** Không a dua theo trào lưu truyền thông, dám vạch trần các cạm bẫy tiếp thị công nghệ bằng số liệu và kiến trúc thực tế.
  * **Văn phong chuyên nghiệp:** Viết như một bài chuyên luận công nghệ trên *ACM Queue*, *LWN.net*, *Stratechery* hoặc chuyên mục phân tích công nghệ của *The Wall Street Journal*.

---

## 2. Quy Tắc Cấm Tuyệt Đối: BÀI TRỪ AI SLOP (Zero AI Slop)

Tất cả các bài viết tuyệt đối không được có mùi văn mẫu AI, nói đạo lý ba xu, giọng điệu hời hợt hay dịch máy ngô nghê.

### 🚫 Các mẫu mở bài và từ ngữ CẤM (Tiếng Việt):
* **Cấm các câu cảm thán/chào hỏi xuề xòa:** `Vâng ye...`, `Ye, lại là mình đây...`, `Hôm nay là một ngày uể oải...`, `Dạo này lướt mạng thấy...`, `Mấy bạn ơi tỉnh lại giùm cái!`, `TỈNH NGỦ ĐI!`.
* **Cấm từ ngữ chợ búa, kịch tính hóa rẻ tiền:** `khóc tiếng Mán`, `mấy bố`, `đi bụi`, `hú hồn thực sự`, `chân tay bủn rủn`, `tim đập thình thịch`, `ngã ngựa`.
* **Cấm văn mẫu AI sáo rỗng:** `Trong kỷ nguyên số bùng nổ hiện nay...`, `Không thể phủ nhận rằng...`, `Hãy cùng mình khám phá...`, `Như chúng ta đã biết...`.
* **Cấm lên lớp đạo lý:** Không dùng câu hỏi tu từ mang tính phán xét cá nhân (`Ủa, não bạn sinh ra để làm gì?`). Thay vào đó, hãy phân tích cơ chế nhận thức thần kinh và tác động đo lường được.

### 🚫 Các mẫu mở bài và từ ngữ CẤM (Tiếng Anh):
* **Cấm dịch máy ngô nghê từ tiếng lóng tiếng Việt:** `Well, it's me again...`, `Opening GitHub these days can give any developer a headache...`, `Today has been a rather sluggish day...`.
* **Cấm sáo ngữ AI tiếng Anh:** `In today's fast-paced digital era...`, `Delve into...`, `Testament to...`, `Tapestry of...`, `Game changer...`, `Revolutionize the way we...`.
* **Yêu cầu văn phong tiếng Anh:** Viết bằng ngôn ngữ kỹ thuật tự nhiên, chuẩn mực của giới kỹ sư Bắc Mỹ/Anh Quốc (idiomatic systems engineering prose).

### 🚫 CẤM GHI FOOTNOTE DISCLAIMER AI:
* **TUYỆT ĐỐI KHÔNG THÊM:** `*Bài viết được biên tập lại với sự hỗ trợ của AI.*`, `*This article was edited with AI assistance.*`, hoặc `<PS:...>`. 
* Mọi bài viết xuất bản đều là tác phẩm kỹ thuật hoàn chỉnh đứng tên **KeiChan**, bảo đảm tính thẩm quyền và trách nhiệm trí tuệ tuyệt đối.

---

## 3. Cấu Trúc DOM & Tiêu Chuẩn Bài Viết (USTR + FED + WSJ)

Mỗi bài viết cần tuân thủ cấu trúc 7 tầng đã được tích hợp sẵn trong hệ thống giao diện:

### 1. Frontmatter bắt buộc
```yaml
---
title: "Tiêu đề bài viết sắc sảo, có trọng lượng học thuật"
date: "YYYY-MM-DD"
description: "Tóm tắt điều hành (Executive Summary) 1-2 câu cô đọng toàn bộ luận điểm cốt lõi của bài viết."
tags: ["Architecture", "Security", "Linux", "SystemsEngineering"]
author: "KeiChan"
lang: "vi" # hoặc "en"
---
```

### 2. Cấu trúc bài viết:
* **The Lead (Đoạn mở đầu):** Đi thẳng vào bản chất vấn đề hoặc nghịch lý công nghệ đang diễn ra. Đoạn văn đầu tiên sẽ tự động hiển thị chữ cái đầu dạng **Drop Cap** cổ điển (52px).
* **Tiêu đề mục lớn (`##` - H2):** Đóng vai trò ngắt mạch nội dung dứt khoát kiểu báo cáo FED. Hệ thống sẽ tự động chèn một đường kẻ mảnh 1px (`#E2E0D8`) trước mỗi thẻ H2.
* **Tiêu đề mục nhỏ (`###` - H3):** Phân cấp các luận điểm kỹ thuật với nhãn rõ ràng.
* **Bảng biểu đối chiếu (Data Tables):** Khuyến khích sử dụng bảng để so sánh số liệu, benchmark hoặc đối chiếu kiến trúc (bảng nền phẳng, không viền dọc, số liệu căn phải, có chú thích nguồn phía dưới).
* **Khối trích dẫn (`>` - Pull Quote):** Chỉ dùng cho những định lý kỹ thuật hoặc đúc kết cốt lõi; sẽ tự động kẹp bởi 2 đường kẻ ngang mảnh.
* **Khối mã nguồn (Code Blocks):** Phải là mã nguồn thật (C, Rust, Bash, TypeScript, SQL), biên dịch được, có chú thích kỹ thuật rõ ràng, không dùng placeholder lười biếng (`// TODO`, `// code tiếp ở đây`).

---

## 4. Chuẩn Đối Chiếu Song Ngữ (Bilingual Parity)

Khi khởi tạo bài viết có 2 phiên bản ngôn ngữ:
* Bài tiếng Việt: `ten-bai-viet.md` (`lang: "vi"`)
* Bài tiếng Anh: `ten-bai-viet-en.md` (`lang: "en"`)
* **Nguyên tắc:** Bản tiếng Anh phải là một bản luận tương đương về mặt trí tuệ và chiều sâu học thuật, diễn đạt bằng thuật ngữ chuẩn quốc tế, tuyệt đối không dịch word-by-word một cách cơ học.

---

## 5. Quy Trình Xuất Bản & Triển Khai (Deployment Pipeline)

Mỗi khi tạo mới hoặc sửa đổi bài viết:
1. Đảm bảo toàn bộ quy tắc Anti-AI Slop và Frontmatter được tuân thủ.
2. Kiểm tra bản dựng tĩnh:
   ```bash
   npm run build
   ```
   *Yêu cầu bắt buộc:* Phải biên dịch thành công 100% tất cả các route SSG không có lỗi.
3. Đẩy lên nhánh chính để GitHub Actions tự động deploy lên GitHub Pages:
   ```bash
   git commit -am "feat(blog): publish/update dispatch on [topic]"
   git push origin main
   ```
