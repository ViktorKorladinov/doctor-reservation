import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/../lib/supabaseServer';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const doctorId = searchParams.get('doctorId');
    const supabase = await createServerSupabase()
    
    if (!doctorId) {
      return NextResponse.json(
        { error: 'Doctor ID is required' },
        { status: 400 }
      );
    }
    
    const { data, error } = await supabase
      .from('availability')
      .select('*')
      .eq('doctor_id', doctorId)
      .eq('is_booked', false);
    
    if (error) throw error;
    
    // Transform to match frontend expectations
    const formattedData = data.map(item => ({
      id: item.id,
      datetime: item.datetime,
      doctorId: item.doctor_id
    }));
    
    return NextResponse.json(formattedData);
  } catch (error) {
    console.error('Error fetching availability:', error);
    return NextResponse.json(
      { error: 'Failed to fetch availability' },
      { status: 500 }
    );
  }
}