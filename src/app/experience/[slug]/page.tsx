import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { experience } from '@/lib/profile';
import { slugOf } from '@/lib/slug';
import ExperiencePage from '@/components/experience-page';

export const dynamicParams = false;

export function generateStaticParams() {
  return experience.map(role => ({ slug: slugOf(role.company) }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const role = experience.find(r => slugOf(r.company) === slug);
  return role ? { title: `${role.company} — Lathiesh Mahendran`, description: role.description } : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = experience.findIndex(r => slugOf(r.company) === slug);
  if (index < 0) notFound();
  return <ExperiencePage index={index} />;
}
