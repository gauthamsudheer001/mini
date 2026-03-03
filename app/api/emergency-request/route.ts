import { NextResponse } from "next/server"
import { MongoClient } from "mongodb"

const client = new MongoClient(process.env.MONGO_URI!)

export async function POST(req: Request) {
  try {
    const data = await req.json()

    await client.connect()
    const db = client.db("bloodDonation")

    // Save emergency request
    await db.collection("emergencyRequests").insertOne({
      ...data,
      createdAt: new Date(),
    })

    // Optional: find matching donors (for later use)
    const donors = await db
      .collection("donors")
      .find({ bloodGroup: data.bloodGroup })
      .limit(10)
      .toArray()

    console.log("Matching donors:", donors)

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}