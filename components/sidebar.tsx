'use client';

import { BarChart3, Grid3x3, LogOut, Bell } from 'lucide-react';
import Link from 'next/link';

const menuItems = [
  { icon: Grid3x3, label: 'Dashboard', href: '#' },
  { icon: Bell, label: 'Notifications', href: '#' },
];

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-sidebar text-sidebar-foreground flex flex-col shadow-lg">
      {/* Header */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-sidebar-primary flex items-center justify-center">
            <BarChart3 className="w-6 h-6 text-sidebar-primary-foreground" />
          </div>
          <div>
            <h1 className="font-bold text-lg">FinBank</h1>
            <p className="text-xs text-sidebar-foreground/60">Banking Platform</p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-3 py-6 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-sidebar-primary/10 transition-colors group"
          >
            <item.icon className="w-5 h-5 text-sidebar-foreground/70 group-hover:text-sidebar-primary" />
            <span className="text-sm font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-6 border-t border-sidebar-border">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-500/10 transition-colors text-red-400 font-medium">
          <LogOut className="w-5 h-5" />
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </aside>
  );
}
