import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/../lib/supabaseServer';

export async function POST(request: NextRequest) {
  try {
    const appointmentData = await request.json();
    
    // Validate required fields
    const requiredFields = ['doctorId', 'patientName', 'patientEmail', 'patientPhone', 'selectedTime'];
    for (const field of requiredFields) {
      if (!appointmentData[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }
    
    const supabase = await createServerSupabase()

    // Get doctor info
    const { data: doctorData, error: doctorError } = await supabase
      .from('doctors')
      .select('name')
      .eq('id', appointmentData.doctorId)
      .single();
    
    if (doctorError) throw doctorError;
    
    // Get availability info
    const { data: availabilityData, error: availabilityError } = await supabase
      .from('availability')
      .select('datetime')
      .eq('id', appointmentData.selectedTime)
      .single();
    
    if (availabilityError) throw availabilityError;
    
    // Insert appointment
    const { data: appointment, error: appointmentError } = await supabase
      .from('appointments')
      .insert({
        doctor_id: appointmentData.doctorId,
        availability_id: parseInt(appointmentData.selectedTime),
        patient_name: appointmentData.patientName,
        patient_email: appointmentData.patientEmail,
        patient_phone: appointmentData.patientPhone,
        reason: appointmentData.reason || ''
      })
      .select()
      .single();
    
    if (appointmentError) throw appointmentError;
    
    // Mark availability as booked
    const { error: updateError } = await supabase
      .from('availability')
      .update({ is_booked: true })
      .eq('id', appointmentData.selectedTime);
    
    if (updateError) throw updateError;
    
    // Format response
    const appointmentInfo = {
      id: appointment.id,
      doctorName: doctorData.name,
      datetime: availabilityData.datetime,
      patientName: appointmentData.patientName,
      patientEmail: appointmentData.patientEmail,
      patientPhone: appointmentData.patientPhone,
      reason: appointmentData.reason
    };
    
    return NextResponse.json(appointmentInfo, { status: 201 });
  } catch (error) {
    console.error('Error creating appointment:', error);
    return NextResponse.json(
      { error: 'Failed to create appointment' },
      { status: 500 }
    );
  }
}