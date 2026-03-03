"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LayoutDashboard,
  Users,
  Activity,
  Trash2,
  ToggleLeft,
  ToggleRight,
  Heart,
  Menu,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"

type Donor = {
  id: string
  name: string
  bloodGroup: string
  phone: string
  location: string
  healthStatus: "Good" | "Under Treatment"
  availability: "Active" | "Unavailable"
}

const sidebarItems = [
  { icon: LayoutDashboard, label: "Overview", id: "overview" },
  { icon: Users, label: "Donors", id: "donors" },
]

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [donorList, setDonorList] = useState<Donor[]>([])
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // 🔥 FETCH DONORS FROM DATABASE
  useEffect(() => {
    async function fetchDonors() {
      try {
        const res = await fetch("/api/donors")
        const data = await res.json()

        const formatted = data.map((d: any) => ({
          id: d._id,
          name: d.name,
          bloodGroup: d.bloodGroup,
          phone: d.phone,
          location: d.location,
          healthStatus: d.healthStatus,
          availability: "Active",
        }))

        setDonorList(formatted)
      } catch (error) {
        console.error("Error fetching donors")
      }
    }

    fetchDonors()
  }, [])

  function handleDelete(id: string) {
    const donor = donorList.find((d) => d.id === id)
    setDonorList((prev) => prev.filter((d) => d.id !== id))

    toast.success("Donor removed", {
      description: `${donor?.name} has been removed.`,
    })
  }

  function handleToggle(id: string) {
    setDonorList((prev) =>
      prev.map((d) =>
        d.id === id
          ? {
              ...d,
              availability:
                d.availability === "Active" ? "Unavailable" : "Active",
            }
          : d
      )
    )
  }

  const totalDonors = donorList.length
  const activeDonors = donorList.filter(
    (d) => d.availability === "Active"
  ).length

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 flex h-full w-64 flex-col border-r bg-card transition-transform lg:static lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between px-5">
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary" />
            <span className="font-bold">Admin</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 p-3">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm",
                activeTab === item.id
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      <div className="flex-1 bg-background p-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-xl font-semibold">
            {activeTab === "overview" ? "Dashboard Overview" : "Manage Donors"}
          </h1>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>

        {activeTab === "overview" && (
          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardContent className="flex items-center gap-4 p-5">
                <Users className="h-6 w-6 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">
                    Total Donors
                  </p>
                  <p className="text-2xl font-bold">{totalDonors}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center gap-4 p-5">
                <Activity className="h-6 w-6 text-green-600" />
                <div>
                  <p className="text-sm text-muted-foreground">
                    Active Donors
                  </p>
                  <p className="text-2xl font-bold">{activeDonors}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "donors" && (
          <Card>
            <CardHeader>
              <CardTitle>All Donors</CardTitle>
            </CardHeader>
            <CardContent>
              {donorList.length === 0 ? (
                <p className="text-muted-foreground">
                  No donors registered yet.
                </p>
              ) : (
                donorList.map((donor) => (
                  <div
                    key={donor.id}
                    className="mb-3 flex items-center justify-between rounded border p-3"
                  >
                    <div>
                      <p className="font-medium">{donor.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {donor.bloodGroup} • {donor.location}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleToggle(donor.id)}
                      >
                        {donor.availability === "Active" ? (
                          <ToggleRight className="h-4 w-4 text-green-600" />
                        ) : (
                          <ToggleLeft className="h-4 w-4" />
                        )}
                      </Button>

                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleDelete(donor.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}