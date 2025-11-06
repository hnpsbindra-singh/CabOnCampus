import { useState, useEffect, useRef } from "react";
import api from "../api/axiosConfig";

export default function StudentDashboard() {
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [status, setStatus] = useState(null);      // null | "pending" | "accepted"
  const [captain, setCaptain] = useState(null);
  const token = localStorage.getItem("token");
  const pollRef = useRef(null);

  const handleBook = async () => {
    if (!pickup || !drop) return alert("Enter both pickup and drop!");
    try {
      await api.post(
        "/bookings",
        { pickup, drop },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setStatus("pending");
    } catch (e) {
      console.error(e);
      alert("Booking failed");
    }
  };

  // ✅ Poll ONLY when pending; stop otherwise
  useEffect(() => {
    if (status !== "pending") {
      if (pollRef.current) {
        clearInterval(pollRef.current);
        pollRef.current = null;
      }
      return;
    }

    const poll = async () => {
      try {
        const res = await api.get("/bookings/mine", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data?.status === "accepted") {
          setStatus("accepted");
          setCaptain(res.data.captain);
        }
      } catch (e) {
        // swallow errors while polling
      }
    };

    // start polling
    poll(); // immediate check
    pollRef.current = setInterval(poll, 4000);

    // cleanup when status changes/unmounts
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
      pollRef.current = null;
    };
  }, [status, token]);

  // ✅ Prevent default submit which can reset inputs
  const onSubmit = (e) => {
    e.preventDefault();
    handleBook();
  };

  return (
    <div className="container dashboard">
      <h2>Welcome</h2>

      {/* Form with preventDefault so inputs don't clear */}
      {!status && (
        <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input
            type="text"
            placeholder="Pickup Location"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            autoComplete="off"
          />
          <input
            type="text"
            placeholder="Drop Location"
            value={drop}
            onChange={(e) => setDrop(e.target.value)}
            autoComplete="off"
          />
          <button type="submit">Book Ride (₹10)</button>
        </form>
      )}

      {status === "pending" && (
        <div className="status-box">Waiting for captain to accept…</div>
      )}

      {status === "accepted" && captain && (
        <div className="status-box">
          <h3>Captain Assigned 🚖</h3>
          <p><b>Name:</b> {captain.name}</p>
          <p><b>Contact:</b> {captain.email}</p>
          <p>Pay ₹10 on the spot.</p>
        </div>
      )}
    </div>
  );
}
