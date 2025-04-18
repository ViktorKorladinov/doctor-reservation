import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/../lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, password, token } = req.body;

  // Verify Turnstile token
  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      secret: process.env.TURNSTILE_SECRET_KEY!,
      response: token,
    }),
  });

  const result = await response.json();
  if (!result.success) {
    return res.status(400).json({ error: 'Turnstile verification failed' });
  }

  // Create user in Supabase
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.status(200).json({ message: 'Signup successful. Check your email.', data });
}