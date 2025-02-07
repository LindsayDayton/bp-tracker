import dynamic from 'next/dynamic'

// Dynamically import the BPTracker component with no SSR
const BPTracker = dynamic(() => import('../components/BPTracker'), { ssr: false })

export default function Home() {
  return (
    <main className="min-h-screen p-4">
      <BPTracker />
    </main>
  )
}
