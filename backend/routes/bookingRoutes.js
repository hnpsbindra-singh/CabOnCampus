import express from "express";
import Booking from "../models/Booking.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * ✅ STUDENT: Create a new booking
 * Endpoint: POST /bookings
 */
router.post("/", protect, async (req, res) => {
  try {
    const { pickup, drop } = req.body;

    if (!pickup || !drop) {
      return res.status(400).json({ msg: "Pickup and drop locations required" });
    }

    const booking = new Booking({
      student: req.user._id,
      pickup,
      drop,
      status: "pending",
    });

    await booking.save();
    res.status(201).json({ msg: "Booking request created", booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error creating booking" });
  }
});

/**
 * ✅ STUDENT: Get their latest booking
 * Endpoint: GET /bookings/mine
 */
router.get("/mine", protect, async (req, res) => {
  try {
    const booking = await Booking.findOne({ student: req.user._id })
      .populate("captain", "name email")
      .sort({ _id: -1 });

    if (!booking) {
      return res.json({ status: "none" });
    }

    res.json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error fetching booking" });
  }
});

/**
 * ✅ CAPTAIN: Get all pending bookings
 * Endpoint: GET /bookings/available
 */
router.get("/available", protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ status: "pending" })
      .populate("student", "name email");

    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error fetching pending bookings" });
  }
});

/**
 * ✅ CAPTAIN: Accept a booking
 * Endpoint: POST /bookings/accept/:id
 */
router.post("/accept/:id", protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ msg: "Booking not found" });
    }

    if (booking.status !== "pending") {
      return res.status(400).json({ msg: "Booking is already accepted or completed" });
    }

    booking.status = "accepted";
    booking.captain = req.user._id;
    await booking.save();

    res.json({ msg: "Ride accepted successfully", booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error accepting booking" });
  }
});

export default router;
