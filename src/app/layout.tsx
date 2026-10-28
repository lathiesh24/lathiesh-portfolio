import type { Metadata } from 'next';
import '@fontsource-variable/manrope';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/500.css';
import '@fontsource/instrument-serif/400.css';
import '@fontsource/instrument-serif/400-italic.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'Lathiesh Mahendran — AI & Full-Stack Engineer',
  description: 'From data and agents to the product people use. Explore the AI systems and full-stack products built by Lathiesh Mahendran.',
  openGraph: { title: 'Lathiesh Mahendran — AI & Full-Stack Engineer', description: 'Production AI. Thoughtful engineering. End-to-end ownership.', type: 'website' },
  icons: { icon: '/icon.svg' },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
