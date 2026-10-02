import { useEffect, useState } from "react";
import "./OwnerDashboard.css";

function OwnerDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("ownerToken");

    fetch("https://aura-beauty-studio.onrender.com/api/appointments", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch appointments");
        }

        return response.json();
      })
      .then((data) => {
        setAppointments(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching appointments:", error);
        setError("Unable to load appointments.");
        setLoading(false);
      });
  }, []);

  return (
    <section className="owner-dashboard">
      <div className="dashboard-header">
        <div>
          <p className="dashboard-label">AURA BEAUTY STUDIO</p>
          <h1>Owner Dashboard</h1>
          <p>Manage and view customer appointments.</p>
        </div>

        <div className="appointment-count">
          <span>{appointments.length}</span>
          <p>Total Appointments</p>
        </div>
      </div>

      <div className="appointments-section">
        <div className="appointments-heading">
          <h2>Appointments</h2>
          <p>Recent customer booking requests</p>
        </div>

        {loading ? (
          <div className="no-appointments">
            <h3>Loading appointments...</h3>
          </div>
        ) : error ? (
          <div className="no-appointments">
            <h3>{error}</h3>
          </div>
        ) : appointments.length === 0 ? (
          <div className="no-appointments">
            <h3>No appointments yet</h3>
            <p>New appointment requests will appear here.</p>
          </div>
        ) : (
          <div className="appointment-table-wrapper">
            <table className="appointment-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Phone</th>
                  <th>Service</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Message</th>
                </tr>
              </thead>

              <tbody>
                {appointments.map((appointment) => (
                  <tr key={appointment._id}>
                    <td className="customer-name">
                      {appointment.name}
                    </td>

                    <td>{appointment.phone}</td>

                    <td>
                      <span className="service-badge">
                        {appointment.service}
                      </span>
                    </td>

                    <td>{appointment.date}</td>

                    <td>{appointment.time}</td>

                    <td>
                      {appointment.message
                        ? appointment.message
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

export default OwnerDashboard;
