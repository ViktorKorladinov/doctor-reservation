import { JSX } from 'react';
import { AppointmentInfo } from '../types';

interface ConfirmationModalProps {
  appointmentInfo: AppointmentInfo;
  onClose: () => void;
}

export default function ConfirmationModal({ appointmentInfo, onClose }: ConfirmationModalProps): JSX.Element {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Appointment Confirmed!</h2>
        
        <div className="mb-4">
          <p><strong>Doctor:</strong> {appointmentInfo.doctorName}</p>
          <p><strong>Date & Time:</strong> {new Date(appointmentInfo.datetime).toLocaleString()}</p>
          <p><strong>Patient:</strong> {appointmentInfo.patientName}</p>
        </div>
        
        <p className="mb-4 text-sm">
          A confirmation has been sent to your email at {appointmentInfo.patientEmail}.
        </p>
        
        <button
          onClick={onClose}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
}