import React from 'react'
import { CustomDialog } from '@/app/(root)/_components/custom-dialog'
import { DriveLiteAddFormValues } from '@/lib/schema/drive-lite-photo'
import DriveLiteForm from '../add-form'
import { Photo } from '../../types'

type EditDialogProps = {
  handleSubmit: (data: DriveLiteAddFormValues) => Promise<void>
  openEdit: boolean
  setOpenEdit: React.Dispatch<React.SetStateAction<boolean>>
  photo: Photo
  isPendingEdit: boolean
}

export default function EditDialog({ handleSubmit, openEdit, setOpenEdit, photo, isPendingEdit }: EditDialogProps) {
  return (
    <CustomDialog
      open={openEdit}
      setOpen={setOpenEdit}
      title="Edit Photo Details"
      className="sm:max-w-[600px] gap-6 p-8 font-(family-name:--font-geist-sans)"
      description="Edit title and description to keep your photo organized."
    >
      <DriveLiteForm
        defaultValues={{
          title: photo.title,
          description: photo.description,
          photo: undefined,
        }}
        onSubmit={handleSubmit}
        submitLabel="Update"
        existingUrl={photo.photoUrl}
        isPending={isPendingEdit}
      />
    </CustomDialog>
  )
}
