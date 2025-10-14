'use client';

import AppLayout from '@/components/AppLayout';

export default function DocumentsPage() {
  return (
    <AppLayout>
      <div className="flex h-full items-center justify-center p-8">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-purple-100">
            <svg className="h-10 w-10 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="mb-4 text-3xl font-bold text-gray-900">Document Library</h2>
          <p className="mb-8 text-lg text-gray-600">
            Upload and organize project specifications, drawings, and documents. AI-powered search and analysis across all your files.
          </p>
          <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
            <p className="font-semibold text-orange-900">Pro Feature</p>
            <p className="text-sm text-orange-700">Upgrade to upload documents</p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
