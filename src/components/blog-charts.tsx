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
    superpower: 30000,
  }

  const maxStars = Math.max(stars.linux, stars.edk2, stars.superpower, 1)

  return (
    <div className="my-8 rounded-2xl border bg-card/80 p-5 sm:p-6 shadow-sm backdrop-blur-sm">
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b pb-4">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="size-5 text-pink-500" />
            <h3 className="text-lg font-bold text-foreground">Đối Chiếu GitHub Stars: Hạ Tầng Cốt Lõi vs. AI Skills Phong Trào</h3>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Số liệu GitHub Star công khai đối chiếu giữa EDK2, Linux Kernel và Superpower AI Skill
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

        {/* Superpower */}
        <div className="rounded-xl border bg-accent/30 p-3">
          <div className="flex justify-between items-center text-xs sm:text-sm font-semibold mb-1">
            <span className="text-foreground">obra/superpower (AI Skills / Plugin phong trào)</span>
            <span className="font-mono text-purple-600 dark:text-purple-400 font-bold">~30,000 ⭐ (Tăng vọt theo truyền thông)</span>
          </div>
          <div className="h-3 rounded-full bg-muted overflow-hidden">
            <div className="h-full bg-purple-500 transition-all duration-700" style={{ width: `${(stars.superpower / maxStars) * 100}%` }} />
          </div>
        </div>
      </div>

      <div className="mt-4 text-xs text-muted-foreground">
        *Số Star chỉ phản ánh độ nổi tiếng truyền thông ngắn hạn, hoàn toàn không phải thước đo tầm quan trọng kỹ thuật thực tế của dự án.
      </div>
    </div>
  )
}
