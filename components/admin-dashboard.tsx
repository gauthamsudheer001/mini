"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  LayoutDashboard,
  Users,
  Droplets,
  Activity,
  Pencil,
  Trash2,
  ToggleLeft,
  ToggleRight,
  Heart,
  Menu,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Sidebar navigation items
const sidebarItems = [
  { icon: LayoutDashboard, label: "Overview", id: "overview" },
  { icon: Users, label: "Donors", id: "donors" },
]

function AdminSidebar({
  activeTab,
  onTabChange,
  mobileOpen,
  onMobileClose,
}: {
  activeTab: string
  onTabChange: (tab: string) => void
  mobileOpen: boolean
  onMobileClose: () => void
}) {
  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm lg:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 flex h-full w-64 flex-col border-r border-border bg-card transition-transform lg:static lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-border px-5">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Heart className="h-4 w-4 text-primary-foreground" fill="currentColor" />
            </div>
            <span className="text-lg font-bold text-foreground">Admin</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onMobileClose}
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 p-3">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onTabChange(item.id)
                onMobileClose()
              }}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                activeTab === item.id
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
        </nav>
      </aside>
    </>
  )
}

function OverviewCards({ donorList }: { donorList: Donor[] }) {
  const totalDonors = donorList.length
  const activeDonors = donorList.filter((d) => d.availability === "Active").length
  const uniqueBloodGroups = new Set(donorList.map((d) => d.bloodGroup)).size
  const healthyDonors = donorList.filter((d) => d.healthStatus === "Good").length

  const stats = [
    { title: "Total Donors", value: totalDonors, icon: Users, color: "text-primary" },
    { title: "Active Donors", value: activeDonors, icon: Activity, color: "text-green-600" },
    { title: "Blood Groups", value: uniqueBloodGroups, icon: Droplets, color: "text-primary" },
    { title: "Healthy Donors", value: healthyDonors, icon: Heart, color: "text-green-600" },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="border-border">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-muted">
              <stat.icon className={cn("h-5 w-5", stat.color)} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function EditDonorDialog({
  donor,
  open,
  onClose,
  onSave,
}: {
  donor: Donor | null
  open: boolean
  onClose: () => void
  onSave: (updated: Donor) => void
}) {
  const [name, setName] = useState(donor?.name ?? "")
  const [bloodGroup, setBloodGroup] = useState(donor?.bloodGroup ?? "")
  const [phone, setPhone] = useState(donor?.phone ?? "")
  const [location, setLocation] = useState(donor?.location ?? "")
  const [healthStatus, setHealthStatus] = useState(donor?.healthStatus ?? "Good")

  // Reset when donor changes
  if (donor && name !== donor.name && !open) {
    setName(donor.name)
    setBloodGroup(donor.bloodGroup)
    setPhone(donor.phone)
    setLocation(donor.location)
    setHealthStatus(donor.healthStatus)
  }

  function handleSave() {
    if (!donor) return
    onSave({
      ...donor,
      name,
      bloodGroup,
      phone,
      location,
      healthStatus: healthStatus as Donor["healthStatus"],
    })
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-foreground">Edit Donor</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Update the donor information below.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-2">
          <div className="flex flex-col gap-2">
            <Label className="text-foreground">Full Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-foreground">Blood Group</Label>
            <Select value={bloodGroup} onValueChange={setBloodGroup}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {bloodGroups.map((bg) => (
                  <SelectItem key={bg} value={bg}>
                    {bg}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-foreground">Phone</Label>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-foreground">City</Label>
            <Input value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-foreground">Health Status</Label>
            <Select value={healthStatus} onValueChange={setHealthStatus}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Good">Good</SelectItem>
                <SelectItem value="Under Treatment">Under Treatment</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function DonorsTable({
  donorList,
  onEdit,
  onDelete,
  onToggle,
}: {
  donorList: Donor[]
  onEdit: (donor: Donor) => void
  onDelete: (id: string) => void
  onToggle: (id: string) => void
}) {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-foreground">All Donors</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-muted-foreground">Name</TableHead>
                <TableHead className="text-muted-foreground">Blood Group</TableHead>
                <TableHead className="hidden text-muted-foreground md:table-cell">Phone</TableHead>
                <TableHead className="hidden text-muted-foreground sm:table-cell">Location</TableHead>
                <TableHead className="hidden text-muted-foreground lg:table-cell">Health</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-right text-muted-foreground">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {donorList.map((donor) => (
                <TableRow key={donor.id}>
                  <TableCell className="font-medium text-foreground">{donor.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-bold">
                      {donor.bloodGroup}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden text-muted-foreground md:table-cell">{donor.phone}</TableCell>
                  <TableCell className="hidden text-muted-foreground sm:table-cell">{donor.location}</TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <Badge
                      variant={donor.healthStatus === "Good" ? "default" : "secondary"}
                      className={
                        donor.healthStatus === "Good"
                          ? "bg-green-600 text-green-50 hover:bg-green-700"
                          : "bg-secondary text-muted-foreground"
                      }
                    >
                      {donor.healthStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
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
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(donor)}
                        aria-label={`Edit ${donor.name}`}
                        className="h-8 w-8"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onToggle(donor.id)}
                        aria-label={`Toggle availability for ${donor.name}`}
                        className="h-8 w-8"
                      >
                        {donor.availability === "Active" ? (
                          <ToggleRight className="h-4 w-4 text-green-600" />
                        ) : (
                          <ToggleLeft className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(donor.id)}
                        aria-label={`Delete ${donor.name}`}
                        className="h-8 w-8 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [donorList, setDonorList] = useState<Donor[]>([...initialDonors])
  const [editDonor, setEditDonor] = useState<Donor | null>(null)
  const [editOpen, setEditOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  function handleEdit(donor: Donor) {
    setEditDonor(donor)
    setEditOpen(true)
  }

  function handleSave(updated: Donor) {
    setDonorList((prev) =>
      prev.map((d) => (d.id === updated.id ? updated : d))
    )
    setEditOpen(false)
    setEditDonor(null)
    toast.success("Donor updated", {
      description: `${updated.name}'s information has been updated.`,
    })
  }

  function handleDelete(id: string) {
    const donor = donorList.find((d) => d.id === id)
    setDonorList((prev) => prev.filter((d) => d.id !== id))
    toast.success("Donor removed", {
      description: `${donor?.name} has been removed from the registry.`,
    })
  }

  function handleToggle(id: string) {
    setDonorList((prev) =>
      prev.map((d) =>
        d.id === id
          ? {
              ...d,
              availability: d.availability === "Active" ? "Unavailable" : "Active",
            }
          : d
      )
    )
    const donor = donorList.find((d) => d.id === id)
    const newStatus = donor?.availability === "Active" ? "Unavailable" : "Active"
    toast.success("Status updated", {
      description: `${donor?.name} is now ${newStatus}.`,
    })
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <AdminSidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        mobileOpen={sidebarOpen}
        onMobileClose={() => setSidebarOpen(false)}
      />

      {/* Main content */}
      <div className="flex-1 bg-background">
        {/* Top bar */}
        <div className="flex h-14 items-center gap-3 border-b border-border px-4 lg:px-6">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold text-foreground">
            {activeTab === "overview" ? "Dashboard Overview" : "Manage Donors"}
          </h1>
        </div>

        {/* Content */}
        <div className="p-4 lg:p-6">
          {activeTab === "overview" && (
            <div className="flex flex-col gap-6">
              <OverviewCards donorList={donorList} />
              <DonorsTable
                donorList={donorList}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onToggle={handleToggle}
              />
            </div>
          )}

          {activeTab === "donors" && (
            <DonorsTable
              donorList={donorList}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggle={handleToggle}
            />
          )}
        </div>
      </div>

      {/* Edit Dialog */}
      <EditDonorDialog
        donor={editDonor}
        open={editOpen}
        onClose={() => {
          setEditOpen(false)
          setEditDonor(null)
        }}
        onSave={handleSave}
      />
    </div>
  )
}
