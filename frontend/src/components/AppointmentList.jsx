export default function AppointmentList({ appointments }) {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold mb-3">Your Appointments</h2>
      {appointments.length === 0 ? (
        <p className="text-gray-500">No appointments yet.</p>
      ) : (
        <ul className="space-y-2">
          {appointments.map((appt, idx) => (
            <li key={idx} className="border p-3 rounded shadow-sm bg-white">
              <strong>{appt.patient}</strong> → Dr. {appt.doctor} on {appt.date}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
