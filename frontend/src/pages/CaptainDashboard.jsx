import { useEffect, useState } from "react";
import api from "../api/axiosConfig";

export default function CaptainDashboard() {
  const [requests, setRequests] = useState([]);   // pending ride requests
  const [acceptedRide, setAcceptedRide] = useState(null); // ride the captain accepted
  const token = localStorage.getItem("token");

  // ✅ Fetch available student ride requests
  const fetchRequests = async () => {
    try {
      const res = await api.get("/bookings/available", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // If captain already has an accepted ride, do not override it
      if (!acceptedRide) {
        setRequests(res.data);
      }
    } catch (err) {
      console.error("Error fetching ride requests", err);
    }
  };

  // ✅ Accept a ride request
  const handleAccept = async (bookingId) => {
    try {
      const res = await api.post(
        `/bookings/accept/${bookingId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Ride Accepted Successfully!");
      setAcceptedRide(bookingId);
      fetchRequests(); // refresh remaining requests
    } catch (err) {
      alert("Failed to accept ride");
      console.error(err);
    }
  };

  // ✅ Fetch requests every 4 seconds
  useEffect(() => {
    fetchRequests(); // fetch initially
    const interval = setInterval(fetchRequests, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container dashboard">
      <h2>Captain Dashboard</h2>

      {/* If captain has already accepted one ride */}
      {acceptedRide ? (
        <div className="status-box">
          <h3>You have accepted a ride!</h3>
          <p>Complete the ride before accepting new ones.</p>
        </div>
      ) : (
        <>
          {requests.length === 0 ? (
            <p>No pending ride requests at the moment.</p>
          ) : (
            requests.map((req) => (
              <div className="captain-card" key={req._id}>
                <p><strong>Student:</strong> {req.student?.name}</p>
                <p><strong>Pickup:</strong> {req.pickup}</p>
                <p><strong>Drop:</strong> {req.drop}</p>
                <p><strong>Fare:</strong> ₹10</p>
                <button onClick={() => handleAccept(req._id)}>Accept Ride</button>
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
}
