import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from './context/AuthContext';
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: 'Doctor Appointment System',
  description: 'Book appointments with doctors',
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SpeedInsights/>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}