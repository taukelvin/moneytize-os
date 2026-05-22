"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const navLinks = [
  { label: "Scanner", href: "#platform" },
  { label: "Reports", href: "#solutions" },
  { label: "Pricing", href: "#pricing" },
  { label: "Enterprise", href: "#enterprise" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)

    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/75 backdrop-blur-xl border-b border-border/60 py-3 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
          : "bg-transparent py-5"
      }`}
    >

      <nav className="max-w-[1380px] mx-auto px-6 lg:px-10 flex items-center justify-between">

        {/* LOGO */}

        <motion.a
          href="#"
          className="flex items-center gap-3"
          whileHover={{ scale: 1.015 }}
        >

          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/10">

            <span className="text-white font-semibold text-sm">
              M
            </span>

          </div>

          <div className="flex flex-col leading-none">

            <span className="font-semibold text-[17px] tracking-tight text-foreground">
              Moneytize<span className="text-primary">-OS</span>
            </span>

            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Opportunity Scanner
            </span>

          </div>

        </motion.a>

        {/* DESKTOP LINKS */}

        <div className="hidden lg:flex items-center gap-1 bg-white/60 backdrop-blur-md border border-border/60 rounded-full px-2 py-1 shadow-sm">

          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-all rounded-full hover:bg-secondary"
            >
              {link.label}
            </a>
          ))}

        </div>

        {/* DESKTOP CTA */}

        <div className="hidden lg:flex items-center gap-3">

          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground rounded-full px-5"
          >
            Sign in
          </Button>

          <Button
            size="sm"
            className="bg-foreground hover:bg-foreground/90 text-white rounded-full px-6 shadow-lg shadow-black/5"
          >
            Run Free Scan
          </Button>

        </div>

        {/* MOBILE BUTTON */}

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden w-11 h-11 rounded-full border border-border/60 bg-white/70 backdrop-blur-md flex items-center justify-center text-foreground shadow-sm"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

      </nav>

      {/* MOBILE MENU */}

      <AnimatePresence>

        {mobileOpen && (

          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden px-5 pt-2"
          >

            <div className="rounded-3xl bg-white/92 backdrop-blur-xl border border-border/60 shadow-2xl overflow-hidden">

              <div className="flex flex-col p-5">

                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="px-4 py-3 rounded-2xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}

                <div className="pt-5 mt-5 border-t border-border/60 flex flex-col gap-3">

                  <Button
                    variant="outline"
                    className="rounded-full h-11"
                  >
                    Sign in
                  </Button>

                  <Button className="rounded-full h-11 bg-foreground hover:bg-foreground/90 text-white">
                    Run Free Scan
                  </Button>

                </div>

              </div>

            </div>

          </motion.div>

        )}

      </AnimatePresence>

    </motion.header>
  )
}