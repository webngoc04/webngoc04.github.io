"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { BarChart3, AlertTriangle, Brain, Cpu, Zap, RefreshCw } from "lucide-react"

export function APCspScoreChart() {
  const [selectedYear, setSelectedYear] = useState<"all" | "2021" | "2023" | "2024">("all")
  const [activeScore, setActiveScore] = useState<string | null>(null)

  const data = [
    { score: "Điểm 5 (Xuất sắc)", key: "5", y2021: 12.4, y2023: 11.5, y2024: 10.8, color: "bg-emerald-500", lightColor: "#10b981" },
    { score: "Điểm 4 (Tốt)", key: "4", y2021: 21.7, y2023: 22.9, y2024: 21.6, color: "bg-blue-500", lightColor: "#3b82f6" },
    { score: "Điểm 3 (Đạt)", key: "3", y2021: 32.5, y2023: 33.3, y2024: 31.4, color: "bg-amber-500", lightColor: "#f59e0b" },
    { score: "Điểm 2 (Chưa đạt)", key: "2", y2021: 20.0, y2023: 19.3, y2024: 20.1, color: "bg-orange-500", lightColor: "#f97316" },
    { score: "Điểm 1 (Trượt)", key: "1", y2021: 13.4, y2023: 13.0, y2024: 16.1, color: "bg-rose-500", lightColor: "#f43f5e" },
  ]

  const years = [
    { id: "all", label: "So sánh tất cả", badge: "2021 vs 2023 vs 2024" },
    { id: "2021", label: "2021", badge: "Trước GenAI (Bài về nhà 100%)" },
    { id: "2023", label: "2023", badge: "GenAI Bùng nổ (Bài làm ảo)" },
    { id: "2024", label: "2024", badge: "Siết quy chế thi trực tiếp PPR" },
  ] as const

  const maxVal = 35

  return (
    <div className="my-8 rounded-2xl border bg-card/80 p-5 sm:p-6 shadow-sm backdrop-blur-sm transition-all hover:shadow-md">
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b pb-4">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="size-5 text-pink-500" />
            <h3 className="text-lg font-bold text-foreground">Phổ Điểm AP Computer Science Principles (College Board)</h3>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Số liệu thống kê chính thức đối chiếu từ College Board & Trevor Packer
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 text-xs">
            2021: Gốc
          </Badge>
          <Badge variant="outline" className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 text-xs">
            2023: AI Boom
          </Badge>
          <Badge variant="outline" className="bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20 text-xs">
            2024: In-Person PPR (Siết)
          </Badge>
        </div>
      </div>

      {/* Year selector buttons */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-muted-foreground mr-1">Chế độ xem:</span>
        {years.map((y) => (
          <button
            key={y.id}
            type="button"
            onClick={() => setSelectedYear(y.id)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
              selectedYear === y.id
                ? "bg-pink-600 text-white shadow-sm dark:bg-pink-500"
                : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            {y.label}
          </button>
        ))}
      </div>

      {/* Bar Chart Visualization */}
      <div className="space-y-4">
        {data.map((item) => (
          <div
            key={item.key}
            onMouseEnter={() => setActiveScore(item.key)}
            onMouseLeave={() => setActiveScore(null)}
            className={`rounded-xl p-2.5 transition-all ${
              activeScore === item.key ? "bg-accent/50 scale-[1.01]" : ""
            }`}
          >
            <div className="mb-1.5 flex items-center justify-between text-xs sm:text-sm">
              <span className="font-semibold text-foreground flex items-center gap-2">
                <span className={`inline-block size-2.5 rounded-full ${item.color}`} />
                {item.score}
              </span>
              <span className="text-xs font-mono text-muted-foreground">
                {selectedYear === "all"
                  ? `2021: ${item.y2021}% | 2023: ${item.y2023}% | 2024: ${item.y2024}%`
                  : `${selectedYear}: ${item[`y${selectedYear}` as keyof typeof item]}%`}
              </span>
            </div>

            {/* Bars */}
            <div className="space-y-1.5">
              {(selectedYear === "all" || selectedYear === "2021") && (
                <div className="flex items-center gap-2">
                  <span className="w-10 text-[10px] text-muted-foreground">2021</span>
                  <div className="h-3.5 flex-1 rounded-full bg-muted/40 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-emerald-500/75 transition-all duration-700"
                      style={{ width: `${(item.y2021 / maxVal) * 100}%` }}
                    />
                  </div>
                  <span className="w-12 text-right text-xs font-mono font-medium">{item.y2021}%</span>
                </div>
              )}

              {(selectedYear === "all" || selectedYear === "2023") && (
                <div className="flex items-center gap-2">
                  <span className="w-10 text-[10px] text-muted-foreground">2023</span>
                  <div className="h-3.5 flex-1 rounded-full bg-muted/40 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-amber-500/75 transition-all duration-700"
                      style={{ width: `${(item.y2023 / maxVal) * 100}%` }}
                    />
                  </div>
                  <span className="w-12 text-right text-xs font-mono font-medium">{item.y2023}%</span>
                </div>
              )}

              {(selectedYear === "all" || selectedYear === "2024") && (
                <div className="flex items-center gap-2">
                  <span className="w-10 text-[10px] text-muted-foreground">2024</span>
                  <div className="h-3.5 flex-1 rounded-full bg-muted/40 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-rose-500/85 transition-all duration-700"
                      style={{ width: `${(item.y2024 / maxVal) * 100}%` }}
                    />
                  </div>
                  <span className="w-12 text-right text-xs font-mono font-medium font-bold text-rose-600 dark:text-rose-400">
                    {item.y2024}%
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Insights Box */}
      <div className="mt-5 rounded-xl bg-rose-500/10 border border-rose-500/20 p-3.5 text-xs text-foreground flex items-start gap-2.5">
        <AlertTriangle className="size-4 text-rose-500 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-rose-600 dark:text-rose-400">Tác động thực tế năm 2024: </span>
          Sau khi College Board bắt buộc thi <strong>Written Responses tập trung 60 phút có giám thị</strong> (chỉ mang ảnh chụp code PPR), 
          tỷ lệ <strong>Điểm 1 (Trượt) tăng vọt từ 13.0% lên 16.1%</strong> (+3.1%), còn Điểm 5 hạ về 10.8%.
        </div>
      </div>
    </div>
  )
}

export function CognitiveAtrophyDiagram() {
  const [activeStep, setActiveStep] = useState<number>(0)

  const steps = [
    {
      id: 0,
      title: "1. Lạm dụng AI & Copy-Paste Prompt",
      icon: Cpu,
      badge: "Giai đoạn 1",
      badgeColor: "bg-blue-500/10 text-blue-600 border-blue-500/20",
      desc: "Bê nguyên task, nguyên code ném cho AI. Không đọc lại, không suy nghĩ logic.",
      risk: "Tập thói quen lười vận động tư duy.",
    },
    {
      id: 1,
      title: "2. Ảo giác hiểu biết (Illusion of Competence)",
      icon: Zap,
      badge: "Giai đoạn 2",
      badgeColor: "bg-amber-500/10 text-amber-600 border-amber-500/20",
      desc: "Thấy AI giải thích trôi chảy, ngộ nhận: 'À cái này dễ quá, mình hiểu rồi!'.",
      risk: "Mất khả năng tự viết từ trang giấy trắng.",
    },
    {
      id: 2,
      title: "3. Teo cơ nhận thức (Cognitive Atrophy)",
      icon: Brain,
      badge: "Giai đoạn 3",
      badgeColor: "bg-orange-500/10 text-orange-600 border-orange-500/20",
      desc: "Não bộ thoái hóa khả năng tập trung sâu (Deep Work), suy nghĩ trừu tượng và ghi nhớ lâu.",
      risk: "Phụ thuộc 100% vào công cụ bên ngoài.",
    },
    {
      id: 3,
      title: "4. Bất lực khi gặp Outage / Bug Production",
      icon: AlertTriangle,
      badge: "Giai đoạn 4",
      badgeColor: "bg-rose-500/10 text-rose-600 border-rose-500/20",
      desc: "Hệ thống sập khẩn cấp, AI nhả câu trả lời bừa hoặc bị ảo giác. Dev hoảng loạn không biết sửa.",
      risk: "Gây thiệt hại nghiêm trọng cho hệ thống.",
    },
    {
      id: 4,
      title: "5. Trả giá đắt & Bị đào thải",
      icon: RefreshCw,
      badge: "Giai đoạn 5",
      badgeColor: "bg-purple-500/10 text-purple-600 border-purple-500/20",
      desc: "Học sinh ăn điểm 0 thi trực tiếp; Lập trình viên mất uy tín chuyên môn và khả năng cạnh tranh.",
      risk: "Biến thành công cụ bị thay thế.",
    },
  ]

  return (
    <div className="my-8 rounded-2xl border bg-card/80 p-5 sm:p-6 shadow-sm backdrop-blur-sm">
      <div className="mb-4 flex items-center justify-between border-b pb-3">
        <div className="flex items-center gap-2">
          <Brain className="size-5 text-pink-500" />
          <h3 className="text-lg font-bold text-foreground">Sơ Đồ Vòng Lặp Teo Cơ Nhận Thức (Cognitive Atrophy Loop)</h3>
        </div>
        <Badge variant="outline" className="bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20 text-xs">
          Interactive Flow
        </Badge>
      </div>

      {/* Timeline Steps */}
      <div className="grid gap-3 sm:grid-cols-5">
        {steps.map((step) => {
          const Icon = step.icon
          const isActive = activeStep === step.id

          return (
            <button
              key={step.id}
              type="button"
              onClick={() => setActiveStep(step.id)}
              className={`flex flex-col items-start rounded-xl border p-3 text-left transition-all ${
                isActive
                  ? "border-pink-500 bg-pink-500/10 shadow-sm ring-1 ring-pink-500/30"
                  : "border-border/60 bg-muted/30 hover:border-pink-500/40 hover:bg-muted/70"
              }`}
            >
              <div className="mb-2 flex items-center justify-between w-full">
                <span className={`rounded-lg p-1.5 ${isActive ? "bg-pink-600 text-white" : "bg-muted text-muted-foreground"}`}>
                  <Icon className="size-4" />
                </span>
                <span className="text-[10px] font-bold text-muted-foreground">0{step.id + 1}</span>
              </div>
              <span className="text-xs font-bold leading-snug line-clamp-2 text-foreground mb-1">
                {step.title.split(". ")[1]}
              </span>
              <Badge variant="outline" className={`text-[10px] ${step.badgeColor}`}>
                {step.badge}
              </Badge>
            </button>
          )
        })}
      </div>

      {/* Active Step Details */}
      <div className="mt-4 rounded-xl border bg-accent/40 p-4 transition-all">
        <div className="flex items-center gap-2 mb-2">
          <Badge className="bg-pink-600 text-white text-xs">
            Bước {activeStep + 1}: {steps[activeStep].title.split(". ")[1]}
          </Badge>
        </div>
        <p className="text-sm text-foreground font-medium mb-1">
          {steps[activeStep].desc}
        </p>
        <p className="text-xs text-rose-600 dark:text-rose-400 font-semibold flex items-center gap-1">
          <AlertTriangle className="size-3.5 shrink-0" />
          Rủi ro lớn nhất: {steps[activeStep].risk}
        </p>
      </div>
    </div>
  )
}

export function RepoStarComparisonChart() {
  const stars = {
    linux: 185000,
    edk2: 4600,
    autoGpt: 170000,
  }

  const maxStars = Math.max(stars.linux, stars.edk2, stars.autoGpt, 1)

  return (
    <div className="my-8 rounded-2xl border bg-card/80 p-5 sm:p-6 shadow-sm backdrop-blur-sm">
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b pb-4">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="size-5 text-pink-500" />
            <h3 className="text-lg font-bold text-foreground">Đối Chiếu GitHub Stars: Hạ Tầng Cốt Lõi vs. AI Repo Phong Trào</h3>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Số liệu GitHub Star công khai đối chiếu giữa EDK2, Linux Kernel và AutoGPT (AI Agent Hype Repo)
          </p>
        </div>
        <Badge variant="outline" className="bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20 text-xs">
          Public GitHub Stars
        </Badge>
      </div>

      <div className="space-y-4">
        {/* Linux */}
        <div className="rounded-xl border bg-accent/30 p-3">
          <div className="flex justify-between items-center text-xs sm:text-sm font-semibold mb-1">
            <span className="text-foreground">torvalds/linux (Kernel Hệ điều hành toàn cầu)</span>
            <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">~185,000 ⭐</span>
          </div>
          <div className="h-3 rounded-full bg-muted overflow-hidden">
            <div className="h-full bg-emerald-500 transition-all duration-700" style={{ width: `${(stars.linux / maxStars) * 100}%` }} />
          </div>
        </div>

        {/* AutoGPT */}
        <div className="rounded-xl border bg-accent/30 p-3">
          <div className="flex justify-between items-center text-xs sm:text-sm font-semibold mb-1">
            <span className="text-foreground">Significant-Gravitas/AutoGPT (Repo AI Agent phong trào bùng nổ)</span>
            <span className="font-mono text-purple-600 dark:text-purple-400 font-bold">~170,000 ⭐ (Tăng vọt qua đêm)</span>
          </div>
          <div className="h-3 rounded-full bg-muted overflow-hidden">
            <div className="h-full bg-purple-500 transition-all duration-700" style={{ width: `${(stars.autoGpt / maxStars) * 100}%` }} />
          </div>
        </div>

        {/* EDK2 */}
        <div className="rounded-xl border bg-accent/30 p-3">
          <div className="flex justify-between items-center text-xs sm:text-sm font-semibold mb-1">
            <span className="text-foreground">tianocore/edk2 (Framework UEFI Khởi động PC/Server)</span>
            <span className="font-mono text-amber-600 dark:text-amber-400 font-bold">~4,600 ⭐ (Thấp bất ngờ)</span>
          </div>
          <div className="h-3 rounded-full bg-muted overflow-hidden">
            <div className="h-full bg-amber-500 transition-all duration-700" style={{ width: `${(stars.edk2 / maxStars) * 100}%` }} />
          </div>
        </div>
      </div>

      <div className="mt-4 text-xs text-muted-foreground">
        *Một repo AI Agent vừa nổi có thể đạt ~170k stars qua đêm nhờ truyền thông, áp sát cả Linux Kernel (~185k) và áp đảo EDK2 (~4.6k). Số Star chỉ phản ánh độ nổi tiếng ngắn hạn, không phải giá trị hạ tầng thực tế!
      </div>
    </div>
  )
}

export function AIBenchmarksChart() {
  const [filter, setFilter] = useState<"all" | "old" | "modern">("all")
  const [activeItem, setActiveItem] = useState<string | null>(null)

  const benchmarks = [
    {
      id: "mmlu",
      name: "MMLU / GSM8K / HumanEval",
      category: "old",
      type: "Bộ test truyền thống (Cũ)",
      status: "Dễ Overfit / Học thuộc",
      badgeColor: "bg-rose-500/10 text-rose-600 border-rose-500/20",
      barColor: "bg-rose-500",
      relevanceScore: 35,
      desc: "Chủ yếu là câu hỏi trắc nghiệm phổ biến hoặc bài tập toán/code mẫu cơ bản. Các model dễ dàng 'học thuộc lòng' bộ đề.",
      verdict: "Không phản ánh đúng khả năng suy luận phức tạp trong thực tế.",
    },
    {
      id: "swebench",
      name: "SWE-bench (Software Engineering)",
      category: "modern",
      type: "Bộ test thực chiến",
      status: "Giải bug Repo GitHub thực tế",
      badgeColor: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
      barColor: "bg-emerald-500",
      relevanceScore: 95,
      desc: "Yêu cầu AI tự đọc codebase lớn, tìm nguyên nhân lỗi, tự viết patch và pass toàn bộ unit test của repository thật.",
      verdict: "Thước đo sống còn cho các AI Agent chuyên về lập trình.",
    },
    {
      id: "bfcl",
      name: "BFCL (Berkeley Function Calling)",
      category: "modern",
      type: "Bộ test thực chiến",
      status: "Gọi hàm & Dùng công cụ (Tool Use)",
      badgeColor: "bg-cyan-500/10 text-cyan-600 border-cyan-500/20",
      barColor: "bg-cyan-500",
      relevanceScore: 90,
      desc: "Kiểm tra chính xác khả năng chọn đúng API, truyền tham số JSON chuẩn và tương tác với dịch vụ bên ngoài.",
      verdict: "Quyết định trực tiếp độ ổn định khi tích hợp AI vào hệ thống.",
    },
    {
      id: "ifeval",
      name: "IFEval (Instruction Following)",
      category: "modern",
      type: "Bộ test thực chiến",
      status: "Tuân thủ ràng buộc dài",
      badgeColor: "bg-purple-500/10 text-purple-600 border-purple-500/20",
      barColor: "bg-purple-500",
      relevanceScore: 88,
      desc: "Đo khả năng tuân thủ các quy tắc khắt khe trong System Prompt (định dạng, từ khóa, độ dài, quy trình).",
      verdict: "Giúp đánh giá AI có bị 'ngó lơ' câu lệnh khi prompt quá dài hay không.",
    },
  ]

  const filtered = filter === "all" ? benchmarks : benchmarks.filter((b) => b.category === filter)

  return (
    <div className="my-8 rounded-2xl border bg-card/80 p-5 sm:p-6 shadow-sm backdrop-blur-sm">
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b pb-4">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="size-5 text-pink-500" />
            <h3 className="text-lg font-bold text-foreground">So Sánh Bộ Benchmark AI: Cũ vs. Thực Chiến Modern</h3>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Đừng chỉ nhìn vào MMLU score. Mức độ phản ánh năng lực thực tế giữa các bộ test rất khác nhau.
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <Badge variant="outline" className="bg-rose-500/10 text-rose-600 text-xs">Cũ: Dễ Overfit</Badge>
          <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 text-xs">Modern: Đánh giá Agent</Badge>
        </div>
      </div>

      <div className="mb-5 flex items-center gap-2">
        <span className="text-xs font-semibold text-muted-foreground">Lọc theo loại:</span>
        <button
          type="button"
          onClick={() => setFilter("all")}
          className={`rounded-lg px-3 py-1 text-xs font-medium transition-all ${
            filter === "all" ? "bg-pink-600 text-white" : "bg-muted text-muted-foreground hover:text-foreground"
          }`}
        >
          Tất cả
        </button>
        <button
          type="button"
          onClick={() => setFilter("old")}
          className={`rounded-lg px-3 py-1 text-xs font-medium transition-all ${
            filter === "old" ? "bg-pink-600 text-white" : "bg-muted text-muted-foreground hover:text-foreground"
          }`}
        >
          Bộ test cũ (Lỗi thời)
        </button>
        <button
          type="button"
          onClick={() => setFilter("modern")}
          className={`rounded-lg px-3 py-1 text-xs font-medium transition-all ${
            filter === "modern" ? "bg-pink-600 text-white" : "bg-muted text-muted-foreground hover:text-foreground"
          }`}
        >
          Bộ test thực chiến
        </button>
      </div>

      <div className="space-y-3">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveItem(activeItem === item.id ? null : item.id)}
            className={`rounded-xl border p-4 cursor-pointer transition-all ${
              activeItem === item.id ? "bg-pink-500/10 border-pink-500/40 shadow-md" : "bg-accent/20 hover:bg-accent/40"
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-foreground">{item.name}</span>
                <Badge variant="outline" className={`text-[10px] ${item.badgeColor}`}>{item.status}</Badge>
              </div>
              <span className="text-xs font-mono font-medium text-muted-foreground">
                Độ phản ánh thực tế: <strong className="text-foreground">{item.relevanceScore}%</strong>
              </span>
            </div>

            <div className="h-2.5 rounded-full bg-muted overflow-hidden mb-2">
              <div className={`h-full ${item.barColor} transition-all duration-700`} style={{ width: `${item.relevanceScore}%` }} />
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>

            {activeItem === item.id && (
              <div className="mt-3 pt-2 border-t border-border/60 text-xs font-semibold text-pink-600 dark:text-pink-400">
                💡 Nhận xét chuyên sâu: {item.verdict}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export function GoldenRatioAppDiagram() {
  const [selectedSection, setSelectedSection] = useState<number>(0)

  const sections = [
    {
      ratio: "60%",
      title: "Giao diện (UI/UX)",
      color: "bg-pink-500",
      borderColor: "border-pink-500",
      textColor: "text-pink-600 dark:text-pink-400",
      bgColor: "bg-pink-500/10",
      focus: "Trải nghiệm người dùng, tương tác trực quan & luồng sử dụng.",
      aiBehavior: "AI rất mạnh trong việc sinh layout và HTML/CSS nhanh, nhưng cần con người căn chỉnh tính thẩm mỹ và luồng UX chính xác.",
    },
    {
      ratio: "20%",
      title: "Logic Nghiệp Vụ",
      color: "bg-cyan-500",
      borderColor: "border-cyan-500",
      textColor: "text-cyan-600 dark:text-cyan-400",
      bgColor: "bg-cyan-500/10",
      focus: "Cấu trúc dữ liệu, luồng tính toán cốt lõi.",
      aiBehavior: "AI có thể viết function nhanh, nhưng rất dễ sót các trường hợp biên (edge cases) nếu không được phản biện kỹ.",
    },
    {
      ratio: "10%",
      title: "Bảo Mật (Security)",
      color: "bg-amber-500",
      borderColor: "border-amber-500",
      textColor: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-500/10",
      focus: "Phân quyền, sanitize input, bảo vệ API keys.",
      aiBehavior: "Mặc định AI làm việc theo tư duy 'chạy được ngay', rất lơ là khâu bảo mật. Con người phải tự cài rào chắn.",
    },
    {
      ratio: "10%",
      title: "Nâng Cấp & Bảo Trì",
      color: "bg-purple-500",
      borderColor: "border-purple-500",
      textColor: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-500/10",
      focus: "Quy hoạch codebase, refactor để dễ mở rộng tương lai.",
      aiBehavior: "AI hiếm khi tự suy nghĩ cho tương lai xa trừ khi bạn đưa ra Prompt quy định rõ cấu trúc modular.",
    },
  ]

  return (
    <div className="my-8 rounded-2xl border bg-card/80 p-5 sm:p-6 shadow-sm backdrop-blur-sm">
      <div className="mb-4 flex items-center justify-between border-b pb-3">
        <div>
          <h3 className="text-lg font-bold text-foreground">Sơ Đồ Tỷ Lệ Vàng 60 - 20 - 10 - 10 Khi Làm App Với AI</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Click vào từng phần để xem cách phân bổ công sức & hành vi AI tương ứng</p>
        </div>
        <Badge variant="outline" className="bg-pink-500/10 text-pink-600 text-xs">Golden Ratio</Badge>
      </div>

      <div className="mb-6 flex h-8 w-full rounded-xl overflow-hidden p-1 bg-muted/50 gap-1">
        {sections.map((sec, idx) => (
          <button
            key={sec.title}
            type="button"
            onClick={() => setSelectedSection(idx)}
            className={`h-full ${sec.color} transition-all cursor-pointer rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-sm hover:brightness-110 ${
              selectedSection === idx ? "ring-2 ring-foreground" : "opacity-80"
            }`}
            style={{ width: sec.ratio }}
          >
            {sec.ratio}
          </button>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-4 mb-4">
        {sections.map((sec, idx) => (
          <button
            key={sec.title}
            type="button"
            onClick={() => setSelectedSection(idx)}
            className={`p-3 rounded-xl border text-left transition-all ${
              selectedSection === idx ? `${sec.bgColor} ${sec.borderColor} shadow-md` : "bg-accent/20 border-border/60 hover:bg-accent/40"
            }`}
          >
            <span className={`text-lg font-bold block ${sec.textColor}`}>{sec.ratio}</span>
            <span className="text-xs font-semibold text-foreground">{sec.title}</span>
          </button>
        ))}
      </div>

      <div className={`p-4 rounded-xl border ${sections[selectedSection].bgColor} ${sections[selectedSection].borderColor}`}>
        <div className="flex items-center gap-2 mb-2">
          <Badge className={`${sections[selectedSection].color} text-white text-xs`}>
            {sections[selectedSection].ratio} - {sections[selectedSection].title}
          </Badge>
        </div>
        <p className="text-xs text-foreground font-semibold mb-1">
          🎯 Trọng tâm: {sections[selectedSection].focus}
        </p>
        <p className="text-xs text-muted-foreground leading-relaxed">
          ⚡ Hành vi AI: {sections[selectedSection].aiBehavior}
        </p>
      </div>
    </div>
  )
}

export function EightStepWorkflowDiagram() {
  const [currentStep, setCurrentStep] = useState<number>(0)

  const steps = [
    { num: 1, title: "VIẾT CODE", desc: "Giao AI viết từng phần module nhỏ độc lập, không bắt viết từ A-Z một lèo." },
    { num: 2, title: "KIỂM THỬ MODULE", desc: "Chạy thử unit test hoặc test trực tiếp module nhỏ đó trước khi ghép." },
    { num: 3, title: "TEST THỬ VÀO APP", desc: "Gắn module vào ứng dụng chung để kiểm tra khả năng tương tác." },
    { num: 4, title: "PHẢN BIỆN", desc: "Hỏi ngược lại AI về các trường hợp lỗi biên (edge cases) có thể xảy ra." },
    { num: 5, title: "SUY LUẬN", desc: "Yêu cầu AI giải thích lý do tại sao chọn cấu trúc hoặc thuật toán đó." },
    { num: 6, title: "KIỂM TRA GIẢ THUYẾT", desc: "Thử cố tình nhập sai dữ liệu hoặc tạo kịch bản lỗi để kiểm tra sức chịu đựng." },
    { num: 7, title: "KẾT LUẬN", desc: "Đánh giá module có đạt yêu cầu về độ ổn định và logic hay chưa." },
    { num: 8, title: "KẾT LUẬN CUỐI", desc: "Chính thức merge module vào codebase chính và lưu vết lịch sử git." },
  ]

  return (
    <div className="my-8 rounded-2xl border bg-card/80 p-5 sm:p-6 shadow-sm backdrop-blur-sm">
      <div className="mb-4 flex items-center justify-between border-b pb-3">
        <div>
          <h3 className="text-lg font-bold text-foreground">Sơ Đồ Quy Trình Kiểm Thử 8 Bước (Modular Workflow)</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Click vào từng bước hoặc dùng nút điều hướng để xem chi tiết quy trình</p>
        </div>
        <Badge variant="outline" className="bg-cyan-500/10 text-cyan-600 text-xs">8-Step Pipeline</Badge>
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 mb-6">
        {steps.map((s, idx) => (
          <button
            key={s.num}
            type="button"
            onClick={() => setCurrentStep(idx)}
            className={`py-2 px-1 rounded-lg border text-center transition-all ${
              currentStep === idx
                ? "bg-pink-600 text-white border-pink-600 font-bold shadow-md scale-105"
                : "bg-muted/40 text-muted-foreground border-border/60 hover:bg-muted hover:text-foreground"
            }`}
          >
            <span className="block text-[10px]">Bước</span>
            <span className="text-sm font-bold">{s.num}</span>
          </button>
        ))}
      </div>

      <div className="rounded-xl border bg-accent/30 p-4 border-pink-500/30">
        <div className="flex items-center justify-between mb-2">
          <Badge className="bg-pink-600 text-white text-xs">
            Bước {steps[currentStep].num}: {steps[currentStep].title}
          </Badge>
          <div className="flex gap-1.5">
            <button
              type="button"
              disabled={currentStep === 0}
              onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
              className="px-2.5 py-1 text-xs rounded bg-muted hover:bg-muted/80 disabled:opacity-40"
            >
              ← Trước
            </button>
            <button
              type="button"
              disabled={currentStep === steps.length - 1}
              onClick={() => setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1))}
              className="px-2.5 py-1 text-xs rounded bg-pink-600 text-white hover:bg-pink-700 disabled:opacity-40"
            >
              Sau →
            </button>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-foreground leading-relaxed font-medium">
          {steps[currentStep].desc}
        </p>
      </div>
    </div>
  )
}
