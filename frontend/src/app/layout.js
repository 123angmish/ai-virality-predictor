import './globals.css'

export const metadata = {
  title: 'AI Virality Predictor & Multi-Platform Optimizer',
  description: 'Predict viral video reach and receive platform-specific actionable optimizations for YouTube Shorts, TikTok, Instagram Reels, Twitter/X, and Facebook.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-indigo-100 selection:text-indigo-700">
        {children}
      </body>
    </html>
  )
}
