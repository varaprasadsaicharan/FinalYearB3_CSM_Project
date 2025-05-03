import React from 'react';

interface DoctorCardProps {
  name: string;
  specialty: string;
  imageUrl: string;
}

export function DoctorCard({ name, specialty, imageUrl }: DoctorCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
        <p className="text-sm text-gray-600">{specialty}</p>
      </div>
    </div>
  );
}