'use client';

import { useState } from 'react';
import AppLayout from '@/components/AppLayout';

interface SubmittalItem {
  id: string;
  category: string;
  specification: string;
  product: string;
  manufacturer: string;
  model: string;
  status: 'pending' | 'generating' | 'ready';
}

export default function SubmittalBuilderPage() {
  const [projectSpec, setProjectSpec] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [submittalItems, setSubmittalItems] = useState<SubmittalItem[]>([]);
  const [showUpgrade, setShowUpgrade] = useState(true);

  const handleAnalyze = async () => {
    if (!projectSpec.trim()) return;

    setIsAnalyzing(true);
    
    try {
      const response = await fetch('/api/submittals/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ specification: projectSpec }),
      });

      const data = await response.json();
      
      if (data.items) {
        setSubmittalItems(data.items);
      }
    } catch (error) {
      console.error('Error analyzing spec:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleGenerate = async (itemId: string) => {
    // Update item status to generating
    setSubmittalItems(items =>
      items.map(item =>
        item.id === itemId ? { ...item, status: 'generating' as const } : item
      )
    );

    // Simulate generation
    setTimeout(() => {
      setSubmittalItems(items =>
        items.map(item =>
          item.id === itemId ? { ...item, status: 'ready' as const } : item
        )
      );
    }, 3000);
  };

  if (showUpgrade) {
    return (
      <AppLayout>
        <div className="flex h-full items-center justify-center p-8">
          <div className="max-w-2xl text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary-100">
              <svg className="h-10 w-10 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="mb-4 text-3xl font-bold text-gray-900">AI Submittal Builder</h2>
            <p className="mb-8 text-lg text-gray-600">
              Upload your project specifications and let AI automatically identify required submittals, suggest compliant products, and generate complete submittal packages.
            </p>

            <div className="mb-8 grid gap-4 text-left sm:grid-cols-2">
              <div className="rounded-lg border border-gray-200 bg-white p-6">
                <div className="mb-2 text-lg font-semibold text-gray-900">Automatic Analysis</div>
                <p className="text-sm text-gray-600">
                  AI reads your specs and identifies all required submittals automatically
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-6">
                <div className="mb-2 text-lg font-semibold text-gray-900">Product Suggestions</div>
                <p className="text-sm text-gray-600">
                  Get AI-recommended products that meet specification requirements
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-6">
                <div className="mb-2 text-lg font-semibold text-gray-900">Compliance Matrix</div>
                <p className="text-sm text-gray-600">
                  Automatically generated compliance matrix for each submittal
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-6">
                <div className="mb-2 text-lg font-semibold text-gray-900">Package Generation</div>
                <p className="text-sm text-gray-600">
                  Complete submittal packages ready for review and submission
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowUpgrade(false)}
              className="rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 px-8 py-3 text-lg font-semibold text-white transition-all hover:shadow-lg hover:shadow-primary-500/30"
            >
              Try Demo (Free Account)
            </button>
            
            <p className="mt-4 text-sm text-gray-500">
              Or <a href="#" className="font-semibold text-primary-600 hover:underline">upgrade to Pro</a> for full access
            </p>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="h-full p-8">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <h2 className="mb-2 text-2xl font-bold text-gray-900">AI Submittal Builder</h2>
            <p className="text-gray-600">
              Paste your project specifications below to automatically identify required submittals
            </p>
          </div>

          {/* Input Section */}
          <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6">
            <label className="mb-2 block text-sm font-semibold text-gray-900">
              Project Specifications
            </label>
            <textarea
              value={projectSpec}
              onChange={(e) => setProjectSpec(e.target.value)}
              placeholder="Paste your specification section here (e.g., Division 26 - Electrical)..."
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              rows={12}
            />
            
            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Or <button className="font-semibold text-primary-600 hover:underline">upload PDF</button>
              </div>
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing || !projectSpec.trim()}
                className="rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 px-6 py-3 font-semibold text-white transition-all hover:shadow-lg hover:shadow-primary-500/30 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isAnalyzing ? 'Analyzing...' : 'Analyze Specifications'}
              </button>
            </div>
          </div>

          {/* Results Section */}
          {submittalItems.length > 0 && (
            <div>
              <h3 className="mb-4 text-xl font-bold text-gray-900">
                Identified Submittals ({submittalItems.length})
              </h3>
              
              <div className="space-y-4">
                {submittalItems.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-lg border border-gray-200 bg-white p-6"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="mb-1 flex items-center gap-3">
                          <h4 className="text-lg font-semibold text-gray-900">{item.category}</h4>
                          <span className={`rounded px-2 py-1 text-xs font-semibold ${
                            item.status === 'ready'
                              ? 'bg-green-100 text-green-700'
                              : item.status === 'generating'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}>
                            {item.status === 'ready' ? 'Ready' : item.status === 'generating' ? 'Generating...' : 'Pending'}
                          </span>
                        </div>
                        <p className="mb-3 text-sm text-gray-600">{item.specification}</p>
                        
                        {item.status === 'ready' && (
                          <div className="mt-4 grid gap-3 sm:grid-cols-3">
                            <div>
                              <div className="text-xs font-semibold text-gray-500">Suggested Product</div>
                              <div className="text-sm font-medium text-gray-900">{item.product}</div>
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-gray-500">Manufacturer</div>
                              <div className="text-sm font-medium text-gray-900">{item.manufacturer}</div>
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-gray-500">Model Number</div>
                              <div className="text-sm font-medium text-gray-900">{item.model}</div>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="ml-4">
                        {item.status === 'pending' && (
                          <button
                            onClick={() => handleGenerate(item.id)}
                            className="rounded-lg border border-primary-600 px-4 py-2 text-sm font-semibold text-primary-600 hover:bg-primary-50"
                          >
                            Generate
                          </button>
                        )}
                        {item.status === 'ready' && (
                          <div className="flex gap-2">
                            <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50">
                              Edit
                            </button>
                            <button className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700">
                              Download
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50">
                  Save Draft
                </button>
                <button className="rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 px-6 py-3 font-semibold text-white hover:shadow-lg hover:shadow-primary-500/30">
                  Download All Submittals
                </button>
              </div>
            </div>
          )}

          {/* Empty State */}
          {submittalItems.length === 0 && !isAnalyzing && (
            <div className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 py-20 text-center">
              <svg className="mx-auto mb-4 h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-gray-600">Paste specifications above to get started</p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
