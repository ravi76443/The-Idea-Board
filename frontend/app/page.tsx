'use client';

import Link from 'next/link';
import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { CTA } from '../components/CTA';
import Navbar from '../components/Common/Navbar';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <Navbar/>
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <Features />

      {/* CTA Section */}
      <CTA />
    </main>
  );
}
