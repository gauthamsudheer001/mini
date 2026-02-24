"use client"

import { useState, useMemo } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, MapPin, Phone, Droplets, UserSearch } from "lucide-react"
import { donors, bloodGroups, type Donor } from "@/lib/mock-data"

function DonorCard({ donor }: { donor: Donor }) {
  return (
    <Card className="border-border transition-all hover:border-primary/30 hover:shadow-md">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <h3 className="text-base font-semibold text-foreground">{donor.name}</h3>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              {donor.location}
            </div>
          </div>
          <Badge
            variant={donor.bloodGroup.includes("+") ? "default" : "outline"}
            className="text-sm font-bold"
          >
            {donor.bloodGroup}
          </Badge>
        </div>

        <div className="mt-4 flex flex-col gap-2">

      
        </div>

        <div className="mt-4 flex items-center justify-between">
          <Badge
            variant={donor.availability === "Active" ? "default" : "secondary"}
            className={
              donor.availability === "Active"
                ? "bg-green-600 text-green-50 hover:bg-green-700"
                : "bg-secondary text-muted-foreground"
            }
          >
            {donor.availability}
          </Badge>
          <span className="text-xs text-muted-foreground">
            Health: {donor.healthStatus}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

export function SearchDonors() {
  const [bloodGroupFilter, setBloodGroupFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("")

  const filteredDonors = useMemo(() => {
    return donors.filter((donor) => {
      const matchBlood = bloodGroupFilter === "all" || donor.bloodGroup === bloodGroupFilter
      const matchLocation =
        !locationFilter.trim() ||
        donor.location.toLowerCase().includes(locationFilter.toLowerCase())
      return matchBlood && matchLocation
    })
  }, [bloodGroupFilter, locationFilter])

  function handleClear() {
    setBloodGroupFilter("all")
    setLocationFilter("")
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-24">
      {/* Page Header */}
      <div className="mb-10 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <UserSearch className="h-6 w-6 text-primary" />
        </div>
        <h1 className="text-balance text-3xl font-bold text-foreground sm:text-4xl">
          Search Blood Donors
        </h1>
        <p className="mt-2 text-muted-foreground">
          Find verified blood donors by blood group and location.
        </p>
      </div>

      {/* Filters */}
      <Card className="mb-8 border-border">
        <CardContent className="p-6">
          <div className="flex flex-col items-end gap-4 sm:flex-row">
            <div className="flex w-full flex-1 flex-col gap-2">
              <Label className="text-foreground">Blood Group</Label>
              <Select value={bloodGroupFilter} onValueChange={setBloodGroupFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All blood groups" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Blood Groups</SelectItem>
                  {bloodGroups.map((bg) => (
                    <SelectItem key={bg} value={bg}>
                      {bg}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex w-full flex-1 flex-col gap-2">
              <Label htmlFor="location-search" className="text-foreground">Location</Label>
              <Input
                id="location-search"
                placeholder="Search by city..."
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={handleClear}>
                Clear
              </Button>
              <Button className="gap-2">
                <Search className="h-4 w-4" />
                Search
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results count */}
      <p className="mb-4 text-sm text-muted-foreground">
        {filteredDonors.length} donor{filteredDonors.length !== 1 ? "s" : ""} found
      </p>

      {/* Results */}
      {filteredDonors.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDonors.map((donor) => (
            <DonorCard key={donor.id} donor={donor} />
          ))}
        </div>
      ) : (
        <Card className="border-border">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <Droplets className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-foreground">
              No donors found
            </h3>
            <p className="mt-1 text-center text-sm text-muted-foreground">
              Try adjusting your search filters or check back later.
            </p>
            <Button variant="outline" className="mt-4" onClick={handleClear}>
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
