import type { Metadata } from 'next';
import { profile, experience } from '@/lib/profile';
import { projects } from '@/lib/projects';
import PrintResume from '@/components/print-resume';

export const metadata: Metadata = { title: 'Resume — Lathiesh Mahendran' };

export default function ResumePage() {
  return <main className="resume-page">
    <nav className="resume-controls" aria-label="Resume actions"><a href="/">← Back to portfolio</a><PrintResume /></nav>
    <article className="resume-document">
      <header><h1>{profile.introduction.name}</h1><p className="resume-title">{profile.introduction.title}</p><div className="resume-contacts"><a href={`mailto:${profile.contact.email}`}>{profile.contact.email}</a><a href={profile.contact.github}>github.com/lathiesh24</a><a href={profile.contact.linkedin}>linkedin.com/in/lathiesh-mahendran</a><span>{profile.introduction.location}</span></div></header>
      <section><h2>Profile</h2><p>{profile.introduction.description}</p></section>
      <section><h2>Experience</h2>{experience.map(role => <div key={role.company} className="resume-role"><div className="resume-role-heading"><h3>{role.role} · {role.company}</h3><span>{role.period}</span></div><p className="resume-role-meta">{role.kind} · {role.location}</p><p>{role.description}</p>{role.contributions.length > 0 && <ul>{role.contributions.map(point => <li key={point}>{point}</li>)}</ul>}{role.phases.map(phase => <p className="resume-role-meta" key={phase}>{phase}</p>)}</div>)}</section>
      <section><h2>Projects</h2>{projects.filter(project => project.id !== 'corvus').map(project => <div className="resume-project" key={project.id}><h3>{project.name}</h3><p>{project.description}</p><ul>{project.contributions?.slice(0, 3).map(point => <li key={point}>{point}</li>)}</ul>{project.link && <a href={project.link}>{project.link}</a>}</div>)}</section>
      <section><h2>Skills</h2>{profile.skills.map(group => <p key={group.group}><strong>{group.group}:</strong> {group.items.join(' · ')}</p>)}</section>
      <section><h2>Education</h2><p>{profile.education.institution} · {profile.education.period}</p></section>
    </article>
  </main>;
}
