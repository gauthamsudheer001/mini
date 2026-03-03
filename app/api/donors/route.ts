import { NextResponse } from "next/server"
import { MongoClient, ObjectId } from "mongodb"

const uri = process.env.MONGO_URI!

// ================= CREATE DONOR =================
export async function POST(req: Request) {
  try {
    const client = new MongoClient(uri)
    await client.connect()

    const db = client.db("bloodDonation")
    const data = await req.json()

    await db.collection("donors").insertOne({
      ...data,
      availability: "Active", // default status
      createdAt: new Date(),
    })

    await client.close()

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("POST Error:", error.message)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

// ================= GET DONORS =================
export async function GET() {
  try {
    const client = new MongoClient(uri)
    await client.connect()

    const db = client.db("bloodDonation")
    const donors = await db.collection("donors").find().toArray()

    await client.close()

    return NextResponse.json(donors)
  } catch (error: any) {
    console.error("GET Error:", error.message)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

// ================= UPDATE DONOR =================
export async function PUT(req: Request) {
  try {
    const client = new MongoClient(uri)
    await client.connect()

    const db = client.db("bloodDonation")
    const { id, ...updateData } = await req.json()

    await db.collection("donors").updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    )

    await client.close()

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("PUT Error:", error.message)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}