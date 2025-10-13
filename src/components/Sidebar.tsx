interface SidebarProps {
  onUpgrade: () => void;
}

const FEATURES = [
  {
    title: 'Upload Your Documents',
    description: 'Upload specs, drawings, and RFIs for AI-powered analysis specific to your projects',
    badge: 'Pro',
  },
  {
    title: 'Project Management',
    description: 'Manage multiple projects with team collaboration and role-based access',
    badge: 'Pro',
  },
  {
    title: 'Submittal Builder',
    description: 'Auto-generate submittal packages from your specifications with compliance matrix',
    badge: 'Pro',
  },
  {
    title: 'Daily Logs & RFIs',
    description: 'Track daily activities and manage RFIs with status tracking and notifications',
    badge: 'Pro',
  },
];

export default function Sidebar({ onUpgrade }: SidebarProps) {
  return (
    <div className="hidden w-96 flex-col overflow-y-auto bg-gray-50 lg:flex">
      {/* Features Section */}
      <div className="border-b border-gray-200 p-6">
        <h3 className="mb-5 text-xs font-bold uppercase tracking-wide text-gray-500">
          Pro Features
        </h3>

        <div className="space-y-3">
          {FEATURES.map((feature, index) => (
            <div
              key={index}
              className="cursor-pointer rounded-lg border border-gray-200 bg-white p-5 transition-all hover:border-primary-500 hover:shadow-md hover:shadow-primary-500/10"
            >
              <div className="mb-2 font-semibold text-gray-900">{feature.title}</div>
              <div className="mb-3 text-sm leading-relaxed text-gray-600">
                {feature.description}
              </div>
              <div className="inline-block rounded bg-orange-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-orange-700">
                {feature.badge}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upgrade CTA */}
      <div className="m-6 rounded-lg bg-gradient-to-br from-gray-900 to-gray-800 p-8 text-center text-white">
        <h3 className="mb-2 text-lg font-bold">Unlock Full Access</h3>
        <p className="mb-6 text-sm opacity-80">
          Get unlimited questions and access to all professional features
        </p>
        <button
          onClick={onUpgrade}
          className="w-full rounded-md bg-white py-3 text-sm font-semibold text-gray-900 transition-all hover:bg-gray-100"
        >
          Sign Up Free
        </button>
      </div>
    </div>
  );
}
