import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import React, { ReactNode } from 'react'

type CustomDialogDialogProps = {
  children: ReactNode
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  title: string
  className?: string
}

export function CustomDialog({ children, open, setOpen, title, className }: CustomDialogDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className={cn("rounded-2xl sm:max-w-[600px]", className)}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}