import { getDrivePhotos } from "../_action/getDrivePhotos";
import PhotoListWithControls from "../_photo-lists-with-controls";


export default async function FetchedPhotos() {
  const fetchPhotos = await getDrivePhotos()
  return <PhotoListWithControls photos={fetchPhotos} />;
}
