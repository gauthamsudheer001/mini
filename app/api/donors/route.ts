import { NextResponse } from "next/server"
import { MongoClient } from "mongodb"

export async function POST(req: Request) {
  try {
    if (!process.env.MONGO_URI) {
      return NextResponse.json(
        { success: false, error: "Missing MONGO_URI" },
        { status: 500 }
      )
    }

    const client = new MongoClient(process.env.MONGO_URI)
    await client.connect()

    const db = client.db("bloodDonation")
    const data = await req.json()

    await db.collection("donors").insertOne({
      ...data,
      createdAt: new Date(),
    })

    await client.close()

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Mongo Error:", error.message)

    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    if (!process.env.MONGO_URI) {
      return NextResponse.json(
        { success: false, error: "Missing MONGO_URI" },
        { status: 500 }
      )
    }

    const client = new MongoClient(process.env.MONGO_URI)
    await client.connect()

    const db = client.db("bloodDonation")
    const donors = await db.collection("donors").find().toArray()

    await client.close()

    return NextResponse.json(donors)
  } catch (error: any) {
    console.error("Mongo Error:", error.message)

    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}