import DetailsItem from "./item";
import { getDrivePhotoById } from "../../_action/getDrivePhotoById";

type PhotoDetailsProps = {
  photoId: string;
};

export default async function PhotoDetails({ photoId }: PhotoDetailsProps) {
  const photo = await getDrivePhotoById(photoId)
 
  return (
    <DetailsItem photo={photo} />
  );
}
