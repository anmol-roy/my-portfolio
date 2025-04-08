// components/client-only-background.tsx
'use client'

import dynamic from 'next/dynamic'

// Dynamically import your wave component with SSR disabled
const WaveBackground = dynamic(() => import('./wave-background'), { ssr: false })

export default function ClientOnlyBackground() {
  return <WaveBackground />
}
