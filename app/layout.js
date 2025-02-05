import './globals.css'

export const metadata = {
  title: 'Blood Pressure Tracker',
  description: 'Track your blood pressure and related health metrics',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
