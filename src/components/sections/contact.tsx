"use client"

import { Mail, Copy, MessageCircle, Key, Download } from "lucide-react"
import { toast } from "sonner"
import { useReveal } from "@/hooks/use-reveal"
import { useI18n } from "@/lib/i18n"

export default function Contact() {
  const ref = useReveal<HTMLDivElement>()
  const { t } = useI18n()

  const copyText = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast.success(`${label} ${t("contact.copySuccess") || "copied!"}`)
    } catch {
      toast.error(t("contact.copyError") || "Failed to copy.")
    }
  }

  return (
    <section id="contact" className="relative px-4 sm:px-6 py-20">
      <div ref={ref} className="reveal mx-auto max-w-2xl text-center">
        <span className="specimen-badge mb-2">SECTION // 04</span>
        <h2 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-2">
          {t("contact.title") || "Communication & Registry"}
        </h2>
        <div className="mx-auto mt-3 mb-6 h-px w-12 bg-foreground" />
        <p className="font-body text-base text-muted-foreground mb-8">
          {t("contact.subtitle") || "Direct dispatch and encrypted communication channels."}
        </p>

        {/* Contact Action Cards */}
        <div className="mx-auto mb-8 grid max-w-md gap-3 text-left">
          <button
            type="button"
            onClick={() => copyText("tarisu.international@gmail.com", "Email")}
            className="specimen-card flex items-center justify-between p-3.5 font-meta text-xs transition-colors hover:border-foreground cursor-pointer"
          >
            <span className="inline-flex items-center gap-2.5 font-medium text-foreground">
              <Mail className="size-4 text-muted-foreground" />
              <span>tarisu.international@gmail.com</span>
            </span>
            <Copy className="size-3.5 text-muted-foreground" />
          </button>

          <button
            type="button"
            onClick={() => copyText("cuntrina1310", "Discord ID")}
            className="specimen-card flex items-center justify-between p-3.5 font-meta text-xs transition-colors hover:border-foreground cursor-pointer"
          >
            <span className="inline-flex items-center gap-2.5 font-medium text-foreground">
              <MessageCircle className="size-4 text-muted-foreground" />
              <span>Discord: cuntrina1310</span>
            </span>
            <Copy className="size-3.5 text-muted-foreground" />
          </button>
        </div>

        {/* GPG Key Specimen Block */}
        <div className="mx-auto max-w-md specimen-card p-5 text-left">
          <div className="mb-2 flex items-center justify-between border-b border-border pb-2 font-meta text-xs">
            <span className="inline-flex items-center gap-1.5 font-semibold uppercase tracking-wider text-foreground">
              <Key className="size-3.5" />
              <span>{t("contact.gpgTitle") || "GPG FINGERPRINT"}</span>
            </span>
            <span className="font-mono text-[10px] text-muted-foreground">ED25519</span>
          </div>

          <code className="block break-all font-mono text-xs text-foreground bg-box p-2.5 rounded-[3px] border border-border/80 my-2.5 select-all">
            012F C938 02BA C1FE 39D0 DC2D E016 3CBB 19B5 FFC1
          </code>

          <div className="flex items-center justify-between pt-1">
            <span className="font-meta text-[11px] text-muted-foreground">
              tarisu.international@gmail.com
            </span>
            <a
              href="/keichan.asc"
              download
              className="inline-flex items-center gap-1.5 rounded-[3px] border border-border bg-box px-2.5 py-1 font-meta text-[11px] font-medium uppercase tracking-wider text-foreground transition-colors hover:border-foreground"
            >
              <Download className="size-3" />
              <span>{t("contact.downloadGpg") || "PUBLIC KEY"}</span>
            </a>
          </div>
        </div>

        {/* Colophon & Footer */}
        <footer className="mt-16 pt-8 border-t border-border font-meta text-xs text-muted-foreground">
          <p className="tracking-wider uppercase">
            {t("contact.madeWith") || "KeiChan • Systems Engineering & Editorial Design System"}
          </p>
          <p className="text-[11px] mt-1 text-muted-foreground/70">
            Typography System: Instrument Serif • Instrument Sans • Lora • Public Sans
          </p>
        </footer>
      </div>
    </section>
  )
}