"use client"

import { useEffect, useState } from "react"
import { toast } from "sonner"
import {
  Users,
  Activity,
  Droplets,
  Heart,
  Trash2,
  ToggleRight,
  ToggleLeft,
  Pencil,
} from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

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
  const [editOpen, setEditOpen] = useState(false)
  const [selectedDonor, setSelectedDonor] = useState<Donor | null>(null)

  // ================= FETCH DONORS =================
  useEffect(() => {
    fetchDonors()
  }, [])

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
      availability: d.availability || "Active",
    }))

    setDonorList(formatted)
  }

  // ================= DELETE (UI ONLY FOR NOW) =================
  function handleDelete(id: string) {
    const donor = donorList.find((d) => d.id === id)
    setDonorList((prev) => prev.filter((d) => d.id !== id))

    toast.success("Donor removed", {
      description: `${donor?.name} removed.`,
    })
  }

  // ================= TOGGLE =================
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

  // ================= UPDATE DONOR =================
  async function handleUpdate() {
    if (!selectedDonor) return

    const res = await fetch("/api/donors", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selectedDonor),
    })

    const result = await res.json()

    if (result.success) {
      toast.success("Donor updated successfully")
      setEditOpen(false)
      fetchDonors()
    } else {
      toast.error("Update failed")
    }
  }

  // ================= STATS =================
  const totalDonors = donorList.length
  const activeDonors = donorList.filter(
    (d) => d.availability === "Active"
  ).length
  const healthyDonors = donorList.filter(
    (d) => d.healthStatus === "Good"
  ).length
  const bloodGroups = new Set(
    donorList.map((d) => d.bloodGroup)
  ).size

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

      {/* ================= TABLE ================= */}
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
                          onClick={() => {
                            setSelectedDonor(donor)
                            setEditOpen(true)
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>

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

      {/* ================= EDIT MODAL ================= */}
      {selectedDonor && (
        <Dialog open={editOpen} onOpenChange={setEditOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Donor</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <Label>Name</Label>
                <Input
                  value={selectedDonor.name}
                  onChange={(e) =>
                    setSelectedDonor({
                      ...selectedDonor,
                      name: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <Label>Phone</Label>
                <Input
                  value={selectedDonor.phone}
                  onChange={(e) =>
                    setSelectedDonor({
                      ...selectedDonor,
                      phone: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <Label>Location</Label>
                <Input
                  value={selectedDonor.location}
                  onChange={(e) =>
                    setSelectedDonor({
                      ...selectedDonor,
                      location: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <DialogFooter>
              <Button onClick={handleUpdate}>
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}