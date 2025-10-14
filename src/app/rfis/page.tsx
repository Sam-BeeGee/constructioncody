'use client';

import AppLayout from '@/components/AppLayout';

export default function RFIsPage() {
  return (
    <AppLayout>
      <div className="flex h-full items-center justify-center p-8">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <svg className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="mb-4 text-3xl font-bold text-gray-900">RFI Management</h2>
          <p className="mb-8 text-lg text-gray-600">
            Create, track, and manage Requests for Information with automatic linking to drawings, specs, and related documents.
          </p>
          <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
            <p className="font-semibold text-orange-900">Pro Feature</p>
            <p className="text-sm text-orange-700">Upgrade to access RFI management</p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
