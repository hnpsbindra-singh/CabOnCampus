import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  captain: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  pickup: String,
  drop: String,
  status: { type: String, default: "pending" }, // <---- VERY IMPORTANT
});

export default mongoose.model("Booking", bookingSchema);
