'use client';

import Link from 'next/link';
import AppLayout from '@/components/AppLayout';

export default function DashboardPage() {
  const stats = [
    { name: 'Questions Asked', value: '15', subtext: '15 free remaining' },
    { name: 'Projects', value: '0', subtext: 'Upgrade for projects', isPro: true },
    { name: 'Active RFIs', value: '0', subtext: 'Upgrade for RFIs', isPro: true },
    { name: 'Documents', value: '0', subtext: 'Upgrade to upload', isPro: true },
  ];

  const recentActivity = [
    {
      action: 'Asked about conduit specifications',
      time: '2 hours ago',
      type: 'chat',
    },
    {
      action: 'Asked about NEC grounding requirements',
      time: '5 hours ago',
      type: 'chat',
    },
  ];

  const quickActions = [
    {
      title: 'Ask AI a Question',
      description: 'Get instant answers about construction specs and codes',
      icon: 'chat',
      href: '/chat',
      color: 'primary',
    },
    {
      title: 'Build a Submittal',
      description: 'AI-powered submittal package generation',
      icon: 'builder',
      href: '/submittals',
      color: 'blue',
      isPro: true,
    },
    {
      title: 'Create an RFI',
      description: 'Track and manage requests for information',
      icon: 'rfi',
      href: '/rfis',
      color: 'green',
      isPro: true,
    },
    {
      title: 'Upload Documents',
      description: 'Store and analyze project documents',
      icon: 'document',
      href: '/documents',
      color: 'purple',
      isPro: true,
    },
  ];

  return (
    <AppLayout>
      <div className="p-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="mb-2 text-3xl font-bold text-gray-900">Welcome back, Sam</h2>
          <p className="text-gray-600">Here's what's happening with your projects today</p>
        </div>

        {/* Stats Grid */}
        <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className="relative overflow-hidden rounded-lg border border-gray-200 bg-white p-6"
            >
              {stat.isPro && (
                <div className="absolute right-3 top-3 rounded bg-orange-100 px-2 py-1 text-xs font-bold text-orange-700">
                  PRO
                </div>
              )}
              <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
              <div className="mt-1 text-sm font-semibold text-gray-900">{stat.name}</div>
              <div className="mt-1 text-xs text-gray-500">{stat.subtext}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <h3 className="mb-4 text-lg font-bold text-gray-900">Quick Actions</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {quickActions.map((action) => (
                <Link
                  key={action.title}
                  href={action.href}
                  className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white p-6 transition-all hover:border-primary-500 hover:shadow-lg"
                >
                  {action.isPro && (
                    <div className="absolute right-3 top-3 rounded bg-orange-100 px-2 py-1 text-xs font-bold text-orange-700">
                      PRO
                    </div>
                  )}
                  <div className="mb-3 text-2xl font-bold text-gray-900">{action.title}</div>
                  <p className="text-sm text-gray-600">{action.description}</p>
                  <div className="mt-4 text-sm font-semibold text-primary-600 group-hover:underline">
                    Get started →
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-gray-900">Recent Activity</h3>
            <div className="space-y-3">
              {recentActivity.length > 0 ? (
                recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-gray-200 bg-white p-4"
                  >
                    <div className="text-sm font-medium text-gray-900">{activity.action}</div>
                    <div className="mt-1 text-xs text-gray-500">{activity.time}</div>
                  </div>
                ))
              ) : (
                <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
                  <p className="text-sm text-gray-500">No recent activity</p>
                </div>
              )}
            </div>

            {/* Upgrade CTA */}
            <div className="mt-6 rounded-lg bg-gradient-to-br from-gray-900 to-gray-800 p-6 text-white">
              <h4 className="mb-2 text-lg font-bold">Upgrade to Pro</h4>
              <p className="mb-4 text-sm opacity-90">
                Get unlimited questions, project management, and more
              </p>
              <button className="w-full rounded-lg bg-white py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100">
                View Plans
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
