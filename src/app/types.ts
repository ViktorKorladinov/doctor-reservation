export interface Doctor {
    id: number;
    name: string;
    specialty: string;
}

export interface AvailableTime {
    id: number;
    datetime: string;
    doctorId: number;
}

export interface AppointmentFormData {
    patientName: string;
    patientEmail: string;
    patientPhone: string;
    selectedTime: string;
    reason: string;
}

export interface AppointmentInfo {
    id: number;
    doctorName: string;
    datetime: string;
    patientName: string;
    patientEmail: string;
    patientPhone: string;
    reason?: string;
}