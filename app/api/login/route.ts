import { NextResponse } from "next/server"

const users = [
  {
    email: "admin@gmail.com",
    password: "admin123",
    role: "admin",
  },
  {
    email: "user@gmail.com",
    password: "user123",
    role: "user",
  },
]

export async function POST(req: Request) {
  const { email, password } = await req.json()

  const user = users.find(
    (u) => u.email === email && u.password === password
  )

  if (!user) {
    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    )
  }

  return NextResponse.json({ role: user.role })
}