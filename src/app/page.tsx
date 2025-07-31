import Link from 'next/link'

interface RenderMethodCard {
  href: string;
  title: string;
  badge: {
    text: string;
    color: string;
  };
  fullName: string;
  description: string;
  metrics: {
    networkRequests: string;
    bestFor: string;
    pageSpeedScore: string;
  };
  borderColor: string;
  hoverBorderColor: string;
}

const renderMethods: RenderMethodCard[] = [
  {
    href: '/ssg-demo',
    title: 'SSG',
    badge: { text: 'Static', color: 'green' },
    fullName: 'Static Site Generation',
    description: 'Pre-rendered at build time. Fastest load times, no runtime API calls.',
    metrics: {
      networkRequests: '0 (runtime)',
      bestFor: 'Static content',
      pageSpeedScore: '95-100'
    },
    borderColor: 'border-green-500',
    hoverBorderColor: 'hover:border-green-600'
  },
  {
    href: '/ssr-demo',
    title: 'SSR',
    badge: { text: 'Dynamic', color: 'blue' },
    fullName: 'Server-Side Rendering',
    description: 'Rendered on each request. Fresh data, but requires server processing.',
    metrics: {
      networkRequests: '1-3 per load',
      bestFor: 'Real-time data',
      pageSpeedScore: '75-90'
    },
    borderColor: 'border-blue-500',
    hoverBorderColor: 'hover:border-blue-600'
  },
  {
    href: '/ppr-demo',
    title: 'PPR',
    badge: { text: 'Hybrid', color: 'purple' },
    fullName: 'Partial Prerendering',
    description: 'Static shell with dynamic content. Best of both worlds approach.',
    metrics: {
      networkRequests: '0-2 (selective)',
      bestFor: 'Mixed content',
      pageSpeedScore: '85-95'
    },
    borderColor: 'border-purple-500',
    hoverBorderColor: 'hover:border-purple-600'
  },
  {
    href: '/csr-demo',
    title: 'CSR',
    badge: { text: 'Client', color: 'orange' },
    fullName: 'Client-Side Rendering',
    description: 'Rendered in the browser. Minimal server load, but slower initial paint.',
    metrics: {
      networkRequests: '3+ (client)',
      bestFor: 'Interactive apps',
      pageSpeedScore: '60-80'
    },
    borderColor: 'border-orange-500',
    hoverBorderColor: 'hover:border-orange-600'
  }
]

export default function Home() {
  return (
      <div className="min-h-screen bg-gradient-to-br from-gray-500 to-gray-800">
        <div className="container mx-auto px-4 py-12">
          <header className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">
              Next.js Rendering Methods Comparison
            </h1>
            <p className="text-xl text-white max-w-3xl mx-auto">
              Explore the differences between SSR, SSG, and PPR in terms of performance,
              network requests, and PageSpeed scores
            </p>
          </header>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {renderMethods.map((method) => (
                <Link
                    key={method.href}
                    href={method.href}
                    className={`metric-card ${method.borderColor} ${method.hoverBorderColor} block`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">{method.title}</h2>
                    <span className={`bg-${method.badge.color}-100 text-${method.badge.color}-800 px-3 py-1 rounded-full text-sm font-medium`}>
                  {method.badge.text}
                </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{method.fullName}</h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    {method.description}
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Network Requests:</span>
                      <span className={`font-semibold text-${method.badge.color}-600`}>
                    {method.metrics.networkRequests}
                  </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Best For:</span>
                      <span className="font-semibold">{method.metrics.bestFor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">PageSpeed Score:</span>
                      <span className={`font-semibold text-${method.badge.color}-600`}>
                    {method.metrics.pageSpeedScore}
                  </span>
                    </div>
                  </div>
                </Link>
            ))}
          </div>

          <div className="mt-12 bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Testing Instructions</h2>
            <div className="space-y-4 text-gray-700">
              <div>
                <h3 className="font-semibold text-lg mb-2">1. PageSpeed Testing:</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Deploy this app to Vercel or similar platform</li>
                  <li>Use <code className="bg-gray-100 px-2 py-1 rounded">https://pagespeed.web.dev/</code></li>
                  <li>Test each route separately: /ssg-demo, /ssr-demo, /ppr-demo, /csr-demo</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">2. Network Request Monitoring:</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Open Chrome DevTools → Network tab</li>
                  <li>Clear cache and hard reload (Cmd/Ctrl + Shift + R)</li>
                  <li>Watch for API calls to /api/* endpoints</li>
                  <li>Note: SSR calls happen server-side (not visible), CSR calls are client-side</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">3. Performance Metrics:</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>First Contentful Paint (FCP)</li>
                  <li>Largest Contentful Paint (LCP)</li>
                  <li>Time to Interactive (TTI)</li>
                  <li>Total Blocking Time (TBT)</li>
                  <li>Cumulative Layout Shift (CLS)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}