'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Dashboard', icon: '◈' },
  { href: '/theses', label: 'Theses', icon: '◇' },
  { href: '/watchlist', label: 'Watchlist', icon: '◆' },
  { href: '/companies', label: 'Analysis', icon: '◎' },
  { href: '/pillars', label: 'Pillars', icon: '◉' },
  { href: '/flags', label: 'Flags', icon: '⚑' },
  { href: '/research', label: 'Research', icon: '◈' },
  { href: '/sessions', label: 'Sessions', icon: '◇' },
  { href: '/milestones', label: 'Milestones', icon: '◆' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-full w-56 flex flex-col border-r"
      style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
      <div className="p-5 border-b" style={{ borderColor: 'var(--border)' }}>
        <h1 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
          Angel Investor
        </h1>
        <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
          Skill Tracker
        </p>
      </div>
      <nav className="flex-1 p-3 flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href ||
            (item.href !== '/' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all"
              style={{
                background: isActive ? 'var(--surface-2)' : 'transparent',
                color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
              }}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t text-xs" style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>
        2027+ deployment timeline
      </div>
    </aside>
  );
}
