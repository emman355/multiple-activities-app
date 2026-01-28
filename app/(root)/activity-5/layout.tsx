import { Suspense } from "react";

export default function NoteLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      {children}
    </Suspense>
  )
}
