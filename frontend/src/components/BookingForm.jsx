import { useState } from "react";

export default function BookingForm({ doctor, onClose, onConfirm }) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !date) return alert("Please fill all fields");
    onConfirm({ patient: name, date, doctor: doctor.name });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded w-96 shadow-lg"
      >
        <h2 className="text-xl font-bold mb-4">Book with Dr. {doctor.name}</h2>
        <input
          type="text"
          placeholder="Your Name"
          className="border w-full p-2 mb-3 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="date"
          className="border w-full p-2 mb-3 rounded"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-2 border rounded">
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
}
