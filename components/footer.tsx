import { Heart } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Heart className="h-4 w-4 text-primary-foreground" fill="currentColor" />
              </div>
              <span className="text-lg font-bold text-foreground">HemoLink</span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Connecting blood donors with those in need. Every drop counts, every donor matters.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">Quick Links</h3>
            <ul className="mt-3 flex flex-col gap-2">
              <li>
                <Link href="/search" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Search Donors
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Register as Donor
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Admin Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">Emergency Contact</h3>
            <ul className="mt-3 flex flex-col gap-2">
              <li className="text-sm text-muted-foreground">
                Helpline: 1800-XXX-XXXX
              </li>
              <li className="text-sm text-muted-foreground">
                Email: help@hemolink.org
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          {"2026 HemoLink. All rights reserved. Built to save lives."}
        </div>
      </div>
    </footer>
  )
}
