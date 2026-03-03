"use client"

import { useEffect, useState } from "react"
import { toast } from "sonner"
import {
  Users,
  Activity,
  Droplets,
  Heart,
  Trash2,
  ToggleLeft,
  ToggleRight,
} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

type Donor = {
  id: string
  name: string
  bloodGroup: string
  phone: string
  location: string
  healthStatus: "Good" | "Under Treatment"
  availability: "Active" | "Unavailable"
}

export function AdminDashboard() {
  const [donorList, setDonorList] = useState<Donor[]>([])

  // 🔥 FETCH REAL DATA
  useEffect(() => {
    async function fetchDonors() {
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
    }

    fetchDonors()
  }, [])

  function handleDelete(id: string) {
    const donor = donorList.find((d) => d.id === id)
    setDonorList((prev) => prev.filter((d) => d.id !== id))

    toast.success("Donor removed", {
      description: `${donor?.name} removed successfully.`,
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
  const healthyDonors = donorList.filter(
    (d) => d.healthStatus === "Good"
  ).length
  const bloodGroups = new Set(donorList.map((d) => d.bloodGroup)).size

  return (
    <div className="p-6 space-y-8">

      {/* ================= OVERVIEW CARDS ================= */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <Users className="h-6 w-6 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Total Donors</p>
              <p className="text-2xl font-bold">{totalDonors}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <Activity className="h-6 w-6 text-green-600" />
            <div>
              <p className="text-sm text-muted-foreground">Active Donors</p>
              <p className="text-2xl font-bold">{activeDonors}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <Droplets className="h-6 w-6 text-red-500" />
            <div>
              <p className="text-sm text-muted-foreground">Blood Groups</p>
              <p className="text-2xl font-bold">{bloodGroups}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <Heart className="h-6 w-6 text-green-600" />
            <div>
              <p className="text-sm text-muted-foreground">Healthy Donors</p>
              <p className="text-2xl font-bold">{healthyDonors}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ================= DONOR TABLE ================= */}
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
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b">
                  <tr className="text-left text-muted-foreground">
                    <th className="py-3">Name</th>
                    <th>Blood Group</th>
                    <th>Phone</th>
                    <th>Location</th>
                    <th>Health</th>
                    <th>Status</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {donorList.map((donor) => (
                    <tr
                      key={donor.id}
                      className="border-b hover:bg-muted/40 transition"
                    >
                      <td className="py-3 font-medium">
                        {donor.name}
                      </td>

                      <td>
                        <Badge variant="outline">
                          {donor.bloodGroup}
                        </Badge>
                      </td>

                      <td>{donor.phone}</td>

                      <td>{donor.location}</td>

                      <td>
                        <Badge
                          className={
                            donor.healthStatus === "Good"
                              ? "bg-green-600 text-white"
                              : "bg-secondary"
                          }
                        >
                          {donor.healthStatus}
                        </Badge>
                      </td>

                      <td>
                        <Badge
                          className={
                            donor.availability === "Active"
                              ? "bg-green-600 text-white"
                              : "bg-secondary"
                          }
                        >
                          {donor.availability}
                        </Badge>
                      </td>

                      <td className="text-right space-x-2">
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
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}