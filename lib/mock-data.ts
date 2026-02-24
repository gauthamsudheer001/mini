// Mock donor data for the HemoLink application
export interface Donor {
  id: string
  name: string
  bloodGroup: string
  phone: string
  location: string
  healthStatus: "Good" | "Under Treatment"
  lastDonationDate: string
  availability: "Active" | "Unavailable"
}

export const donors: Donor[] = [
  {
    id: "1",
    name: "Aarav Sharma",
    bloodGroup: "O+",
    phone: "+91 98765 43210",
    location: "Mumbai",
    healthStatus: "Good",
    lastDonationDate: "2025-11-15",
    availability: "Active",
  },
  {
    id: "2",
    name: "Priya Patel",
    bloodGroup: "A+",
    phone: "+91 87654 32109",
    location: "Delhi",
    healthStatus: "Good",
    lastDonationDate: "2025-09-20",
    availability: "Active",
  },
  {
    id: "3",
    name: "Rohan Gupta",
    bloodGroup: "B-",
    phone: "+91 76543 21098",
    location: "Bangalore",
    healthStatus: "Under Treatment",
    lastDonationDate: "2025-06-10",
    availability: "Unavailable",
  },
  {
    id: "4",
    name: "Sneha Reddy",
    bloodGroup: "AB+",
    phone: "+91 65432 10987",
    location: "Hyderabad",
    healthStatus: "Good",
    lastDonationDate: "2025-12-01",
    availability: "Active",
  },
  {
    id: "5",
    name: "Vikram Singh",
    bloodGroup: "O-",
    phone: "+91 54321 09876",
    location: "Chennai",
    healthStatus: "Good",
    lastDonationDate: "2025-10-05",
    availability: "Active",
  },
  {
    id: "6",
    name: "Ananya Mehta",
    bloodGroup: "A-",
    phone: "+91 43210 98765",
    location: "Pune",
    healthStatus: "Good",
    lastDonationDate: "2025-08-22",
    availability: "Active",
  },
  {
    id: "7",
    name: "Karthik Nair",
    bloodGroup: "B+",
    phone: "+91 32109 87654",
    location: "Kolkata",
    healthStatus: "Under Treatment",
    lastDonationDate: "2025-04-18",
    availability: "Unavailable",
  },
  {
    id: "8",
    name: "Divya Iyer",
    bloodGroup: "AB-",
    phone: "+91 21098 76543",
    location: "Mumbai",
    healthStatus: "Good",
    lastDonationDate: "2026-01-10",
    availability: "Active",
  },
  {
    id: "9",
    name: "Rahul Verma",
    bloodGroup: "O+",
    phone: "+91 10987 65432",
    location: "Delhi",
    healthStatus: "Good",
    lastDonationDate: "2025-12-20",
    availability: "Active",
  },
  {
    id: "10",
    name: "Meera Joshi",
    bloodGroup: "A+",
    phone: "+91 09876 54321",
    location: "Bangalore",
    healthStatus: "Good",
    lastDonationDate: "2026-02-05",
    availability: "Active",
  },
]

export const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"] as const
export type BloodGroup = (typeof bloodGroups)[number]
