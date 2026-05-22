"use client"

import { motion } from "framer-motion"
import { X, Mail, FileText } from "lucide-react"

const footerLinks = {
  Product: [
    { label: "Scanner", href: "#platform" },
    { label: "Reports", href: "#solutions" },
    { label: "Pricing", href: "#pricing" },
    { label: "Demo Report", href: "#" },
  ],

  Resources: [
    { label: "Affiliate Intelligence", href: "#" },
    { label: "Sponsor Tracking", href: "#" },
    { label: "Creator Research", href: "#" },
    { label: "Revenue Mapping", href: "#" },
  ],

  Company: [
    { label: "About", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
  ],
}

export function Footer() {
  return (
    <footer className="relative border-t border-border/60 bg-white">

      <div className="max-w-[1380px] mx-auto px-6 lg:px-10 py-14 lg:py-16">

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 lg:gap-12">

          {/* BRAND */}

          <div className="col-span-2">

            <motion.a
              href="#"
              className="flex items-center gap-3 mb-5"
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

            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mb-6">
              Discover how creators, websites, and online businesses actually
              make money through affiliate systems, sponsors, funnels,
              and hidden monetization pathways.
            </p>

            {/* SOCIALS */}

            <div className="flex items-center gap-3">

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-all"
              >

                <X className="w-4 h-4" />

              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-all"
              >

                <Mail className="w-4 h-4" />

              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-all"
              >

                <FileText className="w-4 h-4" />

              </a>

            </div>

          </div>

          {/* LINKS */}

          {Object.entries(footerLinks).map(([category, links]) => (

            <div key={category}>

              <h4 className="font-semibold text-foreground mb-4 text-sm tracking-tight">
                {category}
              </h4>

              <ul className="space-y-3">

                {links.map((link) => (

                  <li key={link.label}>

                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>

                  </li>

                ))}

              </ul>

            </div>

          ))}

        </div>

        {/* BOTTOM */}

        <div className="mt-12 pt-6 border-t border-border/60 flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-sm text-muted-foreground text-center md:text-left">
            © {new Date().getFullYear()} Moneytize-OS. Built for creators, operators, and online opportunity hunters.
          </p>

          <div className="flex items-center gap-5">

            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy
            </a>

            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms
            </a>

            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </a>

          </div>

        </div>

      </div>

    </footer>
  )
}