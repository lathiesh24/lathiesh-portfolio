'use client';
export default function PrintResume() {
  return <button onClick={() => window.print()} className="primary-button">Print / save as PDF</button>;
}
