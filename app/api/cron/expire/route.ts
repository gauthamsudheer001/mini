import { NextResponse } from "next/server"
import connectDB from "@/lib/db"
import Request from "@/models/Request"

export async function GET(req: Request) {
  try {
    await connectDB()

    const now = new Date()

    const result = await Request.updateMany(
      {
        status: { $in: ["open", "partial"] },
        expiresAt: { $lt: now }
      },
      { $set: { status: "expired" } }
    )

    return NextResponse.json({
      success: true,
      expiredCount: result.modifiedCount
    })

  } catch (error) {
    return NextResponse.json(
      { error: "Cron failed" },
      { status: 500 }
    )
  }
}