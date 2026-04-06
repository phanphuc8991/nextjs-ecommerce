import { Inter, Geist, Outfit  } from 'next/font/google';
 
export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-outfit",
});