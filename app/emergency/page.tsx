"use client"

import { useState } from "react"

export default function EmergencyPage() {
  const [form, setForm] = useState({
    patientName: "",
    bloodGroup: "",
    units: "",
    hospital: "",
    city: "",
    contact: ""
  })

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    await fetch("/api/emergency-request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    })

    alert("Emergency request sent!")
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Emergency Blood Request</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input name="patientName" placeholder="Patient Name"
          className="w-full border p-2"
          onChange={handleChange} required />

        <select name="bloodGroup"
          className="w-full border p-2"
          onChange={handleChange} required>
          <option value="">Select Blood Group</option>
          <option>A+</option>
          <option>A-</option>
          <option>B+</option>
          <option>B-</option>
          <option>O+</option>
          <option>O-</option>
          <option>AB+</option>
          <option>AB-</option>
        </select>

        <input name="units" type="number"
          placeholder="Units Required"
          className="w-full border p-2"
          onChange={handleChange} required />

        <input name="hospital" placeholder="Hospital Name"
          className="w-full border p-2"
          onChange={handleChange} required />

        <input name="city" placeholder="City"
          className="w-full border p-2"
          onChange={handleChange} required />

        <input name="contact" placeholder="Contact Number"
          className="w-full border p-2"
          onChange={handleChange} required />

        <button className="bg-red-600 text-white px-4 py-2 rounded">
          Send Emergency
        </button>

      </form>
    </div>
  )
}