import './globals.css'

export const metadata = {
  title: 'Blood Pressure Tracker',
  description: 'Track your blood pressure and related health metrics',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-red-500">
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  )
}
