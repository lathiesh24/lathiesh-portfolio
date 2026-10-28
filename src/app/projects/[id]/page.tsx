import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { projects, workOrder } from '@/lib/projects';
import ProjectPage from '@/components/project-page';

export const dynamicParams = false;

export function generateStaticParams() {
  return workOrder.map(id => ({ id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find(p => p.id === id);
  return project ? { title: `${project.name} — Lathiesh Mahendran`, description: project.description } : {};
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const index = workOrder.indexOf(id);
  const project = projects.find(p => p.id === id);
  if (index < 0 || !project) notFound();
  const next = projects.find(p => p.id === workOrder[(index + 1) % workOrder.length])!;
  return <ProjectPage project={project} next={next} />;
}
