import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import React, { ReactNode } from 'react'

type CustomDialogDialogProps = {
  children: ReactNode
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  title: ReactNode | string
  className?: string
  description?: ReactNode | string
  titleStyles?: string
  descriptionStyles?: string
}

export function CustomDialog({ children, open, setOpen, title, className, description, titleStyles, descriptionStyles }: CustomDialogDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className={cn("rounded-2xl sm:max-w-[600px]", className)}>
        <DialogHeader>
          <DialogTitle className={titleStyles}>{title}</DialogTitle>
          <DialogDescription className={descriptionStyles}>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}