import { JSX } from 'react';
import { Doctor } from '../types';

interface DoctorListProps {
    doctors: Doctor[];
    onSelect: (doctor: Doctor) => void;
    selected: Doctor | null;
}

export default function DoctorList({ doctors, onSelect, selected }: DoctorListProps): JSX.Element {
    return (
        <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Select a Doctor</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {doctors.map((doctor) => (
                    <div
                        key={doctor.id}
                        className={`p-4 border rounded cursor-pointer ${selected?.id === doctor.id ? 'bg-blue-100 border-blue-500' : ''
                            }`}
                        onClick={(): void => onSelect(doctor)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e): void => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                onSelect(doctor);
                            }
                        }}
                    >
                        <h3 className="font-medium">{doctor.name}</h3>
                        <p className="text-sm">{doctor.specialty}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}