"use client";

import { useState, useEffect, JSX } from 'react';
import DoctorList from './DoctorList';
import AppointmentForm from './AppointmentForm';
import ConfirmationModal from './ConfirmationModal';
import { Doctor, AvailableTime, AppointmentInfo, AppointmentFormData } from '../types';

export default function AppointmentApp(): JSX.Element {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [availableTimes, setAvailableTimes] = useState<AvailableTime[]>([]);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [appointmentInfo, setAppointmentInfo] = useState<AppointmentInfo | null>(null);

  useEffect(() => {
    // Fetch doctors on load
    const fetchDoctors = async (): Promise<void> => {
      try {
        const res = await fetch('/api/doctors');
        if (!res.ok) throw new Error('Failed to fetch doctors');
        const data = await res.json();
        setDoctors(data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    void fetchDoctors();
  }, []);

  useEffect(() => {
    // Fetch available times when doctor is selected
    const fetchAvailability = async (): Promise<void> => {
      if (!selectedDoctor) return;

      try {
        const res = await fetch(`/api/availability?doctorId=${selectedDoctor.id}`);
        if (!res.ok) throw new Error('Failed to fetch availability');
        const data = await res.json();
        setAvailableTimes(data);
      } catch (error) {
        console.error('Error fetching availability:', error);
      }
    };

    void fetchAvailability();
  }, [selectedDoctor]);

  const handleDoctorSelect = (doctor: Doctor): void => {
    setSelectedDoctor(doctor);
  };

  const handleAppointmentSubmit = async (appointmentData: AppointmentFormData): Promise<void> => {
    if (!selectedDoctor) return;

    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          doctorId: selectedDoctor.id,
          ...appointmentData
        })
      });

      if (!res.ok) throw new Error('Failed to book appointment');
      const data = await res.json();
      setAppointmentInfo(data);
      setShowConfirmation(true);
    } catch (error) {
      console.error('Error booking appointment:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Doctor Appointment System</h1>

      <DoctorList
        doctors={doctors}
        onSelect={handleDoctorSelect}
        selected={selectedDoctor}
      />

      {selectedDoctor && (
        <AppointmentForm
          availableTimes={availableTimes}
          onSubmit={handleAppointmentSubmit}
        />
      )}

      {showConfirmation && appointmentInfo && (
        <ConfirmationModal
          appointmentInfo={appointmentInfo}
          onClose={(): void => {
            setShowConfirmation(false);
            setSelectedDoctor(null);
            setAppointmentInfo(null);
          }}
        />
      )}
    </div>
  );
}