'use client'

import { Dropzone, DropzoneContent, DropzoneEmptyState } from '@/components/ui/shadcn-io/dropzone'
import { Skeleton } from '@/components/ui/skeleton'
import Image from 'next/image'
import { useState } from 'react'
import { UseFormClearErrors, UseFormSetError } from 'react-hook-form'

type FormValues = {
  photo: File | null
}

type UploadPhotoProps = {
  value?: File | null
  onChange?: (file: File | null) => void
  setError?: UseFormSetError<FormValues>
  clearErrors?: UseFormClearErrors<FormValues>
  existingUrl?: string
}

const UploadPhoto = ({ value, onChange, setError, clearErrors, existingUrl }: UploadPhotoProps) => {
  const [filePreview, setFilePreview] = useState<string | undefined>(existingUrl)
  const [loaded, setLoaded] = useState(false);


  const handleDrop = (files: File[]) => {
    const file = files[0] ?? null
    if (onChange) onChange(file)

    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (typeof e.target?.result === 'string') {
          setFilePreview(e.target.result)
        }
      }
      reader.readAsDataURL(file)

      // ✅ clear previous errors when a valid file is dropped
      if (clearErrors) {
        clearErrors("photo")
      }
    } else {
      setFilePreview(undefined)
    }
  }

  return (
    <Dropzone
      accept={{ 'image/*': ['.png', '.jpg', '.jpeg'] }}
      maxSize={1024 * 1024 * 10}
      minSize={1024}
      onDrop={handleDrop}
      onError={(err) => {
        const message = err?.message || "Invalid file"
        if (setError) {
          setError("photo", { type: "manual", message })
        }
      }}
      src={value ? [value] : []}
      maxFiles={1}
    >
      <DropzoneEmptyState />
      <DropzoneContent>
        {filePreview && (
          <div className="h-[150px]">
            {
              !loaded && (
                <Skeleton className="absolute inset-0 bg-gray-800 rounded-xs" />
              )
            }
            <Image
              alt="Preview"
              src={filePreview}
              layout='fill'
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              unoptimized
              loading="eager"   
              priority
              className="object-cover"
              onLoad={() => setLoaded(true)}
            />
          </div>
        )}
      </DropzoneContent>
    </Dropzone>
  )
}

export default UploadPhoto
