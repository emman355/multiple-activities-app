'use client'

import { Button } from '@/components/ui/button'
import Typography from '@/components/ui/typography'
import { FaPlusCircle } from "react-icons/fa"
import { useState, useTransition } from 'react'
import { CustomDialog } from '@/app/(root)/_components/custom-dialog'
import { DriveLiteAddFormValues } from '@/lib/schema/drive-lite-photo'
import DriveLiteForm from '../add-form'
import { addNewPhoto } from '../../_action/uploadPhoto'

export default function AddNewPhoto() {
  const [isOpen, setIsOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleSubmit = async (data: DriveLiteAddFormValues) => {
    startTransition(async () => {
      await addNewPhoto(data)
      setIsOpen(false)
    })
  }

  return (
    <div>
      {/* Trigger Button */}
      <Button
        aria-label="Add new photo"
        className="bg-cyan-800 hover:bg-cyan-900 flex items-center gap-2"
        onClick={() => setIsOpen(true)}
      >
        <FaPlusCircle />
        <Typography variant="small" className="font-semibold">
          Add New Photo
        </Typography>
      </Button>

      {/* Dialog */}
      <CustomDialog
        open={isOpen}
        setOpen={setIsOpen}
        className="sm:max-w-[600px] gap-6 p-8 font-(family-name:--font-geist-sans)"
        title="Upload a Photo"
        description="Add a title and description to keep your photo organized.">
        <DriveLiteForm
          defaultValues={{
            title: '',
            description: '',
          }}
          onSubmit={handleSubmit}
          submitLabel="Upload"
          isPending={isPending}
        />
      </CustomDialog>
    </div>
  )
}
