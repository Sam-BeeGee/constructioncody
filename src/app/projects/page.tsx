'use client';

import AppLayout from '@/components/AppLayout';

export default function ProjectsPage() {
  return (
    <AppLayout>
      <div className="flex h-full items-center justify-center p-8">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
            <svg className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h2 className="mb-4 text-3xl font-bold text-gray-900">Project Management</h2>
          <p className="mb-8 text-lg text-gray-600">
            Organize and track multiple construction projects with team collaboration, document storage, and progress monitoring.
          </p>
          <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
            <p className="font-semibold text-orange-900">Pro Feature</p>
            <p className="text-sm text-orange-700">Upgrade to access project management</p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
