'use client';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import UploadPhoto from '@/app/(root)/_components/upload-photo';
import { driveLiteAddFormSchema, DriveLiteAddFormValues } from '@/lib/schema/drive-lite-photo';

type Props = {
  defaultValues?: Partial<DriveLiteAddFormValues>;
  onSubmit: (values: DriveLiteAddFormValues) => Promise<void>;
  submitLabel?: string;
  isPending?: boolean;
  existingUrl?: string;
};

export default function DriveLiteForm({
  defaultValues,
  onSubmit,
  submitLabel = 'Save',
  isPending,
  existingUrl,
}: Props) {
  const {
    control,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<DriveLiteAddFormValues>({
    resolver: yupResolver(driveLiteAddFormSchema),
    defaultValues,
    context: { isEdit: !!existingUrl },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10">
      {/* Photo Upload */}
      <div className="flex flex-col gap-2">
        <Controller
          name="photo"
          control={control}
          render={({ field }) => (
            <UploadPhoto
              value={field.value}
              onChange={field.onChange}
              setError={setError}
              clearErrors={clearErrors}
              existingUrl={existingUrl}
            />
          )}
        />
        {errors.photo && <p className="text-sm text-destructive">{errors.photo.message}</p>}
      </div>

      {/* Title */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="title">Title</Label>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              id="title"
              placeholder="Enter file title"
              disabled={isPending || isSubmitting}
              aria-invalid={!!errors.title}
              aria-describedby="title-error"
              className="rounded-md border-border focus:ring-2 focus:ring-primary"
            />
          )}
        />
        {errors.title && (
          <p id="title-error" className="text-sm text-destructive">
            {errors.title.message}
          </p>
        )}
      </div>

      {/* Description */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="description">Description</Label>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <Textarea
              {...field}
              id="description"
              placeholder="Add a description"
              disabled={isPending || isSubmitting}
              aria-invalid={!!errors.description}
              aria-describedby="description-error"
              rows={1}
              className="resize-none rounded-md border-border focus:ring-2 focus:ring-primary"
            />
          )}
        />
        {errors.description && (
          <p id="description-error" className="text-sm text-destructive">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Footer */}
      <DialogFooter className="flex flex-col-reverse gap-4 lg:flex-row lg:gap-2">
        <DialogClose asChild>
          <Button
            variant="outline"
            disabled={isPending || isSubmitting}
            className="w-full lg:w-auto"
          >
            Cancel
          </Button>
        </DialogClose>
        <Button
          type="submit"
          disabled={!isDirty || isPending || isSubmitting}
          className="w-full lg:w-auto"
        >
          {isPending || isSubmitting ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin h-4 w-4 border-2 border-t-transparent rounded-full" />
              {submitLabel}...
            </span>
          ) : (
            submitLabel
          )}
        </Button>
      </DialogFooter>
    </form>
  );
}
