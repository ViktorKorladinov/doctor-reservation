"use client";

import ProtectedRoute from '../components/ProtectedRoute';
import AppointmentApp from '../components/AppointmentApp'; // Move your main component here
import { useAuth } from '../context/AuthContext';

export default function DashboardPage() {
  const { signOut } = useAuth();
  
  return (
    <ProtectedRoute>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Doctor Appointment System</h1>
          <button 
            onClick={() => signOut()}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          >
            Sign Out
          </button>
        </div>
        <AppointmentApp />
      </div>
    </ProtectedRoute>
  );
}