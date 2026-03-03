"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

type Donor = {
  id: string
  name: string
  bloodGroup: string
  location: string
  healthStatus: string
  availability: string
}

export function SearchDonors() {
  const [donors, setDonors] = useState<Donor[]>([])
  const [bloodFilter, setBloodFilter] = useState("")
  const [locationFilter, setLocationFilter] = useState("")

  useEffect(() => {
    async function fetchDonors() {
      const res = await fetch("/api/donors")
      const data = await res.json()

      const formatted = data.map((d: any) => ({
        id: d._id,
        name: d.name,
        bloodGroup: d.bloodGroup,
        location: d.location,
        healthStatus: d.healthStatus,
        availability: "Active",
      }))

      setDonors(formatted)
    }

    fetchDonors()
  }, [])

  const filtered = donors.filter((d) => {
    return (
      (bloodFilter ? d.bloodGroup === bloodFilter : true) &&
      (locationFilter
        ? d.location.toLowerCase().includes(locationFilter.toLowerCase())
        : true)
    )
  })

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="grid gap-4 md:grid-cols-3">
        <Select onValueChange={setBloodFilter}>
          <SelectTrigger>
            <SelectValue placeholder="All Blood Groups" />
          </SelectTrigger>
          <SelectContent>
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
              <SelectItem key={bg} value={bg}>
                {bg}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          placeholder="Search by city..."
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
        />
      </div>

      <p className="text-sm text-muted-foreground">
        {filtered.length} donors found
      </p>

      {/* Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {filtered.map((donor) => (
          <Card key={donor.id}>
            <CardContent className="p-5 space-y-3">
              <div className="flex justify-between">
                <h3 className="font-semibold">{donor.name}</h3>
                <Badge>{donor.bloodGroup}</Badge>
              </div>

              <p className="text-sm text-muted-foreground">
                📍 {donor.location}
              </p>

              <div className="flex justify-between text-sm">
                <Badge variant="outline">{donor.availability}</Badge>
                <span>Health: {donor.healthStatus}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}