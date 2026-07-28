import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AZ-104 Master Dashboard | Randy DeRego',
  description: 'AZ-104 master dashboard matching the public index experience.',
};

export default function AZ104Page() {
  return (
    <main style={{ width: '100%', minHeight: '100vh', background: '#0f1117' }}>
      <iframe
        src="/az104-dashboard.html"
        title="AZ-104 Master Dashboard"
        loading="eager"
        style={{ width: '100%', minHeight: '100vh', border: '0', display: 'block' }}
      />
    </main>
  );
}
