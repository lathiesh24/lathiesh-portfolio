'use client';
import { useState } from 'react';
import { Check, Copy, ArrowUpRight } from 'lucide-react';

export default function ContactActions({ email }: { email: string }) {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle');

  const copyWithSelection = () => {
    const field = document.createElement('textarea');
    field.value = email;
    field.style.position = 'fixed';
    field.style.opacity = '0';
    document.body.appendChild(field);
    field.select();
    const ok = document.execCommand('copy');
    field.remove();
    return ok;
  };

  const copy = async () => {
    let ok = false;
    try {
      // The clipboard request can wait on a permission prompt forever, so give up after a moment.
      await Promise.race([
        navigator.clipboard.writeText(email),
        new Promise<never>((_, reject) => setTimeout(() => reject(new Error('clipboard timeout')), 900)),
      ]);
      ok = true;
    } catch {
      ok = copyWithSelection();
    }
    setState(ok ? 'copied' : 'failed');
    setTimeout(() => setState('idle'), 3200);
  };

  const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent('Hello Lathiesh')}`;

  return (
    <div className="pf-contact-actions">
      <p className="pf-contact-email">{email}</p>
      <div className="pf-contact-buttons">
        <button type="button" className="pf-primary" onClick={copy} aria-live="polite">
          {state === 'copied' ? <><Check size={17} />Copied</> : state === 'failed' ? <>Select the address above</> : <><Copy size={17} />Copy email</>}
        </button>
        <a className="pf-secondary" href={gmail} target="_blank" rel="noreferrer">Open in Gmail <ArrowUpRight size={16} /></a>
      </div>
    </div>
  );
}
