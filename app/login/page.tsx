"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function handleLogin() {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()

    if (res.ok) {
      if (data.role === "admin") {
        router.push("/admin")
      } else {
        router.push("/")
      }
    } else {
      alert(data.error)
    }
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-80 p-6 border rounded-xl shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-center">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-2 border rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-700"
        >
          Login
        </button>
      </div>
    </div>
  )
}