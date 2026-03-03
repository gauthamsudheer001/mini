"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

type Donor = {
  id: string
  name: string
  bloodGroup: string
  location: string
}

export function SearchDonors() {
  const [query, setQuery] = useState("")
  const [donors, setDonors] = useState<Donor[]>([])

  useEffect(() => {
    async function fetchDonors() {
      const res = await fetch("/api/donors")
      const data = await res.json()

      const formatted = data.map((d: any) => ({
        id: d._id,
        name: d.name,
        bloodGroup: d.bloodGroup,
        location: d.location,
      }))

      setDonors(formatted)
    }

    fetchDonors()
  }, [])

  const filtered = donors.filter((d) =>
    d.bloodGroup.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="p-6 flex flex-col gap-6">
      <Input
        placeholder="Search by blood group..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {filtered.length === 0 ? (
        <p className="text-muted-foreground">No donors found.</p>
      ) : (
        filtered.map((donor) => (
          <Card key={donor.id}>
            <CardContent className="p-4">
              <p className="font-medium">{donor.name}</p>
              <p className="text-sm text-muted-foreground">
                {donor.bloodGroup} • {donor.location}
              </p>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}