import React, { Suspense } from 'react'

export default function CreatePageLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      {children}
    </Suspense>
  )
}
