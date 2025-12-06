import React from "react";
import Image from "next/image";
import Typography from "@/components/ui/typography";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CustomDialog } from "@/app/(root)/_components/custom-dialog";
import { PokemonReview } from "@/app/(root)/activity-4/types";
import { capitalizeFirst, formatPokemonId } from "@/lib/utils";
import { RiDeleteBin6Line } from "react-icons/ri";

type DeleteDialogProps = {
  openDelete: boolean;
  setOpenDelete: React.Dispatch<React.SetStateAction<boolean>>;
  pokemonReview: PokemonReview;
  handleDeleteReview: () => Promise<void> | void;
  isPendingDelete: boolean;
  imgUrl: string;
};

export default function DeleteReviewDialog({
  openDelete,
  setOpenDelete,
  pokemonReview,
  handleDeleteReview,
  isPendingDelete,
  imgUrl,
}: DeleteDialogProps) {
  return (
    <CustomDialog
      open={openDelete}
      setOpen={setOpenDelete}
      titleStyles="text-2xl font-bold"
      descriptionStyles="text-base text-gray-400"
      title={`Delete your review for ${capitalizeFirst(pokemonReview.pokemonName)}`}
      description="This action cannot be undone."
      className="sm:max-w-[600px] gap-8 p-8"
    >
      <div className="flex flex-col gap-6">
        {/* Preview of the item */}
        <div className="flex items-center gap-4">
          <Image
            src={imgUrl}
            alt={pokemonReview.pokemonName}
            width={96}
            height={96}
            className="rounded-md object-cover border border-gray-700 p-5"
          />
          <div className="flex flex-col">
            <Typography variant="subtitle" className="font-semibold">
              {capitalizeFirst(pokemonReview.pokemonName)}
            </Typography>
            <Typography variant="caption" className="text-gray-400">
              #{formatPokemonId(Number(pokemonReview.pokemonId))}
            </Typography>
          </div>
        </div>

        {/* Warning message */}
        <div className="flex items-start gap-3 bg-red-950/40 border border-red-700 rounded-md p-4">
          <RiDeleteBin6Line className="text-red-500 mt-1" size={20} />
          <div className="flex flex-col">
            <Typography variant="small" className="text-red-400 font-medium">
              This action cannot be undone.
            </Typography>
            <Typography variant="small" className="text-red-300">
              Are you sure you want to permanently delete this review?
            </Typography>
          </div>
        </div>
      </div>

      <DialogFooter className="gap-3 mt-6">
        <DialogClose asChild>
          <Button size="lg" variant="outline" className="hover:bg-gray-800">
            Cancel
          </Button>
        </DialogClose>
        <Button
          onClick={handleDeleteReview}
          disabled={isPendingDelete}
          size="lg"
          variant="destructive"
          className="flex items-center gap-2"
        >
          {isPendingDelete ? (
            <>
              <span className="animate-spin h-4 w-4 border-2 border-t-transparent rounded-full" />
              Deleting...
            </>
          ) : (
            "Delete Review"
          )}
        </Button>
      </DialogFooter>
    </CustomDialog>
  );
}
