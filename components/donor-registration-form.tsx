"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, UserPlus } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { bloodGroups } from "@/lib/mock-data"

export function DonorRegistrationForm() {
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [email, setEmail] = useState("")
  const [bloodGroup, setBloodGroup] = useState("")
  const [phone, setPhone] = useState("")
  const [location, setLocation] = useState("")
  const [healthStatus, setHealthStatus] = useState("")
  const [previouslyDonated, setPreviouslyDonated] = useState("")
  const [lastDonationDate, setLastDonationDate] = useState<Date | undefined>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  function validate() {
    const newErrors: Record<string, string> = {}

    if (!name.trim()) newErrors.name = "Full name is required"

    if (!age) newErrors.age = "Age is required"
    else if (Number(age) < 18) newErrors.age = "You must be at least 18 years old"

    if (!email.trim()) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Enter a valid email address"

    if (!bloodGroup) newErrors.bloodGroup = "Blood group is required"

    if (!phone.trim()) newErrors.phone = "Phone number is required"
    else if (phone.trim().length < 10)
      newErrors.phone = "Enter a valid phone number"

    if (!location.trim()) newErrors.location = "City is required"

    if (!healthStatus) newErrors.healthStatus = "Health status is required"

    if (!previouslyDonated)
      newErrors.previouslyDonated = "Please select an option"

    if (previouslyDonated === "Yes" && !lastDonationDate)
      newErrors.lastDonationDate = "Last donation date is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!validate()) return

    setIsSubmitting(true)

    setTimeout(() => {
      toast.success("Registration successful!", {
        description: `Thank you ${name}, you have been registered as a ${bloodGroup} donor.`,
      })

      setName("")
      setAge("")
      setEmail("")
      setBloodGroup("")
      setPhone("")
      setLocation("")
      setHealthStatus("")
      setPreviouslyDonated("")
      setLastDonationDate(undefined)
      setErrors({})
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <Card className="mx-auto w-full max-w-xl border-border">
      <CardHeader className="text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <UserPlus className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="text-2xl font-bold text-foreground">
          Register as a Donor
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Fill out the form below to join our blood donor network and help save lives.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* Full Name */}
          <div className="flex flex-col gap-2">
            <Label>Full Name</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={cn(errors.name && "border-destructive")}
            />
            {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
          </div>

          {/* Age */}
          <div className="flex flex-col gap-2">
            <Label>Age</Label>
            <Input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className={cn(errors.age && "border-destructive")}
            />
            {errors.age && <p className="text-sm text-destructive">{errors.age}</p>}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={cn(errors.email && "border-destructive")}
            />
            {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
          </div>

          {/* Blood Group */}
          <div className="flex flex-col gap-2">
            <Label>Blood Group</Label>
            <Select value={bloodGroup} onValueChange={setBloodGroup}>
              <SelectTrigger className={cn(errors.bloodGroup && "border-destructive")}>
                <SelectValue placeholder="Select blood group" />
              </SelectTrigger>
              <SelectContent>
                {bloodGroups.map((bg) => (
                  <SelectItem key={bg} value={bg}>
                    {bg}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.bloodGroup && (
              <p className="text-sm text-destructive">{errors.bloodGroup}</p>
            )}
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-2">
            <Label>Phone Number</Label>
            <Input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={cn(errors.phone && "border-destructive")}
            />
            {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
          </div>

          {/* City */}
          <div className="flex flex-col gap-2">
            <Label>City</Label>
            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className={cn(errors.location && "border-destructive")}
            />
            {errors.location && <p className="text-sm text-destructive">{errors.location}</p>}
          </div>

          {/* Health Status */}
          <div className="flex flex-col gap-2">
            <Label>Health Status</Label>
            <Select value={healthStatus} onValueChange={setHealthStatus}>
              <SelectTrigger className={cn(errors.healthStatus && "border-destructive")}>
                <SelectValue placeholder="Select health status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Good">Good</SelectItem>
                <SelectItem value="Under Treatment">Under Treatment</SelectItem>
              </SelectContent>
            </Select>
            {errors.healthStatus && (
              <p className="text-sm text-destructive">{errors.healthStatus}</p>
            )}
          </div>

          {/* Previously Donated */}
          <div className="flex flex-col gap-2">
            <Label>Have you donated blood in the last 75 days?</Label>
            <Select value={previouslyDonated} onValueChange={setPreviouslyDonated}>
              <SelectTrigger className={cn(errors.previouslyDonated && "border-destructive")}>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="No">No</SelectItem>
                <SelectItem value="Yes">Yes</SelectItem>
              </SelectContent>
            </Select>
            {errors.previouslyDonated && (
              <p className="text-sm text-destructive">{errors.previouslyDonated}</p>
            )}
          </div>

          {/* Last Donation Date (Conditional) */}
          {previouslyDonated === "Yes" && (
            <div className="flex flex-col gap-2">
              <Label>Last Donation Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !lastDonationDate && "text-muted-foreground",
                      errors.lastDonationDate && "border-destructive"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {lastDonationDate
                      ? format(lastDonationDate, "PPP")
                      : "Select a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={lastDonationDate}
                    onSelect={setLastDonationDate}
                    disabled={(date) => date > new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {errors.lastDonationDate && (
                <p className="text-sm text-destructive">
                  {errors.lastDonationDate}
                </p>
              )}
            </div>
          )}

          <Button type="submit" size="lg" className="mt-2 w-full" disabled={isSubmitting}>
            {isSubmitting ? "Registering..." : "Register as Donor"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}