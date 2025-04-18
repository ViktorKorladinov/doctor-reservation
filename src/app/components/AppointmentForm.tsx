import { useState, ChangeEvent, FormEvent, JSX } from 'react';
import { AvailableTime, AppointmentFormData } from '../types';

interface AppointmentFormProps {
  availableTimes: AvailableTime[];
  onSubmit: (formData: AppointmentFormData) => void;
}

export default function AppointmentForm({ availableTimes, onSubmit }: AppointmentFormProps): JSX.Element {
  const [formData, setFormData] = useState<AppointmentFormData>({
    patientName: '',
    patientEmail: '',
    patientPhone: '',
    selectedTime: '',
    reason: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg">
      <h2 className="text-xl font-semibold mb-3">Book Appointment</h2>
      
      <div className="mb-4">
        <label htmlFor="patientName" className="block mb-1">Your Name</label>
        <input
          id="patientName"
          type="text"
          name="patientName"
          value={formData.patientName}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="patientEmail" className="block mb-1">Email</label>
        <input
          id="patientEmail"
          type="email"
          name="patientEmail"
          value={formData.patientEmail}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="patientPhone" className="block mb-1">Phone</label>
        <input
          id="patientPhone"
          type="tel"
          name="patientPhone"
          value={formData.patientPhone}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="selectedTime" className="block mb-1">Available Times</label>
        <select
          id="selectedTime"
          name="selectedTime"
          value={formData.selectedTime}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        >
          <option value="">Select a time</option>
          {availableTimes.map((time) => (
            <option key={time.id} value={time.id.toString()}>
              {new Date(time.datetime).toLocaleString()}
            </option>
          ))}
        </select>
      </div>
      
      <div className="mb-4">
        <label htmlFor="reason" className="block mb-1">Reason for Visit</label>
        <textarea
          id="reason"
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          rows={3}
        ></textarea>
      </div>
      
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Book Appointment
      </button>
    </form>
  );
}