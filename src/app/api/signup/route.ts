import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/../lib/supabaseServer';

export async function POST(req: NextRequest) {
  try {
    const { email, password, token } = await req.json();

    if (!email || !password || !token) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // 1. Verify Turnstile
    const turnstileRes = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          secret: process.env.TURNSTILE_SECRET_KEY!,
          response: token,
        }),
      }
    );

    const turnstileData = await turnstileRes.json();

    if (!turnstileData.success) {
      console.warn('Turnstile failure:', turnstileData);
      return NextResponse.json(
        { error: 'Turnstile verification failed' },
        { status: 400 }
      );
    }

    // 2. Sign up user
    const supabase = await createServerSupabase();
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: 'Signup successful', data });
  } catch (err) {
    console.error('Signup error:', err);
    return NextResponse.json(
      { error: 'Unexpected error during signup' },
      { status: 500 }
    );
  }
}