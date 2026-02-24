import { NextResponse } from "next/server"
import connectDB from "@/lib/db"
import Request from "@/models/Request"

export async function POST(req: Request) {
  await connectDB()
  const { requestId } = await req.json()

  const bloodRequest = await Request.findById(requestId)

  if (!bloodRequest) {
    return NextResponse.json({ error: "Request not found" }, { status: 404 })
  }

  bloodRequest.unitsConfirmed += 1

  if (bloodRequest.unitsConfirmed >= bloodRequest.unitsRequired) {
    bloodRequest.status = "fulfilled"
  } else {
    bloodRequest.status = "partial"
  }

  await bloodRequest.save()

  return NextResponse.json({ success: true })
}