import Image from 'next/image'
import { useEffect, useState, useTransition } from 'react'
import { Photo } from '../../../types'
import Typography from '@/components/ui/typography'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { MoreVertical } from 'lucide-react'
import Link from 'next/link'
import EditDialog from '../../edit-dialog'
import { DriveLiteAddFormValues } from '@/lib/schema/drive-lite-photo'
import { updateDrivePhoto } from '../../../_action/updateDrivePhoto'
import { removeDrivePhoto } from '../../../_action/removeDrivePhoto'
import { Skeleton } from '@/components/ui/skeleton'
import DeleteDialog from '../../delete-dialog'

export default function PhotoCard({ photo }: { photo: Photo }) {
  const [openEdit, setOpenEdit] = useState(false);
  const [isPendingEdit, startTransitionEdit] = useTransition()
  const [openDelete, setOpenDelete] = useState(false)
  const [isPendingDelete, startTransitionDelete] = useTransition()
  const [loaded, setLoaded] = useState(false);

  const handleDeletePhoto = async () => {
    startTransitionDelete(async () => {
      try {
        await removeDrivePhoto(photo.id);
        // close only after success
        setOpenDelete(false);
      } catch (error) {
        // Rethrow so Next.js error.tsx catches it
        if (error instanceof Error) {
          throw error;
        } else {
          throw new Error(`Failed to delete review: ${error}`);
        }
      }
    })
  }

  const handleEditPhotoDetails = async (data: DriveLiteAddFormValues) => {
    startTransitionEdit(async () => {
      try {
        await updateDrivePhoto({
          id: photo.id, // 👈 pass the photo id
          file: data.photo ?? undefined, // 👈 optional file
          title: data.title,
          description: data.description,
        })

        setOpenEdit(false) // close edit dialog after submit
      } catch (error) {
        // Rethrow so Next.js error.tsx catches it
        if (error instanceof Error) {
          throw error;
        } else {
          throw new Error(`Failed to edit review: ${error}`);
        }
      }
    })
  }
  useEffect(() => {
    let mounted = true;
    const id = window.setTimeout(() => {
      if (mounted) setLoaded(false);
    }, 0);

    return () => {
      mounted = false;
      clearTimeout(id);
    };
  }, [photo.photoUrl]);

  return (
    <div
      className="w-full flex flex-col rounded-2xl border border-gray-800 overflow-hidden shadow-md hover:shadow-lg transition-shadow"
    >
      {/* Image container */}
      <div className="relative h-70">
        {!loaded && (
          <Skeleton className="absolute inset-0 bg-gray-800 rounded-xs" />
        )}
        <Image
          key={photo.photoUrl} // forces remount when URL changes
          alt={photo.photoName}
          src={photo.photoUrl}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          loading="eager"
          priority
          onLoad={() => setLoaded(true)}
        />
      </div>

      {/* Info section */}
      <div className="flex flex-col gap-5 p-4">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <Typography variant="subtitle" className="font-semibold">
              {photo.title}
            </Typography>

            {/* Dropdown actions */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-1 rounded-full hover:bg-gray-700 focus:outline-none">
                  <MoreVertical size={18} className="text-gray-300" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href={`/activity-2/${photo.id}`}>View Details</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setOpenEdit(true)}>
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-red-600"
                  onClick={() => setOpenDelete(true)}
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Typography variant="caption" className="text-gray-500">
            Uploaded: {new Date(photo.updatedAt).toLocaleDateString()}
          </Typography>
        </div>
      </div>

      <EditDialog
        photo={photo}
        handleSubmit={handleEditPhotoDetails}
        isPendingEdit={isPendingEdit}
        openEdit={openEdit}
        setOpenEdit={setOpenEdit}
      />

      <DeleteDialog
        photo={photo}
        handleDeletePhoto={handleDeletePhoto}
        isPendingDelete={isPendingDelete}
        openDelete={openDelete}
        setOpenDelete={setOpenDelete} />
    </div>
  )
}
