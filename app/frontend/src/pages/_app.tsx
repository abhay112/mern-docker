// src/pages/_app.tsx
import type { AppProps } from 'next/app';
import Navbar from '@/components/Navbar';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="w-full p-6">
      <Navbar />
      <Component {...pageProps} />
    </div>
  );
}
