'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface LayoutProps {
  children: React.ReactNode;
}

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: 'dashboard' },
  { name: 'AI Chat', href: '/chat', icon: 'chat' },
  { name: 'Submittal Builder', href: '/submittals', icon: 'builder', badge: 'Pro' },
  { name: 'Projects', href: '/projects', icon: 'projects', badge: 'Pro' },
  { name: 'RFIs', href: '/rfis', icon: 'rfis', badge: 'Pro' },
  { name: 'Documents', href: '/documents', icon: 'documents', badge: 'Pro' },
];

export default function AppLayout({ children }: LayoutProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <div className="hidden w-64 flex-col border-r border-gray-200 bg-white md:flex">
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-gray-200 px-6">
          <div className="h-8 w-8 rounded-md bg-gradient-to-br from-primary-500 to-primary-600"></div>
          <span className="text-lg font-bold text-gray-900">ConstructionCody</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <span>{item.name}</span>
                {item.badge && (
                  <span className="rounded bg-orange-100 px-2 py-0.5 text-xs font-bold text-orange-700">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-600">
              SC
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold text-gray-900">Sam Chen</div>
              <div className="text-xs text-gray-500">Free Plan</div>
            </div>
          </div>
          <button className="mt-3 w-full rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 py-2 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-primary-500/30">
            Upgrade to Pro
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 md:hidden"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-xl font-bold text-gray-900">
              {navigation.find((item) => item.href === pathname)?.name || 'Dashboard'}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-lg border border-yellow-200 bg-yellow-50 px-4 py-2 text-sm font-semibold text-yellow-700">
              15/30 free questions
            </div>
            <button className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700">
              Sign In
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
