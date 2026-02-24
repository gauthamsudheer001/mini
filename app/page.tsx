import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Search, UserPlus, Droplets, Clock, Shield, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-card">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,oklch(0.52_0.22_24/0.06),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,oklch(0.52_0.22_24/0.04),transparent_50%)]" />

      <div className="relative mx-auto max-w-7xl px-4 py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          {/* Tag */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5 text-sm text-muted-foreground">
            <Droplets className="h-4 w-4 text-primary" />
            <span>Trusted Blood Donor Network</span>
          </div>

          {/* Headline */}
          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Find Blood Donors{" "}
            <span className="text-primary">Near You</span>
          </h1>

          {/* Subtext */}
          <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            In an emergency, every second counts. HemoLink connects patients with verified
            blood donors instantly, helping save lives when it matters most.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="gap-2">
              <Link href="/search">
                <Search className="h-4 w-4" />
                Search Donor
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="gap-2">
              <Link href="/register">
                <UserPlus className="h-4 w-4" />
                Register as Donor
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-4">
            <div className="rounded-xl border border-border bg-card p-4">
              <p className="text-2xl font-bold text-primary sm:text-3xl">500+</p>
              <p className="mt-1 text-sm text-muted-foreground">Registered Donors</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <p className="text-2xl font-bold text-primary sm:text-3xl">50+</p>
              <p className="mt-1 text-sm text-muted-foreground">Cities Covered</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <p className="text-2xl font-bold text-primary sm:text-3xl">1200+</p>
              <p className="mt-1 text-sm text-muted-foreground">Lives Saved</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const features = [
  {
    icon: Search,
    title: "Instant Search",
    description:
      "Search donors by blood group and location. Get results instantly with verified contact information.",
  },
  {
    icon: Clock,
    title: "Real-Time Availability",
    description:
      "See which donors are currently available and their last donation date for safe transfusion planning.",
  },
  {
    icon: Shield,
    title: "Verified Donors",
    description:
      "All donors go through a registration process with health status verification for safe donations.",
  },
  {
    icon: Users,
    title: "Growing Network",
    description:
      "A continuously expanding network of blood donors across multiple cities, always ready to help.",
  },
]

function FeaturesSection() {
  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            How HemoLink Works
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            A simple, efficient platform designed to connect donors with patients quickly and safely.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="group border border-border bg-card transition-all hover:border-primary/30 hover:shadow-md"
            >
              <CardContent className="p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section className="bg-card py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center sm:p-12">
          <Droplets className="mx-auto h-10 w-10 text-primary" />
          <h2 className="mt-4 text-balance text-2xl font-bold text-foreground sm:text-3xl">
            Ready to Save a Life?
          </h2>
          <p className="mt-3 text-pretty text-muted-foreground">
            Join our growing community of blood donors. Your one donation can save up to three lives.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/register">Register Now</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/search">Find a Donor</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <CTASection />
    </>
  )
}
