

const RequestSchema = new mongoose.Schema({
  bloodGroup: { type: String, required: true },
  city: { type: String, required: true },
  unitsRequired: { type: Number, required: true },
  unitsConfirmed: { type: Number, default: 0 },

  patientName: { type: String, required: true },
  contactNumber: { type: String, required: true },
  hospital: { type: String },

  status: {
    type: String,
    enum: ["open", "partial", "fulfilled", "expired"],
    default: "open"
  },

  createdAt: { type: Date, default: Date.now },
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
  }
})

export default mongoose.models.Request ||
  mongoose.model("Request", RequestSchema)